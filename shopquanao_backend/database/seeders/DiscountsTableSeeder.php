<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $startDate = Carbon::today();
            $endDate = $startDate->copy()->addDays(10);
        
            $values = [
                'id' => $i,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'percentagediscount' => 10,
                'discountamount' => 10,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
                'product_id' => rand(1, 10),
            ];
            DB::table('discounts')->insert($values);
    }
}
}
