<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        // Map images to products. The files are expected to be in frontend/web-5scent/public/products/
        $images = [
            ['product_id' => 1, 'image_url' => '/products/OceanBreeze50ml.png', 'is_50ml' => 1],
            ['product_id' => 2, 'image_url' => '/products/NightBloom50ml.png', 'is_50ml' => 1],
            ['product_id' => 3, 'image_url' => '/products/CitrusFresh50ml.png', 'is_50ml' => 1],
            ['product_id' => 4, 'image_url' => '/products/RoyalOud50ml.png', 'is_50ml' => 1],
            ['product_id' => 5, 'image_url' => '/products/VanillaSky50ml.png', 'is_50ml' => 1],
            ['product_id' => 1, 'image_url' => '/products/OceanBreeze30ml.png', 'is_50ml' => 0],
            ['product_id' => 2, 'image_url' => '/products/NightBloom30ml.png', 'is_50ml' => 0],
            ['product_id' => 3, 'image_url' => '/products/CitrusFresh30ml.png', 'is_50ml' => 0],
            ['product_id' => 4, 'image_url' => '/products/RoyalOud30ml.png', 'is_50ml' => 0],
            ['product_id' => 5, 'image_url' => '/products/VanillaSky30ml.png', 'is_50ml' => 0],
        ];

        foreach ($images as $img) {
            $exists = DB::table('productimage')->where('image_url', $img['image_url'])->exists();
            if (! $exists) {
                // Insert only the columns that exist in your schema (avoid created_at/updated_at if not present)
                DB::table('productimage')->insert($img);
            }
        }
    }
}
