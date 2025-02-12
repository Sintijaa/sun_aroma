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
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'session_id' => 'required|string',
            'image' => 'required',

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
                'session_id' => $request->session_id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'image' => $request->image, // Save the image name here
                'price' => $request->price,
            ]);
        }
    
        return response()->json(['message' => 'Item added to cart']);
    }
    

    /**
     * Remove an item from the cart.
     */
    public function removeItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:shopping_cart,product_id',
            'session_id' => 'required|string',
        ]);
    
        // Optionally mark the item as removed instead of deleting
        $cartItem = ShoppingCart::where('session_id', $request->session_id)
            ->where('product_id', $request->product_id)
            ->first();
    
        if ($cartItem) {
            $cartItem->delete(); // Or you can mark it as removed (set a flag)
            return response()->json(['message' => 'Item removed from cart']);
        }
    
        return response()->json(['message' => 'Item not found'], 404);
    }
    
    
}
