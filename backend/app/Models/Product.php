<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Define the table (optional if naming convention is used)
    protected $table = 'products';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
    ];

    // Relationships with other models, if any (e.g., shopping cart)
    public function shoppingCartItems()
    {
        return $this->hasMany(ShoppingCart::class, 'product_id');
    }
}
