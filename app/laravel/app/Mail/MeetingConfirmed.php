<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MeetingConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $meetingDate;

    public function __construct($meetingDate)
    {
        $this->meetingDate = $meetingDate;
    }

    public function build()
    {
        return $this->subject('面談が確定しました')
                    ->view('emails.meeting_confirmed')
                    ->with(['meetingDate' => $this->meetingDate]);
    }
}
