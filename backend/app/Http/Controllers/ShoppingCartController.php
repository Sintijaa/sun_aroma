<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    /**
     * Display the shopping cart items.
     */
    public function index(Request $request)
    {
        // Validate that session_id is present
        $request->validate([
            'session_id' => 'required|string',
        ]);
    
        $sessionId = $request->session_id; // Get session ID from the request
    
        // Fetch items based on session ID
        $cartItems = ShoppingCart::where('session_id', $sessionId)->get();
    
        // Check if there are items in the cart
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 204);
        }
    
        return response()->json($cartItems, 200);
    }

    /**
     * Add an item to the shopping cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'session_id' => 'required|string', // Validate session ID
        ]);

        // Check if item already exists in cart for this session
        $cartItem = ShoppingCart::where('session_id', $request->session_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            // Update quantity if item exists
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            // Create a new cart item
            ShoppingCart::create([
                'session_id' => $request->session_id, // Store session ID
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $request->price,
            ]);
        }

        return response()->json(['message' => 'Item added to cart']);
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy($id)
    {
        $cartItem = ShoppingCart::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
}
