'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Blog</span>
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              ホーム
            </Link>
            <Link 
              href="/posts" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              記事一覧
            </Link>
            <Link 
              href="/create" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              新規投稿
            </Link>
          </nav>

          {/* ユーザーメニュー */}
          <div className="flex items-center space-x-4">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}