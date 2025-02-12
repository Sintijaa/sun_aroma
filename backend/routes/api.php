<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\PaymentController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/cart', [ShoppingCartController::class, 'store']); // Add item to cart
Route::get('/cart', [ShoppingCartController::class, 'index']); // Get all cart items
Route::post('/cart/remove', [ShoppingCartController::class, 'removeItem']);
Route::post('/create-checkout-session', [PaymentController::class, 'createCheckoutSession']);
Route::post('/clear-cart', [PaymentController::class, 'clearCart']);


