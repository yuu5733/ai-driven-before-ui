import Layout from '@/components/layout/Layout';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostList from '@/components/blog/PostList';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* ヒーローセクション */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            最新の情報と
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              洞察
            </span>
            をお届け
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            多様な視点から価値のあるコンテンツを提供するブログプラットフォームです。
            あなたの知識と経験を共有しましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/create"
              className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              記事を投稿
            </a>
            <a
              href="/posts"
              className="inline-flex items-center px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors duration-200"
            >
              記事を読む
            </a>
          </div>
        </section>

        {/* 注目記事 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">注目記事</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FeaturedPost 
                post={{
                  id: 1,
                  title: "Next.js 15の新機能とパフォーマンス改善について",
                  description: "Next.js 15で導入された新機能とパフォーマンス改善について詳しく解説します。App Routerの改善、Server Componentsの最適化、そして開発者体験の向上について説明します。",
                  date: new Date().toISOString()
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">人気のカテゴリ</h3>
                <div className="space-y-2">
                  <a href="/category/tech" className="block text-sm text-purple-600 hover:text-purple-700">テクノロジー</a>
                  <a href="/category/lifestyle" className="block text-sm text-purple-600 hover:text-purple-700">ライフスタイル</a>
                  <a href="/category/business" className="block text-sm text-purple-600 hover:text-purple-700">ビジネス</a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">最新の投稿</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <a href="/posts/1" className="text-gray-700 hover:text-purple-600 line-clamp-2">
                      React 19の新機能と使い方
                    </a>
                    <p className="text-gray-500 text-xs mt-1">2時間前</p>
                  </div>
                  <div className="text-sm">
                    <a href="/posts/2" className="text-gray-700 hover:text-purple-600 line-clamp-2">
                      TypeScriptの型安全性を活用する方法
                    </a>
                    <p className="text-gray-500 text-xs mt-1">1日前</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 記事一覧 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最新記事</h2>
            <a
              href="/posts"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
            >
              すべて見る
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <PostList />
        </section>
      </div>
    </Layout>
  );
}
