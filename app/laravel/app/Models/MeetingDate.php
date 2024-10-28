<?php

// app/Models/MeetingDate.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MeetingDate extends Model
{
    protected $fillable = [
        'meeting_id',
        'proposed_datetime',
        'is_selected',
        'note',
    ];

    protected $casts = [
        'proposed_datetime' => 'datetime',
        'is_selected' => 'boolean',
    ];

    public function meeting(): BelongsTo
    {
        return $this->belongsTo(Meeting::class);
    }
}