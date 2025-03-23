<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UsersImport;

class UserImportController extends Controller
{
    /**
     * ユーザー CSV/Excel ファイルをインポートする
     *
     * POST リクエストで /users/import にアップロードされたファイルを処理します。
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function import(Request $request)
    {
        // ファイルのバリデーション
        $request->validate([
            'file' => 'required|file|mimes:csv,txt,xlsx,xls'
        ]);

        // インポート実行（アップロードされたファイルを渡す）
        Excel::import(new UsersImport, $request->file('file'));

        return response()->json([
            'message' => 'ユーザーのインポートが成功しました'
        ]);
    }
}
