'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  initialTitle?: string;
  initialDescription?: string;
  postId?: number;
  isEdit?: boolean;
}

export default function PostForm({ 
  initialTitle = '', 
  initialDescription = '', 
  postId,
  isEdit = false 
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('タイトルと本文を入力してください');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = isEdit ? `/api/blog/${postId}` : '/api/blog';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/posts/${data.post.id}`);
      } else {
        setError(isEdit ? '更新に失敗しました' : '投稿に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? '記事を編集' : '新しい記事を投稿'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEdit ? '記事の内容を編集してください' : '素晴らしい記事を共有しましょう'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            タイトル *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="記事のタイトルを入力してください"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
            disabled={loading}
          />
        </div>

        {/* 本文 */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            本文 *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="記事の内容を入力してください"
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 resize-vertical"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-2">
            {description.length} 文字
          </p>
        </div>

        {/* プレビュー */}
        {title && description && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">プレビュー</h3>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                {description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ボタン */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            disabled={loading}
          >
            キャンセル
          </button>
          
          <button
            type="submit"
            disabled={loading || !title.trim() || !description.trim()}
            className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {loading && (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>{loading ? '処理中...' : (isEdit ? '更新' : '投稿')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}