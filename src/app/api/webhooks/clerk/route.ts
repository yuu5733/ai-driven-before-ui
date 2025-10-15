import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { supabase } from '@/lib/supabase';

// ClerkのWebhookイベントの型定義
interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    created_at: number;
    updated_at: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    // ヘッダーから署名を取得
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // 署名ヘッダーが存在しない場合はエラー
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers');
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    // リクエストボディを取得
    const payload = await req.text();
    const body = JSON.parse(payload);

    // Webhookの署名を検証
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    let evt: ClerkWebhookEvent;

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as ClerkWebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // イベントタイプに応じて処理
    const { type, data } = evt;

    switch (type) {
      case 'user.created':
        await handleUserCreated(data);
        break;
      case 'user.updated':
        await handleUserUpdated(data);
        break;
      case 'user.deleted':
        await handleUserDeleted(data);
        break;
      default:
        console.log(`Unhandled webhook event type: ${type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ユーザー作成時の処理
async function handleUserCreated(data: ClerkWebhookEvent['data']) {
  try {
    const primaryEmail = data.email_addresses.find(email => email.id === data.email_addresses[0]?.id);
    
    if (!primaryEmail) {
      console.error('No primary email found for user:', data.id);
      return;
    }

    // Supabaseのusersテーブルにユーザーを追加
    const { error } = await supabase
      .from('users')
      .insert({
        clerk_id: data.id,
        email: primaryEmail.email_address,
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        image_url: data.image_url || null,
        created_at: new Date(data.created_at).toISOString(),
        updated_at: new Date(data.updated_at).toISOString(),
      });

    if (error) {
      console.error('Error creating user in Supabase:', error);
      throw error;
    }

    console.log('User created successfully:', data.id);
  } catch (error) {
    console.error('Error in handleUserCreated:', error);
    throw error;
  }
}

// ユーザー更新時の処理
async function handleUserUpdated(data: ClerkWebhookEvent['data']) {
  try {
    const primaryEmail = data.email_addresses.find(email => email.id === data.email_addresses[0]?.id);
    
    if (!primaryEmail) {
      console.error('No primary email found for user:', data.id);
      return;
    }

    // Supabaseのusersテーブルでユーザーを更新
    const { error } = await supabase
      .from('users')
      .update({
        email: primaryEmail.email_address,
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        image_url: data.image_url || null,
        updated_at: new Date(data.updated_at).toISOString(),
      })
      .eq('clerk_id', data.id);

    if (error) {
      console.error('Error updating user in Supabase:', error);
      throw error;
    }

    console.log('User updated successfully:', data.id);
  } catch (error) {
    console.error('Error in handleUserUpdated:', error);
    throw error;
  }
}

// ユーザー削除時の処理
async function handleUserDeleted(data: ClerkWebhookEvent['data']) {
  try {
    // Supabaseのusersテーブルからユーザーを削除
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('clerk_id', data.id);

    if (error) {
      console.error('Error deleting user from Supabase:', error);
      throw error;
    }

    console.log('User deleted successfully:', data.id);
  } catch (error) {
    console.error('Error in handleUserDeleted:', error);
    throw error;
  }
}

