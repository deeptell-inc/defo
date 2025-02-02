<?php

// app/Http/Controllers/CouponController.php
namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index()
    {
        return Coupon::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_public' => 'boolean',
            'merchant_id' => 'required|exists:users,id',
            'coupon_code' => 'required|string|max:50|unique:coupons',
            'image_path' => 'nullable|string',
            'is_new_customer' => 'required|boolean',
            'coupon_title' => 'required|string|max:100',
            'coupon_description' => 'required|string',
            'contact_info' => 'nullable|string|max:100',
            'website_urls' => 'nullable|json',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'now_usage' => 'nullable|integer',
            'usage_limit' => 'nullable|integer',
            'discount_type' => 'required|in:percentage,fixed_amount,free_item',
            'discount_value' => 'required|numeric',
            'minimum_purchase' => 'nullable|numeric',
            'industry' => 'required|string|max:100',
            'region' => 'required|in:関西,関東,東海',
            'prefecture' => 'required|string|max:100',
        ]);

        return Coupon::create($validated);
    }

    public function show(Coupon $coupon)
    {
        return $coupon;
    }

    public function update(Request $request, Coupon $coupon)
    {
        $validated = $request->validate([
            'is_public' => 'boolean',
            'merchant_id' => 'exists:users,id',
            'coupon_code' => 'string|max:50|unique:coupons,coupon_code,' . $coupon->id,
            'image_path' => 'nullable|string',
            'is_new_customer' => 'boolean',
            'coupon_title' => 'string|max:100',
            'coupon_description' => 'string',
            'contact_info' => 'nullable|string|max:100',
            'website_urls' => 'nullable|json',
            'start_date' => 'date',
            'end_date' => 'date',
            'now_usage' => 'nullable|integer',
            'usage_limit' => 'nullable|integer',
            'discount_type' => 'in:percentage,fixed_amount,free_item',
            'discount_value' => 'numeric',
            'minimum_purchase' => 'nullable|numeric',
            'industry' => 'string|max:100',
            'region' => 'in:関西,関東,東海',
            'prefecture' => 'string|max:100',
        ]);

        $coupon->update($validated);

        return $coupon;
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        return response()->noContent();
    }
}
