<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $products = [
            [
                'name' => 'Ocean Breeze',
                'description' => 'Fresh aquatic scent for daytime.',
                'category' => 'Day',
                'price_30ml' => 120000,
                'price_50ml' => 200000,
                'stock_30ml' => 10,
                'stock_50ml' => 5,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Night Bloom',
                'description' => 'Floral oriental fragrance for evenings.',
                'category' => 'Night',
                'price_30ml' => 150000,
                'price_50ml' => 230000,
                'stock_30ml' => 8,
                'stock_50ml' => 6,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Citrus Fresh',
                'description' => 'Zesty citrus blend for all-day wear.',
                'category' => 'Day',
                'price_30ml' => 110000,
                'price_50ml' => 190000,
                'stock_30ml' => 15,
                'stock_50ml' => 10,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Royal Oud',
                'description' => 'Luxurious oud-rich scent for night occasions.',
                'category' => 'Night',
                'price_30ml' => 200000,
                'price_50ml' => 300000,
                'stock_30ml' => 6,
                'stock_50ml' => 4,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Vanilla Sky',
                'description' => 'Warm vanilla gourmand for cozy evenings.',
                'category' => 'Day',
                'price_30ml' => 130000,
                'price_50ml' => 210000,
                'stock_30ml' => 12,
                'stock_50ml' => 8,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        foreach ($products as $p) {
            // If product with same name already exists, skip (some DBs use product_id PK)
            $exists = DB::table('product')->where('name', $p['name'])->exists();
            if (! $exists) {
                DB::table('product')->insert($p);
            }
        }
    }
}
