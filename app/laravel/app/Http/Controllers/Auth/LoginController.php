<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // General User Login
    public function showUserLoginForm()
    {
        return view('auth.user_login');
    }

    public function userLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if (Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return redirect()->intended('/user/dashboard');
        }

        return back()->withInput()->withErrors(['email' => '認証に失敗しました。']);
    }

    // FP User Login
    public function showFpLoginForm()
    {
        return view('auth.fp_login');
    }

    public function fpLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if (Auth::guard('fp_user')->attempt($request->only('email', 'password'))) {
            return redirect()->intended('/fp/dashboard');
        }

        return back()->withInput()->withErrors(['email' => '認証に失敗しました。']);
    }

    // Admin Login
    public function showAdminLoginForm()
    {
        return view('auth.admin_login');
    }

    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            return redirect()->intended('/admin/dashboard');
        }

        return back()->withInput()->withErrors(['email' => '認証に失敗しました。']);
    }

    // Merchant Login
    public function showMerchantLoginForm()
    {
        return view('auth.merchant_login');
    }

    public function merchantLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if (Auth::guard('merchant')->attempt($request->only('email', 'password'))) {
            return redirect()->intended('/merchant/dashboard');
        }

        return back()->withInput()->withErrors(['email' => '認証に失敗しました。']);
    }
}
