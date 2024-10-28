<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // couponsテーブルを作成
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_public')->default(false); // 公開されているかどうか

            // 外部キーはusersテーブルのidに関連付け。削除時に連動してクーポンも削除
            $table->foreignId('merchant_id')->constrained('users', 'id')->onDelete('cascade');
            $table->string('coupon_code', 50)->unique(); // ユニークなクーポンコード
            $table->string('image_path')->nullable(); // 画像のパス（任意）
            $table->boolean('is_new_customer'); // 新規顧客向けかどうか
            $table->string('coupon_title', 100); // クーポンのタイトル
            $table->text('coupon_description'); // クーポンの説明
            $table->string('contact_info', 100)->nullable(); // 連絡先情報（任意）
            $table->json('website_urls')->nullable(); // ウェブサイトのURL（複数、任意）
            $table->date('start_date'); // クーポンの開始日
            $table->date('end_date'); // クーポンの終了日
            $table->integer('now_usage')->nullable(); // 現在の使用数
            $table->integer('usage_limit')->nullable(); // 使用制限（任意）
            $table->enum('discount_type', ['percentage', 'fixed_amount', 'free_item']); // 割引の種類
            $table->decimal('discount_value', 10, 2); // 割引の値
            $table->decimal('minimum_purchase', 10, 2)->nullable(); // 最低購入額（任意）
            $table->timestamps(); // 作成日時と更新日時
        });

        // coupon_usagesテーブルを作成
        Schema::create('coupon_usages', function (Blueprint $table) {
            $table->id();

            // couponsテーブルのidを外部キーとして参照。クーポン削除時に関連レコードも削除
            $table->foreignId('coupon_id')->constrained('coupons')->onDelete('cascade');

            // usersテーブルのidを外部キーとして参照。ユーザー削除時に関連レコードも削除
            $table->foreignId('user_id')->constrained('users', 'id')->onDelete('cascade');
            $table->timestamp('used_at'); // クーポンが使用された日時
            $table->decimal('purchase_amount', 10, 2); // 購入金額
            $table->decimal('discount_amount', 10, 2); // 割引額
            $table->timestamps(); // 作成日時と更新日時
        });
    }

    public function down(): void
    {
        // coupon_usagesテーブルを削除
        Schema::dropIfExists('coupon_usages');
        // couponsテーブルを削除
        Schema::dropIfExists('coupons');
    }
};
