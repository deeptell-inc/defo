<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/sample', function () {
    return response()->json([
        'message' => 'This is a test endpoint.',
        'status' => 'success',
        'data' => [
            'id' => 1,
            'name' => 'Sample Data',
            'description' => 'This is a test description.',
        ],
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

