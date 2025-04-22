<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Checkout\Session;
use App\Models\ShoppingCart; // Import the Cart model


class PaymentController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET')); // Ensure this is set
    
        $request->validate([
            'items' => 'required|array',
            'amount' => 'required|integer',
        ]);
    
        // Create line items for Stripe Checkout
        $lineItems = [];
        foreach ($request->items as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['name'],
                    ],
                    'unit_amount' => $item['price'] * 100,
                ],
                'quantity' => $item['quantity'],
            ];
        }
    
        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('shop.success'),
                'cancel_url' => route('shop.cancel'),
            ]);
    
            return response()->json(['id' => $session->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function clearCart(Request $request)
{
    // Assuming you have a way to identify the user's cart, e.g., by session ID
    $sessionId = $request->input('session_id');

    // Clear the cart in your database or session storage
    // This is just an example; adjust according to your application's logic
    // For example, you might delete all items associated with the session ID

    // Assuming you have a Cart model
    ShoppingCart::where('session_id', $sessionId)->delete();

    return response()->json(['message' => 'Cart cleared successfully.']);
}
}
