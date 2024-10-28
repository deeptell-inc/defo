<!DOCTYPE html>
<html>
<head>
    <title>ミーティング候補日時のご提案</title>
</head>
<body>
    <h1>ミーティング候補日時のご提案</h1>
    
    <p>{{ $meeting->fp->name }} 様</p>

    <p>新しいミーティングの候補日時が提案されました。</p>

    <div style="margin: 20px 0;">
        <h2>ミーティング詳細</h2>
        <ul>
            <li>タイトル：{{ $meeting->title }}</li>
            @if($meeting->description)
            <li>内容：{{ $meeting->description }}</li>
            @endif
            <li>対象ユーザー：{{ $meeting->user->name }} 様</li>
        </ul>

        <h3>候補日時：</h3>
        <ul>
            @foreach($meeting->dates as $date)
            <li>{{ $date->proposed_datetime->format('Y年m月d日 H:i') }}
                @if($date->note)
                <br>備考：{{ $date->note }}
                @endif
            </li>
            @endforeach
        </ul>
    </div>

    <p>管理画面から候補日時の中からご都合の良い日時をお選びください。</p>

    <p>ご不明な点がございましたら、管理者までお問い合わせください。</p>

    <hr>

    <p>{{ config('app.name') }}</p>
</body>
</html>
