<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RedirectIfRouteNotDefined
{
    public function handle($request, Closure $next)
    {
        try {
            return $next($request);
        } catch (NotFoundHttpException $e) {
            Log::error('Route not defined: ' . $request->path());
            return redirect('/admin/login');
        }
    }
}
