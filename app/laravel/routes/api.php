<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\MeetingDateController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MatchingController;  // 追加
use App\Http\Controllers\FpSurveyController;  // 追加

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Sample API endpoint for testing
Route::get('sample', function () {
    return response()->json(['message' => 'Sample API route working!']);
});

Route::middleware('api')->get('/sample', function () {
    return response()->json(['message' => 'This is a sample response']);
});