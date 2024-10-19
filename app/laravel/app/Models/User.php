<?php

//namespace App\Models;
//
//// use Illuminate\Contracts\Auth\MustVerifyEmail;
//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Notifications\Notifiable;
//
//use Filament\Models\Contracts\FilamentUser;
//use Filament\Panel;
//
//class User extends Authenticatable implements FilamentUser
//{
//    use HasFactory, Notifiable;
//
//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var array<int, string>
//     */
//    protected $fillable = [
//        'type',
//        'name',
//        'email',
//        'password',
//        'status',
//        'address',
//        'region',
//        'phone_number',
//    ];
//
//    /**
//     * The attributes that should be hidden for serialization.
//     *
//     * @var array<int, string>
//     */
//    protected $hidden = [
//        'password',
//        'remember_token',
//    ];
//
//    /**
//     * Get the attributes that should be cast.
//     *
//     * @return array<string, string>
//     */
//        protected function casts(): array
//    {
//        return [
//            'email_verified_at' => 'datetime',
//            'password' => 'hashed',
//            'status' => 'boolean', // 追加
//        ];
//    }
//
//    /**
//     * Filament管理画面へのアクセス権を確認するメソッド
//     */
//    public function canAccessPanel(\Filament\Panel $panel): bool
//    {
//        // 'admin', 'fp', 'merchant' であり、statusがtrueの場合にアクセスを許可
//        return $this->status && in_array($this->type, ['admin', 'fp', 'merchant']);
//    }
//
//}


namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type',
        'name',
        'email',
        'password',
        'status',
        'address',
        'region',
        'phone_number',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => 'boolean', // 追加
    ];

    /**
     * Filament管理画面へのアクセス権を確認するメソッド
     */
    public function canAccessPanel(Panel $panel): bool
    {
        // 'admin', 'fp', 'merchant' であり、statusがtrueの場合にアクセスを許可
        return $this->status && in_array($this->type, ['admin', 'fp', 'merchant']);
    }
}
