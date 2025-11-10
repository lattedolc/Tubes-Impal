<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET /api/products
    public function index(Request $request)
    {
        $q = $request->query('q');

        $products = Product::with('images')
                ->withAvg('ratings as average_rating', 'stars')
                ->when($q, function ($query, $q) {
                    $query->where('name', 'like', "%{$q}%")
                          ->orWhere('description', 'like', "%{$q}%");
                })
                ->orderByDesc('product_id')
                ->paginate(12);

            return response()->json($products);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::with('images', 'ratings')
            ->withAvg('ratings as average_rating', 'stars')
            ->where('product_id', $id)
            ->first();

        if (! $product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    // GET /api/products/top-rated
    public function topRated(Request $request)
    {
        $min = floatval($request->query('min', 4.5));

        $products = Product::with('images')
            ->withAvg('ratings as average_rating', 'stars')
            ->having('average_rating', '>=', $min)
            ->orderByDesc('average_rating')
            ->limit(8)
            ->get();

        return response()->json($products);
    }
}
