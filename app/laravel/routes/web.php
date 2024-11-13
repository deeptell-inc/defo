<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Index');
})->name('index');

// Store Detail and Survey Routes
Route::get('/store/{id}', function ($id) {
    return Inertia::render('StoreDetail', ['id' => $id]);
})->name('store.detail');

Route::get('/survey', function () {
    return Inertia::render('Survey');
})->name('survey');

// General User Routes (web guard)
Route::prefix('user')->middleware('guest:web')->group(function () {
    Route::get('login', [LoginController::class, 'showUserLoginForm'])->name('user.login');
    Route::post('login', [LoginController::class, 'userLogin']);
    Route::get('register', [RegisterController::class, 'showUserRegisterForm'])->name('user.register');
    Route::post('register', [RegisterController::class, 'userRegister']);
});

// FP User Routes (fp_user guard)
Route::prefix('fp_user')->middleware('guest:fp_user')->group(function () {
    Route::get('login', [LoginController::class, 'showFpLoginForm'])->name('fp_user.login');
    Route::post('login', [LoginController::class, 'fpLogin']);
    Route::get('register', [RegisterController::class, 'showFpUserRegisterForm'])->name('fp_user.register');
    Route::post('register', [RegisterController::class, 'fpUserRegister']);
});

// Admin Routes (admin guard)
Route::prefix('admin')->middleware('guest:admin')->group(function () {
    Route::get('login', [LoginController::class, 'showAdminLoginForm'])->name('admin.login');
    Route::post('login', [LoginController::class, 'adminLogin']);
    Route::get('register', [RegisterController::class, 'showAdminRegisterForm'])->name('admin.register');
    Route::post('register', [RegisterController::class, 'adminRegister']);
});

// Merchant Routes (merchant guard)
Route::prefix('merchant')->middleware('guest:merchant')->group(function () {
    Route::get('login', [LoginController::class, 'showMerchantLoginForm'])->name('merchant.login');
    Route::post('login', [LoginController::class, 'merchantLogin']);
    Route::get('register', [RegisterController::class, 'showMerchantRegisterForm'])->name('merchant.register');
    Route::post('register', [RegisterController::class, 'merchantRegister']);
});

// Profile Management Routes for Authenticated Users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Additional Auth and Filament Routes
require __DIR__.'/auth.php';
require __DIR__.'/filament.php';
