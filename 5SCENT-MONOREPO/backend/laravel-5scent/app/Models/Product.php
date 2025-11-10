<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = [
        'name',
        'description',
        'category',
        'price_30ml',
        'price_50ml',
        'stock_30ml',
        'stock_50ml',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class, 'product_id');
    }
}
