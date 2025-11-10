<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API connected!']);
});

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/top-rated', [ProductController::class, 'topRated']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Cart
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);

// Orders
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
