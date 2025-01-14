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
    Schema::create('slide_shows', function (Blueprint $table) {
        $table->id();
        $table->string('path');
        $table->string('link');
        $table->boolean('status')->default(1); 
        $table->timestamps();
        $table->string('title')->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slide_shows');
    }
};
