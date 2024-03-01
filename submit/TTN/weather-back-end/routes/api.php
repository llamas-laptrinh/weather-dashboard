<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\SearchHistoryController;

// Route::resource('searchHistory', SearchHistoryController::class);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('searchHistory', SearchHistoryController::class);
});
//API route để đăng ký
Route::post('/register', [AuthController::class, 'register']);
//API route để đăng nhập
Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) { 
        return auth()->user();
    });
    // API route thoát
    Route::post('/logout', [AuthController::class, 'logout']);
});
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
