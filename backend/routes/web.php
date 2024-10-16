<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});


// Product routes
Route::get('/products', [ProductController::class, 'index']);          // List all products
Route::post('/products', [ProductController::class, 'store']);         // Create new product
Route::get('/products/{id}', [ProductController::class, 'show']);      // Show a specific product
Route::put('/products/{id}', [ProductController::class, 'update']);    // Update a product
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete a product

Route::middleware('api')->group(function () {
 // Remove item from cart
});


