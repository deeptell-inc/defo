<?php
// app/Filament/Resources/MeetingResource/Pages/CreateMeeting.php

namespace App\Filament\Resources\MeetingResource\Pages;

use App\Filament\Resources\MeetingResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Mail;
use App\Mail\MeetingCreated;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CreateMeeting extends CreateRecord
{
    protected static string $resource = MeetingResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['admin_id'] = Auth::id();
        return $data;
    }

    public function beforeCreate(): void
    {
        abort_unless(
            Auth::user()->type === 'admin',
            403,
            '管理者のみがミーティングを作成できます。'
        );
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function afterCreate(): void
    {
        $fp = User::find($this->record->fp_id);
        if ($fp) {
            Mail::to($fp->email)->send(new MeetingCreated($this->record));
        }
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'ミーティングを作成しました';
    }

    protected function getCreatedNotificationMessage(): ?string
    {
        return "{$this->record->title}のミーティングが作成されました。";
    }
}
