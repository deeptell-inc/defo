<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Support\Exceptions\Halt;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Filament\Actions\Action;

class FpDashboard extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.fp-dashboard';
    protected static ?string $navigationLabel = 'FP Dashboard';
    protected static ?string $title = 'FP Dashboard';
    protected static ?string $slug = 'fp-dashboard';
    protected static ?string $routeBaseName = 'filament.admin.pages.fp-dashboard';
    protected static ?int $navigationSort = 1;
    
    protected static bool $shouldRegisterNavigation = false;
    
    public static function shouldRegister(): bool
    {
        return Auth::check() && Auth::user()->type === 'fp';
    }

    public static function shouldRegisterNavigation(): bool
    {
        return Auth::check() && Auth::user()->type === 'fp';
    }

    public function mount(): void
    {
        if (Auth::user()->type !== 'fp') {
            Notification::make()
                ->danger()
                ->title('Access denied')
                ->body('You do not have permission to access this page.')
                ->send();

            $this->redirect(url('/'));
        }
    }

    public function confirmDate(int $dateId): void
    {
        $date = \App\Models\MeetingDate::findOrFail($dateId);
        
        if ($date->meeting->fp_id !== Auth::id()) {
            Notification::make()
                ->danger()
                ->title('権限エラー')
                ->body('このミーティング日程を確定する権限がありません。')
                ->send();
            return;
        }

        try {
            $date->confirm();

            Notification::make()
                ->success()
                ->title('日程確定')
                ->body('ミーティング日程を確定しました。')
                ->send();
        } catch (\Exception $e) {
            Notification::make()
                ->danger()
                ->title('エラー')
                ->body('日程の確定に失敗しました。')
                ->send();
        }
    }

    protected function getViewData(): array
    {
        $fpUserId = Auth::id();

        // 提案中のミーティング
        $pendingMeetings = \App\Models\Meeting::where('fp_id', $fpUserId)
            ->whereHas('dates', function ($query) {
                $query->where('status', \App\Models\MeetingDate::STATUS_PENDING);
            })
            ->with(['dates' => function ($query) {
                $query->where('status', \App\Models\MeetingDate::STATUS_PENDING);
            }, 'user']) // userリレーションを追加
            ->latest()
            ->get();

        $pendingTasks = $pendingMeetings->map(function ($meeting) {
            $earliestDate = $meeting->dates->min('proposed_datetime');
            return [
                'title' => $meeting->title,
                'due_date' => $earliestDate ? $earliestDate->format('Y-m-d H:i') : null,
                'description' => $meeting->description,
                'meeting_id' => $meeting->id,
                'client_name' => $meeting->user->name,
                'dates' => $meeting->dates->map(function ($date) {
                    return [
                        'id' => $date->id,
                        'datetime' => $date->proposed_datetime->format('Y-m-d H:i'),
                        'day_of_week' => $date->proposed_datetime->isoFormat('ddd'),
                    ];
                })
            ];
        });

        // 確定済みのミーティング
        $recentActivities = \App\Models\Meeting::where('fp_id', $fpUserId)
            ->whereHas('dates', function ($query) {
                $query->where('status', \App\Models\MeetingDate::STATUS_CONFIRMED);
            })
            ->with(['dates' => function ($query) {
                $query->where('status', \App\Models\MeetingDate::STATUS_CONFIRMED);
            }, 'user'])
            ->latest()
            ->take(5)
            ->get();

        return [
            'pendingTasks' => $pendingTasks,
            'recentActivities' => $recentActivities,
        ];
    }

    public static function canView(): bool
    {
        return Auth::check() && Auth::user()->type === 'fp';
    }

    protected function hasPermission(): bool
    {
        return Auth::user()->type === 'fp';
    }
}