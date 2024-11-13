<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index()
    {
        return response()->json(Coupon::all());
    }

    public function show($id)
    {
        $coupon = Coupon::findOrFail($id);
        return response()->json($coupon);
    }

    public function store(Request $request)
    {
        $coupon = Coupon::create($request->all());
        return response()->json($coupon, 201);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->update($request->all());
        return response()->json($coupon);
    }

    public function destroy($id)
    {
        Coupon::destroy($id);
        return response()->json(null, 204);
    }
}
