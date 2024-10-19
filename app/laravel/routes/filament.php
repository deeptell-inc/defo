<?php

use App\Filament\Pages\EditProfilePage;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/admin/edit-profile', EditProfilePage::class)->name('filament.pages.edit-profile-page');
});
