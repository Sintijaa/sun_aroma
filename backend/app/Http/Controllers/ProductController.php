<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::all(); // Fetch all products
        return response()->json($products); // Return as JSON
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string', // You can handle file uploads later
        ]);

        // Create the product
        $product = Product::create($request->all());

        return response()->json($product, 201); // Return the created product
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id); // Find the product by ID
        return response()->json($product); // Return as JSON
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id); // Find the product by ID

        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
        ]);

        // Update the product
        $product->update($request->all());

        return response()->json($product); // Return the updated product
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id); // Find the product by ID

        // Delete the product
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}

