<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use App\Mail\UserCreatedMail;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log; // 追加

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;

    /**
     * 一時的にプレーンテキストのパスワードを保持するプロパティ
     *
     * @var string|null
     */
    protected ?string $plainPassword = null;

    public function mount(): void
    {
        abort_unless(Auth::check() && Auth::user()->type === 'admin', 403);
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // ステータスを自動的に設定
        $data['status'] = true;

        // パスワードを自動生成
        $password = Str::random(10);
        $data['password'] = Hash::make($password);

        // 一時的にプレーンテキストのパスワードを保持
        $this->plainPassword = $password;

        // `address`, `region`, `phone_number` にデフォルト値を設定
        $data['address'] = $data['address'] ?? null;
        $data['region'] = $data['region'] ?? null;
        $data['phone_number'] = $data['phone_number'] ?? null;

        return $data;
    }

    protected function afterCreate(): void
    {
        DB::beginTransaction();

        try {
            // ログインリンクを生成
            $loginLink = url('/admin/login');

            // メールを送信
            Mail::to($this->record->email)->send(new UserCreatedMail($this->record, $this->plainPassword, $loginLink));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            // ユーザー作成を中止
            $this->record->delete();

            // エラーログを記録
            Log::error('ユーザー作成時のメール送信エラー: ' . $e->getMessage());

            // エラーメッセージを表示
            Notification::make()
                ->title('メールの送信に失敗したため、ユーザーの作成を中止しました。')
                ->danger()
                ->send();
        }
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
