<?php

namespace App\Http\Controllers;

use App\Models\FpSurvey;
use Illuminate\Http\Request;

class FpSurveyController extends Controller
{
    /**
     * FPアンケート情報を登録するAPIメソッド
     */
    public function store(Request $request)
    {
        // 入力データのバリデーション
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'fp_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'interview_count' => 'required|integer',
            'interview_date' => 'required|date',
            'interview_location' => 'required|string|max:255',
            'interviewee' => 'required|string|max:255',
            'discussion_content' => 'required|string',
            'interview_feedback' => 'required|integer|min:1|max:5',
            'interview_result' => 'required|string',
            'application_insurance_company' => 'nullable|string',
            'application_p\apoduct' => 'nullable|string',
            'contracts' => 'nullable|json',
            'ac_total' => 'nullable|integer',
            'first_year_fee' => 'nullable|numeric',
            'next_year_fee' => 'nullable|numeric',
            'has_next_meeting' => 'boolean',
            'next_meeting_scheduled' => 'boolean',
            'next_meeting_date' => 'nullable|date',
            'next_meeting_content' => 'nullable|string',
            'consideration_content' => 'nullable|string',
            'future_response_content' => 'nullable|string',
            'on_hold_reason' => 'nullable|string',
            'on_hold_deadline' => 'nullable|date',
            'cancellation_reason' => 'nullable|string',
            'our_representative_name' => 'required|string|max:255',
        ]);
<?php

namespace App\Http\Controllers;

use App\Models\FpSurvey;
use Illuminate\Http\Request;

class FpSurveyController extends Controller
{
    /**
     * FPアンケート情報を登録するAPIメソッド
     */
    public function store(Request $request)
    {
        // 入力データのバリデーション
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'fp_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'interview_count' => 'required|integer',
            'interview_date' => 'required|date',
            'interview_location' => 'required|string|max:255',
            'interviewee' => 'required|string|max:255',
            'discussion_content' => 'required|string',
            'interview_feedback' => 'required|integer|min:1|max:5',
            'interview_result' => 'required|string',
            'application_insurance_company' => 'nullable|string',
            'application_p\apoduct' => 'nullable|string',
            'contracts' => 'nullable|json',
            'ac_total' => 'nullable|integer',
            'first_year_fee' => 'nullable|numeric',
            'next_year_fee' => 'nullable|numeric',
            'has_next_meeting' => 'boolean',
            'next_meeting_scheduled' => 'boolean',
            'next_meeting_date' => 'nullable|date',
            'next_meeting_content' => 'nullable|string',
            'consideration_content' => 'nullable|string',
            'future_response_content' => 'nullable|string',
            'on_hold_reason' => 'nullable|string',
            'on_hold_deadline' => 'nullable|date',
            'cancellation_reason' => 'nullable|string',
            'our_representative_name' => 'required|string|max:255',
        ]);

        // データを保存
        $fpSurvey = FpSurvey::create($validated);

        // レスポンスを返す
        return response()->json([
            'message' => 'FP survey created successfully',
            'data' => $fpSurvey
        ], 201);
    }
}

        // データを保存
        $fpSurvey = FpSurvey::create($validated);

        // レスポンスを返す
        return response()->json([
            'message' => 'FP survey created successfully',
            'data' => $fpSurvey
        ], 201);
    }
}
