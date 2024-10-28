<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meeting extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'admin_id',
        'user_id',
        'fp_id',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    // モデルが削除されるときに関連するデータも削除
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

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function fp(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fp_id');
    }

    public function dates(): HasMany
    {
        return $this->hasMany(MeetingDate::class);
    }
}
