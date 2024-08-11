<?php

namespace Database\Seeders;

// Database\Seeders\UsersTableSeeder.php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
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
            DB::table('users')->insert([
                'name' => 'user'.$i,
                'fullname' => 'Full Name '.$i,
                'password' => Hash::make('password'), // You can customize the password as needed
                'address' => 'Address '.$i,
                'phone' => '+84973154564', // Sample phone number
                'email' => 'user'.$i.'@example.com',
                'status' => rand(0, 1),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
