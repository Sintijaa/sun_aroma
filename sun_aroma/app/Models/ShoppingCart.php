<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    use HasFactory;

    // Specify the table name if it's not plural of the model (optional)
    protected $table = 'shopping_cart';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'session_id',
        'product_id',
        'quantity',
        'image',
        'price',
    ];

    // Remove the user relationship since we are not using user_id
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
