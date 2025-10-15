# Clerk Webhook + Supabase セットアップガイド

このガイドでは、Clerk の Webhook を使って Supabase のユーザーテーブルにデータを自動同期する機能のセットアップ方法を説明します。

## 📋 前提条件

- Supabase プロジェクトが作成済み
- Clerk プロジェクトが作成済み
- 必要な環境変数が設定済み

## 🔧 セットアップ手順

### 1. 環境変数の設定

`.env.local`ファイルに以下の環境変数を追加してください：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk Webhook
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

### 2. Supabase テーブルの作成

Supabase の SQL エディタで以下の SQL を実行してください：

```sql
-- supabase-schema.sqlの内容を実行
```

または、Supabase のダッシュボードでテーブルを手動で作成：

- テーブル名: `users`
- カラム:
  - `id` (UUID, Primary Key, Default: gen_random_uuid())
  - `clerk_id` (Text, Unique, Not Null)
  - `email` (Text, Unique, Not Null)
  - `first_name` (Text, Nullable)
  - `last_name` (Text, Nullable)
  - `image_url` (Text, Nullable)
  - `created_at` (Timestamp with time zone, Default: NOW())
  - `updated_at` (Timestamp with time zone, Default: NOW())

### 3. Clerk Webhook の設定

1. Clerk ダッシュボードにログイン
2. 「Webhooks」セクションに移動
3. 「Add Endpoint」をクリック
4. 以下の設定を入力：
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - **Events**: 以下のイベントを選択
     - `user.created`
     - `user.updated`
     - `user.deleted`
5. 「Create」をクリック
6. Webhook Secret をコピーして環境変数に設定

### 4. 依存関係のインストール

```bash
npm install @supabase/supabase-js svix
```

## 🧪 テスト方法

### 1. Webhook エンドポイントのテスト

```bash
# テスト用エンドポイントにアクセス
curl https://your-domain.com/api/webhooks/test
```

### 2. ユーザー作成のテスト

```bash
# テストユーザーを作成
curl -X POST https://your-domain.com/api/webhooks/test \
  -H "Content-Type: application/json" \
  -d '{
    "clerk_id": "test_user_123",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### 3. 実際の Clerk ユーザーでのテスト

1. アプリケーションで新規ユーザー登録
2. Supabase の users テーブルを確認
3. ユーザー情報が正しく同期されているか確認

## 📁 ファイル構成

```
src/
├── app/
│   └── api/
│       └── webhooks/
│           ├── clerk/
│           │   └── route.ts          # Clerk Webhookエンドポイント
│           └── test/
│               └── route.ts          # テスト用エンドポイント
├── lib/
│   ├── supabase.ts                   # Supabaseクライアント設定
│   └── user-service.ts               # ユーザー管理サービス
└── supabase-schema.sql               # Supabaseテーブル作成SQL
```

## 🔍 トラブルシューティング

### よくある問題

1. **Webhook が動作しない**

   - 環境変数が正しく設定されているか確認
   - Clerk の Webhook URL が正しいか確認
   - ネットワークアクセスが可能か確認

2. **Supabase にデータが保存されない**

   - Service Role Key が正しく設定されているか確認
   - RLS (Row Level Security) の設定を確認
   - テーブル構造が正しいか確認

3. **署名検証エラー**
   - `CLERK_WEBHOOK_SECRET`が正しく設定されているか確認
   - Webhook の Secret が Clerk ダッシュボードと一致しているか確認

### ログの確認

```bash
# 開発環境でのログ確認
npm run dev

# 本番環境でのログ確認（Vercelの場合）
vercel logs
```

## 🚀 本番環境での注意点

1. **HTTPS 必須**: Webhook エンドポイントは HTTPS でアクセス可能である必要があります
2. **環境変数**: 本番環境でも環境変数が正しく設定されているか確認
3. **ログ**: 本番環境では適切なログ設定を行ってください
4. **エラーハンドリング**: 適切なエラーハンドリングとリトライ機能を実装

## 📚 参考資料

- [Clerk Webhooks Documentation](https://clerk.com/docs/webhooks)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [svix Webhook Verification](https://docs.svix.com/receiving/verifying-payloads/why)

