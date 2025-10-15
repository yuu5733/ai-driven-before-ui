import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ロゴと説明 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Blog</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              最新の情報と洞察をお届けするブログプラットフォームです。
              多様な視点から価値のあるコンテンツを提供しています。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              ナビゲーション
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm">
                  記事一覧
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm">
                  新規投稿
                </Link>
              </li>
            </ul>
          </div>

          {/* その他 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              その他
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}