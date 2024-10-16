<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShoppingCartController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/cart', [ShoppingCartController::class, 'store']); // Add item to cart
Route::get('/cart', [ShoppingCartController::class, 'index']); // Get all cart items
Route::delete('/cart/{id}', [ShoppingCartController::class, 'destroy']);
