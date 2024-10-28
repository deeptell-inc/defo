<?php

// app/Mail/MeetingDeleted.php
namespace App\Mail;

use App\Models\Meeting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MeetingDeleted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Meeting $meeting
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Meeting Cancelled: ' . $this->meeting->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.meetings.deleted',
            with: [
                'meeting' => $this->meeting,
            ],
        );
    }
}