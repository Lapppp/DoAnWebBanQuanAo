<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DiscountDetailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lặp 10 lần để thêm 10 bản ghi
for ($i = 1; $i <= 10; $i++) {
    $values = [
        'id' => $i, // Chú ý: Nếu id là khóa chính tự tăng, hãy loại bỏ trường id này.
        'discount_id' => $i,
        'discount_type' => 'tốt', // Thay đổi thành giá trị thích hợp
        'product_id' => rand(1, 10),
        'value' => rand(1, 50), // Thay đổi giá trị nếu cần
        'status' => rand(0, 1),
        'created_at' => now(),
        'updated_at' => now(),
    ];

    // Sử dụng DB::table để thực hiện lệnh INSERT
    DB::table('discount_details')->insert($values);
}
    }
}
