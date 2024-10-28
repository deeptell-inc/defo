<?php

namespace App\Filament\Resources\MeetingResource\Pages;

use App\Filament\Resources\MeetingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class ListMeetings extends ListRecords
{
    protected static string $resource = MeetingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->visible(fn () => Auth::user()->type === 'admin')
                ->label('New Meeting')
                ->icon('heroicon-o-plus'),
        ];
    }

    protected function getTableHeading(): ?string
    {
        return match (Auth::user()->type) {
            'admin' => 'Your Created Meetings',
            'fp' => 'Your Assigned Meetings',
            default => 'Meetings',
        };
    }

    protected function getTableEmptyStateHeading(): string
    {
        return 'No meetings found';
    }

    protected function getTableEmptyStateDescription(): ?string
    {
        return match (Auth::user()->type) {
            'admin' => 'Create a meeting to get started.',
            'fp' => 'No meetings have been assigned to you yet.',
            default => 'No meetings are available.',
        };
    }

    protected function applySearchToTableQuery(Builder $query): Builder
    {
        $search = $this->getTableSearch();

        if (filled($search)) {
            $query->where(function (Builder $query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhereHas('user', function (Builder $query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('fp', function (Builder $query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        return $query;
    }

    protected function getTableQuery(): Builder
    {
        return parent::getTableQuery()->with(['user', 'fp']);
    }

    protected function authorizeAccess(): void
    {
        parent::authorizeAccess();

        abort_if(
            in_array(Auth::user()->type, ['merchant', 'fp']),
            403,
            'You are not authorized to access meetings.'
        );
    }
}