import Layout from '@/components/layout/Layout';
import PostList from '@/components/blog/PostList';

export default function PostsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* ヘッダー */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            すべての記事
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            最新の記事から過去の投稿まで、すべてのコンテンツをチェックできます。
          </p>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">カテゴリ:</span>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                すべて
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                テクノロジー
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                ライフスタイル
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                ビジネス
              </button>
            </div>
          </div>
        </div>

        {/* 記事一覧 */}
        <PostList />
      </div>
    </Layout>
  );
}
