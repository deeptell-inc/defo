<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    // クーポン一覧取得
    public function index()
    {
        return Coupon::all();
    }

    // クーポン作成
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'details' => 'required|string',
            'code' => 'required|string|max:255|unique:coupons',
            'price' => 'required|numeric|min:0',
            'is_new' => 'required|boolean',
            'status' => 'required|in:unused,used',
        ]);

        $coupon = Coupon::create($validated);

        return response()->json($coupon, 201);
    }

    // クーポン詳細取得
    public function show($id)
    {
        $coupon = Coupon::findOrFail($id);
        return response()->json($coupon);
    }

    // クーポン更新
    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'details' => 'required|string',
            'code' => 'required|string|max:255|unique:coupons,code,' . $coupon->id,
            'price' => 'required|numeric|min:0',
            'is_new' => 'required|boolean',
            'status' => 'required|in:unused,used',
        ]);

        $coupon->update($validated);

        return response()->json($coupon);
    }

    // クーポン削除
    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        return response()->json(null, 204);
    }
}
