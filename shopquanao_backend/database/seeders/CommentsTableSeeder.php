<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Product;
use Faker\Factory as Faker;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sử dụng Faker để tạo dữ liệu giả mạo
        $faker = Faker::create();

        // Lấy danh sách sản phẩm
        $productIds = Product::pluck('id')->toArray();

        // Tạo 10 comment ngẫu nhiên
        for ($i = 0; $i < 10; $i++) {
            Comment::create([
                'product_id' => $faker->randomElement($productIds),
                'content' => $faker->paragraph,
                'created_at' => now(),
                'updated_at' => now(),
                'status' => rand(0, 1),

            ]);
        }
    }
}