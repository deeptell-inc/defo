<form method="POST" action="{{ route('admin.login') }}">
    @csrf
    <label for="email">Email:</label>
    <input type="email" name="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" required>

    <button type="submit">Login</button>
    <p><a href="{{ route('admin.register') }}">Register</a></p>
</form>