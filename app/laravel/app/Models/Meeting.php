<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meeting extends Model
{
    use SoftDeletes;

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
     * モデルが削除されるときに関連するデータも削除
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($meeting) {
            // forceDeleteの場合、関連データも完全に削除されます
            if ($meeting->isForceDeleting()) {
                $meeting->dates()->forceDelete();
            } else {
                $meeting->dates()->delete();
            }
        });
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
     * Get the dates for the meeting.
     */
    public function dates(): HasMany
    {
        return $this->hasMany(MeetingDate::class);
    }

    /**
     * Get the confirmed date for the meeting.
     */
    public function confirmedDate()
    {
        return $this->dates()
            ->where('status', MeetingDate::STATUS_CONFIRMED)
            ->where('is_selected', true)
            ->first();
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
}