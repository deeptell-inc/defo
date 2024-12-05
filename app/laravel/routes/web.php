<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::get('/', [DashboardController::class, 'index']);

use App\Filament\Pages\EditProfilePage;
Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/admin/edit-profile', EditProfilePage::class)->name('filament.pages.edit-profile-page');
});



// 認証関連のルート（/login, /register, /）も自動で/adminに移動
Route::get('/login', function () {
    return redirect('/admin/login');
});
Route::get('/register', function () {
    return redirect('/admin/register');
});

