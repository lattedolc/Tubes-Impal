<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // GET /api/cart?user_id=1
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        $items = Cart::with('product')
            ->when($userId, function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->get();

        return response()->json($items);
    }

    // POST /api/cart
    // body: { user_id, product_id, size, quantity }
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'nullable|integer',
            'product_id' => 'required|integer',
            'size' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        // If there's an existing cart item for same user/product/size, increment
        $existing = Cart::where('user_id', $data['user_id'] ?? null)
            ->where('product_id', $data['product_id'])
            ->where('size', $data['size'])
            ->first();

        if ($existing) {
            $existing->quantity += $data['quantity'];
            $existing->save();
            return response()->json($existing);
        }

        $item = Cart::create($data);

        return response()->json($item, 201);
    }

    // DELETE /api/cart/{id}
    public function destroy($id)
    {
        $item = Cart::find($id);

        if (! $item) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'deleted']);
    }
}
