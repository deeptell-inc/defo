@extends('layouts.app')

@section('content')
<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h1 class="text-2xl leading-6 font-medium text-gray-900">FP User Dashboard</h1>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Welcome, {{ Auth::guard('fp_user')->user()->name }}!</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ Auth::guard('fp_user')->user()->email }}</dd>
            </div>
            <!-- Add more user information here if needed -->
        </dl>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <form method="POST" action="{{ route('fp_user.logout') }}">
            @csrf
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Logout
            </button>
        </form>
    </div>
</div>
@endsection
