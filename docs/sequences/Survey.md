# 顧客のユーザー登録とアンケート提出

```plantuml
@startuml
actor 顧客 as Customer
actor FP as FP
actor 管理者 as Admin
participant システム as System
participant メールサーバー as MailServer
database DB as Database

== ユーザー登録 ==
Customer -> System: ユーザー登録情報を入力
System -> System: 入力内容を検証
alt 入力内容が有効
    System -> Database: ユーザーテーブルに保存
    System -> MailServer: 登録完了メールを顧客に送信
    MailServer -> Customer: 登録完了メールを受信
else 入力内容が無効
    System -> Customer: エラーメッセージを表示
end

== ログイン ==
Customer -> System: ログイン情報を入力
System -> Database: 認証情報を確認
alt 認証成功
    System -> Customer: マイページを表示
else 認証失敗
    System -> Customer: ログインエラーを表示
end

== アンケート提出 ==
Customer -> System: アンケートフォームに回答を入力
System -> System: 入力内容を検証
System -> Database: アンケートデータを保存
System -> MailServer: アンケート提出通知をFPと管理者に送信
MailServer -> FP: アンケート提出通知を受信
MailServer -> Admin: アンケート提出通知を受信
@enduml
```