<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Meeting extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'description',
        'admin_id',
        'user_id',
        'fp_id',
    ];

    /**
     * ミーティングに関連する日程
     */
    public function dates()
    {
        return $this->hasMany(MeetingDate::class);
    }

    /**
     * 確定済みの日程を取得
     */
    public function confirmedDate()
    {
        return $this->dates()->where('status', 'confirmed')->first();
    }

    /**
     * Get the admin that owns the meeting.
     */
    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    /**
     * Get the user that owns the meeting.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the FP that owns the meeting.
     */
    public function fp(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fp_id');
    }

    /**
     * Get all pending dates for the meeting.
     */
    public function pendingDates()
    {
        return $this->dates()
            ->where('status', MeetingDate::STATUS_PENDING)
            ->get();
    }

    /**
     * Get all cancelled dates for the meeting.
     */
    public function cancelledDates()
    {
        return $this->dates()
            ->where('status', MeetingDate::STATUS_CANCELLED)
            ->get();
    }

    /**
     * モデルイベントのブートメソッド
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($meeting) {
            if ($meeting->isForceDeleting()) {
                // 物理削除の場合、関連日程も物理削除
                $meeting->dates()->forceDelete();
            } else {
                // 論理削除の場合、関連日程も論理削除
                $meeting->dates()->delete();
            }
        });

        static::restoring(function ($meeting) {
            // ミーティングの復元時に関連日程も復元
            $meeting->dates()->withTrashed()->restore();
        });
    }
}