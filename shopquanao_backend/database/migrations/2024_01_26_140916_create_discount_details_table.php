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
        Schema::create('discount_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discount_id')->constrained(); 
            $table->string('discount_type'); 
            $table->foreignId('product_id')->nullable()->constrained(); 
            $table->decimal('value', 5, 2)->nullable();
            $table->boolean('status')->default(1); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_details');
    }
};
