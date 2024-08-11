<?php

namespace Database\Seeders;

// Database\Seeders\SlideshowSeeder.php

use Illuminate\Database\Seeder;
use App\Models\SlideShow;

class SlideshowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            SlideShow::create([
                'path' => 'C:\\Users\\Lap\\Pictures\\Saved Pictures\\anhn' . $i . '.jpg',
                'link' => 'https://www.facebook.com/xuanlaap2502',
            ]);
        }
    }
}
