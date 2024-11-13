<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Show the general user registration form.
     */
    public function showUserRegisterForm()
    {
        return view('auth.user_register');
    }

    /**
     * Register a general user.
     */
    public function userRegister(Request $request)
    {
        return $this->register($request, 'user');
    }

    /**
     * Show the FP user registration form.
     */
    public function showFpUserRegisterForm()
    {
        return view('auth.fp_user_register');
    }

    /**
     * Register an FP user.
     */
    public function fpUserRegister(Request $request)
    {
        return $this->register($request, 'fp_user');
    }

    /**
     * Show the admin registration form.
     */
    public function showAdminRegisterForm()
    {
        return view('auth.admin_register');
    }

    /**
     * Register an admin user.
     */
    public function adminRegister(Request $request)
    {
        return $this->register($request, 'admin');
    }

    /**
     * Show the merchant registration form.
     */
    public function showMerchantRegisterForm()
    {
        return view('auth.merchant_register');
    }

    /**
     * Register a merchant user.
     */
    public function merchantRegister(Request $request)
    {
        return $this->register($request, 'merchant');
    }

    /**
     * Handle the registration process for any user type.
     */
    private function register(Request $request, $type)
    {
        // Validate the input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the user with the specified type
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $type, // Set user type
        ]);

        event(new Registered($user));

        // Log in the user and issue a token
        Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => ucfirst($type) . ' registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
