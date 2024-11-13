<?php

namespace App\Http\Controllers;

use App\Models\Matching;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MatchingController extends Controller
{
    /**
     * ユーザーの承認
     */
    public function approveUser(Request $request, $id)
    {
        $matching = Matching::findOrFail($id);
        $matching->is_user_approved = true;
        $matching->save();

        return response()->json(['message' => 'User approval updated successfully.']);
    }

    /**
     * FPの承認
     */
    public function approveFp(Request $request, $id)
    {
        $matching = Matching::findOrFail($id);
        $matching->is_fp_approved = true;
        $matching->save();

        return response()->json(['message' => 'FP approval updated successfully.']);
    }

    /**
     * 管理者の最終承認とマッチング完了
     */
    public function approveAdmin(Request $request, $id)
    {
        $matching = Matching::findOrFail($id);

        if ($matching->is_user_approved && $matching->is_fp_approved) {
            $matching->is_admin_approved = true;
            $matching->matched_at = Carbon::now();
            $matching->save();

            return response()->json(['message' => 'Admin approval completed. Matching finalized.']);
        }

        return response()->json(['error' => 'User and FP must approve before admin approval.'], 400);
    }

    /**
     * マッチング情報の取得
     */
    public function show($id)
    {
        $matching = Matching::findOrFail($id);

        return response()->json($matching);
    }
}
