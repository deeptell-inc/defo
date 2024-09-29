<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserType
{
    public function handle(Request $request, Closure $next, $type)
    {
        if (Auth::check() && Auth::user()->type !== $type) {
            return response('Unauthorized', 403);
        }

        return $next($request);
    }
}
