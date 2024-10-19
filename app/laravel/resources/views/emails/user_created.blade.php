<!-- resources/views/emails/user_created.blade.php -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>新規ユーザー登録完了</title>
</head>
<body>
    <p>こんにちは、{{ $name }} さん。</p>
    <p>新しいアカウントが作成されました。</p>
    <p>以下のリンクからログインしてください:</p>
    <p><a href="{{ $loginLink }}">{{ $loginLink }}</a></p>
    <p>パスワード: {{ $password }}</p>
    <p>ログイン後、パスワードの変更をお勧めします。</p>
</body>
</html>