<?php

use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// Route::get('/login/{provider}', [SocialiteController::class, 'redirectToProvider']);
// Route::get('/login/{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);
Route::get('/login/google', [SocialiteController::class, 'redirectToProvider']);
Route::get('/login/google/callback', [SocialiteController::class, 'handleGoogleCallback']);
Route::get('/', function () {
    return view('welcome');
});
