<?php

namespace App\Http\Controllers\Fp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FpUserAuthController extends Controller
{
    // ログインフォームの表示
    public function showLoginForm()
    {
        return view('auth.fp_user_login');
    }

    // ログイン処理
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $credentials['type'] = 'fp_user';  // FPユーザー用

        if (Auth::guard('fp_user')->attempt($credentials)) {
            // 認証成功後、セッションを再生成
            $request->session()->regenerate();
            return redirect()->intended(route('fp_user.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    // ダッシュボードの表示
    public function dashboard()
    {
        return view('fp_user.dashboard');
    }

    // ログアウト処理
    public function logout(Request $request)
    {
        Auth::guard('fp_user')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('fp_user.login'));
    }
}
