<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
     <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title inertia>六次元</title>
          <link rel="icon" href="{{ asset('images/favicon.ico') }}" type="image/png">
          <link rel="preconnect" href="https://fonts.bunny.net">
          <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
          @vite('resources/ts/main.tsx')
     </head>
<body>
    <div id="root"></div>
</body>
</html>
