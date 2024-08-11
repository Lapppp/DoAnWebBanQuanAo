<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::table('products', function (Blueprint $table) {

        $table->foreignId('category_id')->constrained();

        });
        Schema::table('images', function (Blueprint $table) {

            $table->foreignId('product_id')->constrained();
    
        });
        Schema::table('product_details', function (Blueprint $table) {

            $table->foreignId('color_id')->constrained();
            $table->foreignId('size_id')->constrained();
            $table->foreignId('product_id')->constrained();

        });

        Schema::table('discount_details', function (Blueprint $table) {

            $table->foreignId('product_detail_id')->constrained();
            $table->foreignId('discount_id')->constrained();

        });

        Schema::table('images', function (Blueprint $table) {

            $table->foreignId('color_id')->constrained();

        });


        Schema::table('invoice_details', function (Blueprint $table) {

            $table->foreignId('product_detail_id')->constrained();
            $table->foreignId('invoice_id')->constrained();

        });
        Schema::table('invoices', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
        });
        Schema::table('carts', function (Blueprint $table) {

            $table->foreignId('product_detail_id')->constrained();
            $table->foreignId('user_id')->constrained()->unique();


        });
        Schema::table('reviews', function (Blueprint $table) {

            $table->foreignId('user_id')->constrained();
            $table->foreignId('product_id')->constrained();


        });
        Schema::table('comments', function (Blueprint $table) {

            $table->foreignId('comment_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('product_id')->constrained();

        });
        Schema::table('product_favorites', function (Blueprint $table) {

            $table->foreignId('user_id')->constrained();
            $table->foreignId('product_id')->constrained()->unique();

        });

        Schema::table('categories', function (Blueprint $table) {

            $table->foreignId('category_id')->nullable()->constrained();
           

        });
        Schema::table('images', function (Blueprint $table) {

<<<<<<< HEAD:shopquanao_backend/database/migrations/2023_11_22_102038_foreignkey_all_table.php
            $table->foreignId('product_id')->constrained();
    
=======
            $table->foreignId('product_details_id')->constrained();
           

>>>>>>> 7a72337033bff5f0ab6a41a878b6e6434bd0d435:2023_11_22_102038_foreignkey_all_table.php
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};