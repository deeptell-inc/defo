<!DOCTYPE html>
<html>
<head>
    <title>ミーティング提案のキャンセル</title>
</head>
<body>
    <h1>ミーティング提案のキャンセル</h1>
    
    <p>{{ $meeting->fp->name }} 様</p>

    <p>以下のミーティング提案がキャンセルされました。</p>

    <div style="margin: 20px 0;">
        <h2>キャンセルされたミーティング詳細</h2>
        <ul>
            <li>タイトル：{{ $meeting->title }}</li>
            @if($meeting->description)
            <li>内容：{{ $meeting->description }}</li>
            @endif
            <li>対象ユーザー：{{ $meeting->user->name }} 様</li>
            @if($meeting->dates->where('is_selected', true)->first())
            <li>選択された日時：{{ $meeting->dates->where('is_selected', true)->first()->proposed_datetime->format('Y年m月d日 H:i') }}</li>
            @endif
        </ul>
    </div>

    <p>ご不明な点がございましたら、管理者までお問い合わせください。</p>

    <hr>

    <p>{{ config('app.name') }}</p>
</body>
</html>
