<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matchings', function (Blueprint $table) {
            $table->id();

            // user_surveysテーブルとfp_surveysテーブルのIDを参照する外部キー
            $table->foreignId('user_survey_id')
                ->constrained('user_surveys')
                ->onDelete('cascade');
                
            $table->foreignId('fp_survey_id')
                ->constrained('fp_surveys')
                ->onDelete('cascade');

            // 承認フラグ
            $table->boolean('is_user_approved')->default(false); // ユーザー側の承認
            $table->boolean('is_fp_approved')->default(false); // FP側の承認
            $table->boolean('is_admin_approved')->default(false); // 管理者の最終承認

            // マッチング日時
            $table->timestamp('matched_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matchings');
    }
};
