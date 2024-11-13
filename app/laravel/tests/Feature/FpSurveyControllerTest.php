<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\FpSurvey;

class FpSurveyControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 正常なFPアンケート登録テスト
     */
    public function test_store_fp_survey_successfully()
    {
        // テストデータ
        $data = [
            'company_name' => 'ABC保険株式会社',
            'fp_name' => '山田太郎',
            'phone_number' => '09012345678',
            'interview_count' => 1,
            'interview_date' => '2024-11-15',
            'interview_location' => '東京オフィス',
            'interviewee' => '佐藤次郎',
            'discussion_content' => '生命保険の詳細について',
            'interview_feedback' => 4,
            'interview_result' => '申し込み完了',
            'application_insurance_company' => 'XYZ保険',
            'application_product' => '生命保険プランA',
            'contracts' => json_encode([['company' => 'XYZ保険', 'product' => '生命保険プランA']]),
            'ac_total' => 10000,
            'first_year_fee' => 5000.00,
            'next_year_fee' => 2500.00,
            'has_next_meeting' => true,
            'next_meeting_scheduled' => true,
            'next_meeting_date' => '2024-12-01 10:00:00',
            'next_meeting_content' => '詳細なプラン説明',
            'consideration_content' => '追加保障の検討',
            'future_response_content' => '次回までに追加資料を用意',
            'on_hold_reason' => '必要な資料が揃っていない',
            'on_hold_deadline' => '2024-12-31',
            'cancellation_reason' => '別のプランを検討中',
            'our_representative_name' => '高橋一郎',
        ];

        // APIリクエストを送信
        $response = $this->postJson('/api/fp-surveys', $data);

        // レスポンスとデータベースの確認
        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'FP survey created successfully',
                     'data' => [
                         'company_name' => 'ABC保険株式会社',
                         'fp_name' => '山田太郎',
                         // 他の必要なフィールドも確認可能です
                     ],
                 ]);

        $this->assertDatabaseHas('fp_surveys', [
            'company_name' => 'ABC保険株式会社',
            'fp_name' => '山田太郎',
        ]);
    }

    /**
     * バリデーションエラーのテスト
     */
    public function test_store_fp_survey_validation_error()
    {
        // 必須フィールドが不足しているデータ
        $data = [
            // 'company_name'が欠如しています
            'fp_name' => '山田太郎',
            'phone_number' => '09012345678',
            'interview_count' => 1,
            'interview_date' => '2024-11-15',
            'interview_location' => '東京オフィス',
            'interviewee' => '佐藤次郎',
            'discussion_content' => '生命保険の詳細について',
            'interview_feedback' => 4,
            'interview_result' => '申し込み完了',
            'our_representative_name' => '高橋一郎',
        ];

        // APIリクエストを送信
        $response = $this->postJson('/api/fp-surveys', $data);

        // バリデーションエラーの確認
        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['company_name']);
    }
}
