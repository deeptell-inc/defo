<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option defines the default authentication "guard" and password
    | reset "broker" for your application. You may change these values
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | Here we have configured session-based guards with unique session cookies
    | for different user types (e.g., standard user, fp_user).
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
            'cookie' => env('USER_SESSION_COOKIE', 'user_session'),  // Custom cookie for user sessions
        ],
        'fp_user' => [
            'driver' => 'session',
            'provider' => 'users',
            'cookie' => env('FP_USER_SESSION_COOKIE', 'fp_user_session'),  // Custom cookie for fp_user sessions
        ],
        'admin' => [
            'driver' => 'session',
            'provider' => 'users',
            'cookie' => env('ADMIN_SESSION_COOKIE', 'admin_session'), // Custom cookie for admin sessions
        ],
        'merchant' => [
            'driver' => 'session',
            'provider' => 'users',
            'cookie' => env('MERCHANT_SESSION_COOKIE', 'merchant_session'), // Custom cookie for merchant sessions
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | Authentication guards utilize providers to retrieve users from
    | the database. Here we define a single provider for Eloquent with
    | the User model, though additional providers could be added as needed.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | Configuration for Laravel's password reset functionality. Tokens expire
    | after a set number of minutes to enhance security and throttle generation.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => env('AUTH_PASSWORD_EXPIRE', 60),
            'throttle' => env('AUTH_PASSWORD_THROTTLE', 60),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Defines the duration (in seconds) for which a password confirmation is valid.
    | After this time, users will be required to re-enter their password.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
