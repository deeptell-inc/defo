<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeetingDate extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Status constants
     */
    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'meeting_id',
        'proposed_datetime',
        'status',
        'is_selected',
        'note',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'proposed_datetime' => 'datetime',
        'is_selected' => 'boolean',
        'status' => 'string',
    ];

    /**
     * Get the meeting that owns the date.
     */
    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }

    /**
     * Confirm this meeting date.
     */
    public function confirm(): bool
    {
        return $this->update([
            'status' => self::STATUS_CONFIRMED,
            'is_selected' => true
        ]);
    }

    /**
     * Cancel this meeting date.
     */
    public function cancel(): bool
    {
        return $this->update([
            'status' => self::STATUS_CANCELLED,
            'is_selected' => false
        ]);
    }

    /**
     * Reset this meeting date to pending.
     */
    public function resetToPending(): bool
    {
        return $this->update([
            'status' => self::STATUS_PENDING,
            'is_selected' => false
        ]);
    }

    /**
     * モデルイベントのブートメソッド
     */
    protected static function boot()
    {
        parent::boot();

        // `status` が `confirmed` に更新された後の処理
        static::updated(function ($meetingDate) {
            if ($meetingDate->isDirty('status') && $meetingDate->status === 'confirmed') {
                // 同じミーティングに属する他の日程を論理削除
                $meetingDate->meeting->dates()
                    ->where('id', '<>', $meetingDate->id)
                    ->delete();
            }
        });

        // ミーティングがソフトデリートされた際に関連する日程もソフトデリート
        static::deleting(function ($meetingDate) {
            if ($meetingDate->isForceDeleting()) {
                // 物理削除の場合は何もしない
                return;
            }

            // 関連する日程もソフトデリート
            $meetingDate->meetings->dates()->delete();
        });
    }
}