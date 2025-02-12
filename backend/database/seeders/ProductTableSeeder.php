<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product; // Ensure the Product model is imported

class ProductTableSeeder extends Seeder
{
    public function run()
    {
        // Add sample products to the database
        Product::create([
            'name' => 'Kvarcs',
            'description' => 'Sojas vaska svece ar dabīgiem akmeņiem - Kvarcs',
            'price' => 15.99,
            'stock' => 100,
            'image' => 'Kvarcs'

        ]);

        Product::create([
            'name' => 'Ametists',
            'description' => 'Sojas vaska svece ar dabīgiem akmeņiem - Ametists',
            'price' => 19.99,
            'stock' => 100,
            'image' => 'Ametists'
        ]);
        Product::create([
            'name' => 'Ametists',
            'description' => 'Sojas vaska svece ar dabīgiem akmeņiem - Ametists',
            'price' => 19.99,
            'stock' => 100,
            'image' => 'Ametists'

        ]);
    }
}
