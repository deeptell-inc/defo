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

// Profile Management Routes for Authenticated Users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Additional Auth and Filament Routes
require __DIR__.'/auth.php';
require __DIR__.'/filament.php';
