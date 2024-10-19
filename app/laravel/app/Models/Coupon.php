<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_public', // クーポンが公開されているかどうか

        'merchant_id', // クーポンを発行したユーザーのID
        'coupon_code', // ユニークなクーポンコード
        'image_path', // クーポンの画像パス（任意）
        'is_new_customer', // 新規顧客向けかどうか
        'coupon_title', // クーポンのタイトル
        'coupon_description', // クーポンの説明
        'contact_info', // 連絡先情報（任意）
        'website_urls', // ウェブサイトのURL（複数、JSON形式）
        'start_date', // クーポンの開始日
        'end_date', // クーポンの終了日
        'now_usage', // 現在の使用数（任意）
        'usage_limit', // 使用制限（任意）
        'discount_type', // 割引の種類（例: percentage, fixed_amount, free_item）
        'discount_value', // 割引の値
        'minimum_purchase', // 最低購入額（任意）
    ];

    protected $casts = [
        'website_urls' => 'array',
        'is_public' => 'boolean',
        'is_new_customer' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // usersテーブルとのリレーション
    public function merchant()
    {
        return $this->belongsTo(User::class, 'merchant_id');
    }

    // coupon_usagesテーブルとのリレーション
    public function usages()
    {
        return $this->hasMany(CouponUsage::class);
    }
}