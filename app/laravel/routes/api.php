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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('coupons', CouponController::class);
Route::apiResource('meetings', MeetingController::class);
Route::post('meeting_dates', [MeetingDateController::class, 'store']);
Route::post('meetings/{id}/confirm', [MeetingController::class, 'confirmMeetingDate']);
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('submit-survey', [SurveyController::class, 'submit']);
Route::post('/register', [RegisteredUserController::class, 'store']);

// Matching routes
Route::patch('/matchings/{id}/approve-user', [MatchingController::class, 'approveUser']);
Route::patch('/matchings/{id}/approve-fp', [MatchingController::class, 'approveFp']);
Route::patch('/matchings/{id}/approve-admin', [MatchingController::class, 'approveAdmin']);
Route::get('/matchings/{id}', [MatchingController::class, 'show']);

// FpSurvey routes
Route::post('/fp-surveys', [FpSurveyController::class, 'store']);
