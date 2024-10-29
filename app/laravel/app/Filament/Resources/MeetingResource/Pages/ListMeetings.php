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
                ->label('新規ミーティング')
                ->icon('heroicon-o-plus'),
        ];
    }

    protected function getTableHeading(): ?string
    {
        return match (Auth::user()->type) {
            'admin' => '作成したミーティング',
            'fp' => '担当するミーティング',
            default => 'ミーティング一覧',
        };
    }

    protected function getTableEmptyStateHeading(): string
    {
        return 'ミーティングが見つかりません';
    }

    protected function getTableEmptyStateDescription(): ?string
    {
        return match (Auth::user()->type) {
            'admin' => 'ミーティングを作成してください。',
            'fp' => 'まだミーティングが割り当てられていません。',
            default => 'ミーティングはありません。',
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
}