<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CouponFactory extends Factory
{
    protected $model = Coupon::class;

    public function definition()
    {
        return [
            'is_public' => $this->faker->boolean,
            'merchant_id' => 1, // Assign a valid merchant ID or use a relation
            'coupon_code' => strtoupper(Str::random(10)),
            'is_new_customer' => $this->faker->boolean,
            'coupon_title' => $this->faker->sentence,
            'coupon_description' => $this->faker->paragraph,
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'discount_type' => $this->faker->randomElement(['percentage', 'fixed_amount', 'free_item']),
            'discount_value' => $this->faker->numberBetween(5, 50),
        ];
    }
}
