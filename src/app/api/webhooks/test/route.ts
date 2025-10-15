import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/user-service';

// Webhookのテスト用エンドポイント
export async function GET(req: NextRequest) {
  try {
    // 全ユーザーを取得してテスト
    const users = await UserService.getAllUsers();
    
    return NextResponse.json({
      message: 'Webhook test endpoint',
      userCount: users.length,
      users: users.map(user => ({
        id: user.id,
        clerk_id: user.clerk_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: user.created_at,
      }))
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

// テスト用のユーザー作成
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerk_id, email, first_name, last_name, image_url } = body;

    if (!clerk_id || !email) {
      return NextResponse.json(
        { error: 'clerk_id and email are required' },
        { status: 400 }
      );
    }

    const user = await UserService.createUser({
      clerk_id,
      email,
      first_name,
      last_name,
      image_url,
    });

    return NextResponse.json({
      message: 'Test user created successfully',
      user
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

