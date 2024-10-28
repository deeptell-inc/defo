<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

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











    /**
 * 管理者として作成したミーティング
 */
public function adminMeetings(): HasMany
{
    return $this->hasMany(Meeting::class, 'admin_id');
}

/**
 * ユーザーとして参加するミーティング
 */
public function userMeetings(): HasMany
{
    return $this->hasMany(Meeting::class, 'user_id');
}

/**
 * FPとして参加するミーティング
 */
public function fpMeetings(): HasMany
{
    return $this->hasMany(Meeting::class, 'fp_id');
}

/**
 * ユーザーの種類に応じたミーティングを取得
 */
public function meetings(): HasMany
{
    switch ($this->type) {
        case 'admin':
            return $this->adminMeetings();
        case 'user':
            return $this->userMeetings();
        case 'fp':
            return $this->fpMeetings();
        default:
            return $this->hasMany(Meeting::class, 'user_id')->whereNull('id');
    }
}
}
