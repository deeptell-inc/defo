<?php

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
        $data['status'] = 'pending';
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
}
