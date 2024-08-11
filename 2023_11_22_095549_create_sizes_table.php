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

        // ... (các bảng khác)

        Schema::table('categories', function (Blueprint $table) {
            $table->foreignId('parent_category_id')->nullable()->constrained('categories');
        });

        // ...
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Bạn cần xóa foreign keys theo thứ tự ngược lại so với khi bạn tạo chúng
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign(['parent_category_id']);
        });

        // ...

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });
    }
};