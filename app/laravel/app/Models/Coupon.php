<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    // 保存する際に割り当て可能なフィールドを指定
    protected $fillable = [
        'title',
        'details',
        'code',
        'price',
        'is_new',
        'status',
    ];

    // priceフィールドを自動的にキャスト
    protected $casts = [
        'price' => 'decimal:2',  // 小数点以下2桁まで
        'is_new' => 'boolean',
    ];
}
