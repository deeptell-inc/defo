<?php

namespace App\Filament\Pages;

use Filament\Forms;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Filament\Notifications\Notification;
use Filament\Actions\Action;
use Illuminate\Validation\Rule;
use App\Models\User;

class EditProfilePage extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $title = 'プロフィール編集';

    protected static string $view = 'filament.pages.edit-profile-page';

    public $name;
    public $email;
    public $address;
    public $region;
    public $phone_number;
    public $current_password;
    public $password;
    public $password_confirmation;

    public function mount()
    {
        $user = Auth::user();

        if (!$user) {
            abort(403);
        }

        $this->form->fill([
            'name'         => $user->name,
            'email'        => $user->email,
            'address'      => $user->address,
            'region'       => $user->region,
            'phone_number' => $user->phone_number,
        ]);
    }

    protected function getFormSchema(): array
    {
        $userId = Auth::id();

        return [
            Forms\Components\TextInput::make('name')
                ->label('名前/店舗名')
                ->required()
                ->maxLength(255),
            Forms\Components\TextInput::make('email')
                ->label('メールアドレス')
                ->email()
                ->required()
                ->maxLength(255)
                ->unique('users', 'email', ignorable: Auth::user()),
            Forms\Components\TextInput::make('address')
                ->label('住所(住民番号)')
                ->maxLength(255),
            Forms\Components\TextInput::make('region')
                ->label('地域')
                ->maxLength(255),
            Forms\Components\TextInput::make('phone_number')
                ->label('電話番号')
                ->tel()
                ->maxLength(255),
            Forms\Components\Fieldset::make('パスワード変更')
                ->schema([
                    Forms\Components\TextInput::make('current_password')
                        ->label('現在のパスワード')
                        ->password()
                        ->requiredWith('password')
                        ->dehydrateStateUsing(fn($state) => $state ?: null),
                    Forms\Components\TextInput::make('password')
                        ->label('新しいパスワード')
                        ->password()
                        ->minLength(8)
                        ->same('password_confirmation')
                        ->dehydrateStateUsing(fn($state) => $state ? Hash::make($state) : null),
                    Forms\Components\TextInput::make('password_confirmation')
                        ->label('パスワード確認')
                        ->password()
                        ->dehydrateStateUsing(fn($state) => null),
                ]),
        ];
    }

    public function submit()
    {
        $userId = Auth::id();
        $user = User::find($userId); // ユーザーIDでユーザーを取得

        $data = $this->form->getState();
    
        // 現在のパスワードの確認
        if (!empty($data['password'])) {
            if (!Hash::check($data['current_password'], $user->password)) {
                Notification::make()
                    ->title('現在のパスワードが正しくありません。')
                    ->danger()
                    ->send();
    
                return;
            }
        }
    
        // パスワードの更新
        if (!empty($data['password'])) {
            $user->password = $data['password'];
        }
    
        // 不要なフィールドを削除
        unset($data['current_password'], $data['password'], $data['password_confirmation']);
    
        // その他のフィールドを更新
        $user->fill($data);
        $user->save();
    
        Notification::make()
            ->title('プロフィールが更新されました。')
            ->success()
            ->send();
    }


    protected function getActions(): array
    {
        return [
            Action::make('save')
                ->label('保存')
                ->action('submit')
                ->requiresConfirmation(),
        ];
    }

    // ナビゲーションに表示しない場合はコメントアウト
    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }
}
