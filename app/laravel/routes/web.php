<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Fp\FpUserAuthController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// User (React) のルート
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//// FPユーザー用のルート
//Route::prefix('fp_user')->group(function () {
//    Route::get('/login', [FpUserAuthController::class, 'showLoginForm'])->name('fp_user.login');
//    Route::post('/login', [FpUserAuthController::class, 'login']);
//    Route::middleware('auth:fp_user')->group(function () {
//        Route::get('/dashboard', [FpUserAuthController::class, 'dashboard'])->name('fp_user.dashboard');
//        Route::post('/logout', [FpUserAuthController::class, 'logout'])->name('fp_user.logout');
//    });
//});

require __DIR__.'/auth.php';