<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasProfilePhoto, TwoFactorAuthenticatable;

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
        'profile_photo_path',
        // 追加項目
        'contact_person_name',
        'contact_person_phone',
        'contact_person_email',
        'position',
        'memo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
        'status'            => 'boolean',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Filament 管理画面へのアクセス権を確認するメソッド
     */
    public function canAccessPanel(Panel $panel): bool
    {
        // 'admin', 'fp', 'merchant' であり、status が true の場合にアクセスを許可
        reddturn $this->status && in_array($this->type, ['admin', 'fp', 'merchant']);
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
     * FP として参加するミーティング
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

    /**
     * 確定した日程があるミーティングを取得
     */
    public function confirmedMeetings(): Builder
    {
        return $this->meetings()
            ->whereHas('dates', function ($query) {
                $query->where('status', MeetingDate::STATUS_CONFIRMED)
                      ->where('is_selected', true);
            });
    }

    /**
     * 保留中の日程があるミーティングを取得
     */
    public function pendingMeetings(): Builder
    {
        return $this->meetings()
            ->whereHas('dates', function ($query) {
                $query->where('status', MeetingDate::STATUS_PENDING);
            })
            ->whereDoesntHave('dates', function ($query) {
                $query->where('status', MeetingDate::STATUS_CONFIRMED)
                      ->where('is_selected', true);
            });
    }

    /**
     * すべての日程がキャンセルされたミーティングを取得
     */
    public function cancelledMeetings(): Builder
    {
        return $this->meetings()
            ->whereDoesntHave('dates', function ($query) {
                $query->whereIn('status', [
                    MeetingDate::STATUS_CONFIRMED,
                    MeetingDate::STATUS_PENDING
                ]);
            })
            ->whereHas('dates', function ($query) {
                $query->where('status', MeetingDate::STATUS_CANCELLED);
            });
    }

    /**
     * 特定の日付範囲のミーティングを取得
     */
    public function meetingsInDateRange($startDate, $endDate): Builder
    {
        return $this->meetings()
            ->whereHas('dates', function ($query) use ($startDate, $endDate) {
                $query->whereBetween('proposed_datetime', [$startDate, $endDate]);
            });
    }

    /**
     * ユーザーのタイプを確認する
     */
    public function isType($type)
    {
        return $this->type === $type;
    }

    /**
     * 二要素認証が有効かどうかを確認する
     */
    public function hasTwoFactorAuthenticationEnabled(): bool
    {
        return !is_null($this->two_factor_secret);
    }
}



