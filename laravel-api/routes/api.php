<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

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

// Article routes
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/latest', [ArticleController::class, 'latest']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::put('/articles/{id}', [ArticleController::class, 'update']);
Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'BeyondChats Article API is running',
        'timestamp' => now()->toIso8601String()
    ]);
});
