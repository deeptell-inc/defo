<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\MeetingDate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MeetingController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fp_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $meeting = Meeting::create([
            'fp_id' => $validatedData['fp_id'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'admin_id' => auth()->user()->id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($meeting, 201);
    }

    public function confirmMeetingDate(Request $request, $id)
    {
        $meetingDate = MeetingDate::findOrFail($id);
        $meetingDate->update(['status' => 'confirmed']);

        Mail::to($meetingDate->fp->email)->send(new MeetingConfirmed($meetingDate));
        Mail::to($meetingDate->user->email)->send(new MeetingConfirmed($meetingDate));

        return response()->json(['message' => 'Meeting date confirmed and notifications sent.']);
    }
}
