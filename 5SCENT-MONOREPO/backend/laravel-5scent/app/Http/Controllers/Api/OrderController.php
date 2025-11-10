<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // POST /api/orders
    // body: { user_id, shipping_address, items: [{product_id, size, quantity, price}], payment: {method, amount} }
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'nullable|integer',
            'shipping_address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.size' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'payment.method' => 'required|string',
            'payment.amount' => 'required|numeric',
        ]);

        DB::beginTransaction();

        try {
            $total = 0;
            foreach ($data['items'] as $it) {
                $total += $it['price'] * $it['quantity'];
            }

            $order = Order::create([
                'user_id' => $data['user_id'] ?? null,
                'total_price' => $total,
                'status' => 'Pending',
                'shipping_address' => $data['shipping_address'],
            ]);

            foreach ($data['items'] as $it) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $it['product_id'],
                    'size' => $it['size'],
                    'quantity' => $it['quantity'],
                    'price' => $it['price'],
                    'subtotal' => $it['price'] * $it['quantity'],
                ]);
            }

            $payment = Payment::create([
                'order_id' => $order->id,
                'method' => $data['payment']['method'],
                'amount' => $data['payment']['amount'],
                'status' => 'Pending',
                'transaction_time' => now(),
            ]);

            DB::commit();

            return response()->json(['order' => $order, 'payment' => $payment], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'failed to create order', 'error' => $e->getMessage()], 500);
        }
    }

    // GET /api/orders/{id}
    public function show($id)
    {
        $order = Order::with('details.product')->find($id);

        if (! $order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
}
