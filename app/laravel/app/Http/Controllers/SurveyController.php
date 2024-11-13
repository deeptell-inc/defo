<?php

namespace App\Http\Controllers;

use App\Models\UserSurvey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function submit(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'interview_date' => 'required|date',
            'interview_location' => 'required|string|max:255',
            'overall_impression_and_improvements' => 'required|string',
        ]);

        $survey = UserSurvey::create($validatedData);

        return response()->json(['message' => 'Survey submitted successfully', 'survey' => $survey], 201);
    }
}
