<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Loop to create 10 records
        for ($i = 1; $i <= 10; $i++) {
            DB::table('products')->insert([
                'name' => 'Product ' . $i,
                'description' => 'Description for Product ' . $i,
                'slug' => 'product-' . $i,
                'averagestar' => rand(1, 5),
                'status' => rand(0, 1),
                'category_id' => rand(1, 5), // Change the range according to your category IDs
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
