<?php

namespace App\Http\Controllers;

use App\Models\MeetingDate;
use Illuminate\Http\Request;

class MeetingDateController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'meeting_id' => 'required|exists:meetings,id',
            'proposed_datetime' => 'required|date',
            'note' => 'nullable|string',
        ]);

        $meetingDate = MeetingDate::create([
            'meeting_id' => $validatedData['meeting_id'],
            'proposed_datetime' => $validatedData['proposed_datetime'],
            'note' => $validatedData['note'],
        ]);

        return response()->json($meetingDate, 201);
    }
}
