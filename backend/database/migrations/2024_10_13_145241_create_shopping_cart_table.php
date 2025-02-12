<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppingCartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopping_cart', function (Blueprint $table) {
            $table->id();
            $table->string('session_id'); // Storing session ID to track anonymous users
            $table->unsignedBigInteger('product_id'); // Product ID in the cart
            $table->integer('quantity')->default(1); // Default quantity is 1
            $table->string('image')->nullable();
            $table->decimal('price', 10, 2); // Price of the product at the time of adding
            $table->timestamps(); // Created and updated timestamps

            // Foreign key constraint for products
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopping_cart');
    }
}
