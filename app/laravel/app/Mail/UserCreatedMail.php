<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User; // 追加

class UserCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $plainPassword;
    public $loginLink;
    public $user; // 追加

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $plainPassword, $loginLink)
    {
        $this->user = $user;
        $this->plainPassword = $plainPassword;
        $this->loginLink = $loginLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('新規ユーザー登録完了')
                    ->view('emails.user_created')
                    ->with([
                        'name' => $this->user->name, // 追加
                        'password' => $this->plainPassword,
                        'loginLink' => $this->loginLink,
                    ]);
    }
}
