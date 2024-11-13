<?php

namespace Tests\Feature;

use App\Models\Coupon;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

class CouponControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $merchant;

    protected function setUp(): void
    {
        parent::setUp();

        // テスト用のユーザーを作成（merchant_idとして使用）
        $this->merchant = User::factory()->create();
    }

    /**
     * クーポン一覧取得のテスト
     */
    public function test_can_get_all_coupons()
    {
        Coupon::factory()->count(3)->create(['merchant_id' => $this->merchant->id]);

        $response = $this->getJson('/api/coupons');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /**
     * クーポン詳細取得のテスト
     */
    public function test_can_get_single_coupon()
    {
        $coupon = Coupon::factory()->create(['merchant_id' => $this->merchant->id]);

        $response = $this->getJson("/api/coupons/{$coupon->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $coupon->id,
                     'coupon_code' => $coupon->coupon_code,
                 ]);
    }

    /**
     * クーポン作成のテスト
     */
    public function test_can_create_coupon()
    {
        $data = [
            'is_public' => true,
            'merchant_id' => $this->merchant->id,
            'coupon_code' => 'TESTCODE123',
            'is_new_customer' => true,
            'coupon_title' => 'Test Coupon',
            'coupon_description' => 'This is a test coupon.',
            'start_date' => Carbon::now()->format('Y-m-d'),
            'end_date' => Carbon::now()->addDays(10)->format('Y-m-d'),
            'discount_type' => 'percentage',
            'discount_value' => 10.00,
        ];

        $response = $this->postJson('/api/coupons', $data);

        $response->assertStatus(201)
                 ->assertJson([
                     'coupon_code' => 'TESTCODE123',
                     'coupon_title' => 'Test Coupon',
                 ]);

        $this->assertDatabaseHas('coupons', [
            'coupon_code' => 'TESTCODE123',
            'coupon_title' => 'Test Coupon',
        ]);
    }

    /**
     * クーポン更新のテスト
     */
    public function test_can_update_coupon()
    {
        $coupon = Coupon::factory()->create(['merchant_id' => $this->merchant->id]);

        $data = [
            'coupon_title' => 'Updated Coupon Title',
            'coupon_description' => 'Updated description for the coupon.',
        ];

        $response = $this->putJson("/api/coupons/{$coupon->id}", $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $coupon->id,
                     'coupon_title' => 'Updated Coupon Title',
                 ]);

        $this->assertDatabaseHas('coupons', [
            'id' => $coupon->id,
            'coupon_title' => 'Updated Coupon Title',
        ]);
    }

    /**
     * クーポン削除のテスト
     */
    public function test_can_delete_coupon()
    {
        $coupon = Coupon::factory()->create(['merchant_id' => $this->merchant->id]);

        $response = $this->deleteJson("/api/coupons/{$coupon->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('coupons', [
            'id' => $coupon->id,
        ]);
    }
}
