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
        Schema::create('fp_surveys', function (Blueprint $table) {
            $table->id();
            $table->string('company_name'); // 会社名
            $table->string('fp_name'); // 担当FP氏名
            $table->string('phone_number'); // 電話番号
            $table->integer('interview_count'); // 面談回数
            $table->date('interview_date'); // 面談実施日
            $table->string('interview_location'); // 面談場所
            $table->string('interviewee'); // 面談相手
            $table->text('discussion_content'); // 何の保険の内容について話をしたのか
            $table->integer('interview_feedback'); // 面談の感触 (5段階評価)
            $table->text('interview_result'); // 面談の結果

            // 申し込みに関する情報
            $table->text('application_insurance_company')->nullable(); // 保険会社
            $table->text('application_product')->nullable(); // 保険商品

            // 成約に関する情報（複数対応）
            $table->json('contracts')->nullable(); // 保険会社と商品（成約情報をJSONで格納）

            // 手数料
            $table->integer('ac_total')->nullable(); // AC合計
            $table->decimal('first_year_fee', 10, 2)->nullable(); // 初年度手数料
            $table->decimal('next_year_fee', 10, 2)->nullable(); // 次年度手数料

            // 次回面談に関する情報
            $table->boolean('has_next_meeting')->default(false); // 次回面談あり
            $table->boolean('next_meeting_scheduled')->default(false); // 次回の日時設定の有無
            $table->dateTime('next_meeting_date')->nullable(); // 次回の予定日時
            $table->text('next_meeting_content')->nullable(); // 次回の内容

            // 検討に関する情報
            $table->text('consideration_content')->nullable(); // 検討内容
            $table->text('future_response_content')->nullable(); // 今後の対応内容

            // 保留に関する情報
            $table->text('on_hold_reason')->nullable(); // 保留の理由
            $table->date('on_hold_deadline')->nullable(); // 保留期限

            // 見送りに関する情報
            $table->text('cancellation_reason')->nullable(); // 見送りの理由

            // 弊社担当者名
            $table->string('our_representative_name'); // 弊社担当名

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fp_surveys');
    }
};
