<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CouponUsage extends Model
{
    use HasFactory;

    protected $fillable = [
        'coupon_id', // 使用されたクーポンのID
        'user_id', // クーポンを使用したユーザーのID
        'used_at', // クーポンが使用された日時
        'purchase_amount', // 購入金額
        'discount_amount', // 割引額
    ];

    // couponsテーブルとのリレーション
    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    // usersテーブルとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
