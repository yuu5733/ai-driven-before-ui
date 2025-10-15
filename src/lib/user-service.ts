import { supabase } from './supabase';

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export class UserService {
  // ユーザーIDでユーザーを取得
  static async getUserByClerkId(clerkId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', clerkId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // ユーザーが見つからない場合
          return null;
        }
        console.error('Error fetching user:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserByClerkId:', error);
      throw error;
    }
  }

  // メールアドレスでユーザーを取得
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // ユーザーが見つからない場合
          return null;
        }
        console.error('Error fetching user by email:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw error;
    }
  }

  // ユーザーを作成
  static async createUser(userData: {
    clerk_id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
  }): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          ...userData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  // ユーザーを更新
  static async updateUser(clerkId: string, updateData: {
    email?: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
  }): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq('clerk_id', clerkId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  }

  // ユーザーを削除
  static async deleteUser(clerkId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('clerk_id', clerkId);

      if (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }

  // 全ユーザーを取得（管理者用）
  static async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all users:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  // ユーザーの存在確認
  static async userExists(clerkId: string): Promise<boolean> {
    try {
      const user = await this.getUserByClerkId(clerkId);
      return user !== null;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  }
}

