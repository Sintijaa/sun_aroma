<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/cart', [ShoppingCartController::class, 'store']); // Add item to cart
Route::get('/cart', [ShoppingCartController::class, 'index']); // Get all cart items
Route::post('/cart/update', [ShoppingCartController::class, 'update'])->name('cart.update');
Route::post('/cart/remove', [ShoppingCartController::class, 'removeItem']);
Route::post('/create-checkout-session', [PaymentController::class, 'createCheckoutSession']);
Route::post('/clear-cart', [PaymentController::class, 'clearCart']);

Route::get('/products', [ProductController::class, 'index']);          // List all products
Route::post('/products', [ProductController::class, 'store']);         // Create new product
Route::get('/products/{id}', [ProductController::class, 'show']);      // Show a specific product
Route::put('/products/{id}', [ProductController::class, 'update']);    // Update a product
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete a product

Route::middleware('api')->group(function () {
 // Remove item from cart
});

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/shop', function () {
    return Inertia::render('Shop');
});

Route::get('/meistarklase', function () {
    return Inertia::render('Meistarklase');
});

Route::get('/Sveces', function () {
    return Inertia::render('Sveces');
});

Route::get('/auskari', function () {
    return Inertia::render('Auskari');
});

Route::get('/aromati', function () {
    return Inertia::render('Aromati');
});

Route::get('/ziepes', function () {
    return Inertia::render('Ziepes');
});

Route::get('/burti', function () {
    return Inertia::render('Burti');
});

Route::get('/piegade', function () {
    return Inertia::render('Piegade');
});

Route::get('/grozs', function () {
    return Inertia::render('Grozs');
});

Route::get('/success', function () {
    return Inertia::render('Success');
});

Route::get('/success', [ShoppingCartController::class, 'success'])->name('shop.success');
Route::get('/cancel', [ShoppingCartController::class, 'cancel'])->name('shop.cancel');


require __DIR__.'/auth.php';
