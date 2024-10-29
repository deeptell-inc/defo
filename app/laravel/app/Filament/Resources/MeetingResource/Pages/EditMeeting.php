<?php

// app/Filament/Resources/MeetingResource/Pages/EditMeeting.php

namespace App\Filament\Resources\MeetingResource\Pages;

use App\Filament\Resources\MeetingResource;
use App\Mail\MeetingDeleted;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\MeetingDate;

class EditMeeting extends EditRecord
{
    protected static string $resource = MeetingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->visible(fn () => Auth::user()->type === 'admin')
                ->requiresConfirmation()
                ->modalHeading('ミーティングの削除')
                ->modalDescription('このミーティングを削除してもよろしいですか？FPに通知メールが送信されます。')
                ->modalSubmitActionLabel('はい、削除します')
                ->action(function () {
                    $meeting = $this->getRecord();
                    $fp = $meeting->fp;
                    
                    DB::beginTransaction();
                    
                    try {
                        $meeting->forceDelete();
                        DB::commit();

                        if ($fp) {
                            Mail::to($fp->email)->send(new MeetingDeleted($meeting));
                        }

                        return redirect()->to($this->getResource()::getUrl('index'));
                    } catch (\Exception $e) {
                        DB::rollBack();
                        throw $e;
                    }
                }),
        ];
    }

    public function beforeSave(): void
    {
        $user = Auth::user();
        
        if ($user->type === 'fp') {
            abort_unless(
                $this->getRecord()->dates()->where('status', MeetingDate::STATUS_PENDING)->exists(),
                403,
                'ファイナンシャルプランナーは保留中の日程があるミーティングのみ編集できます。'
            );
        }
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function authorizeAccess(): void
    {
        parent::authorizeAccess();

        $user = Auth::user();
        $record = $this->getRecord();

        abort_unless(
            ($user->type === 'admin' && $record->admin_id === $user->id) ||
            ($user->type === 'fp' && $record->fp_id === $user->id),
            403,
            'このミーティングを編集する権限がありません。'
        );
    }
}