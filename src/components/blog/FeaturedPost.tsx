import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              注目記事
            </span>
            <time className="text-white text-opacity-80 text-sm">
              {formatDate(post.date)}
            </time>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            <Link 
              href={`/posts/${post.id}`}
              className="hover:text-opacity-90 transition-opacity duration-200"
            >
              {post.title}
            </Link>
          </h2>
          
          <p className="text-white text-opacity-90 text-lg leading-relaxed mb-6 line-clamp-3">
            {post.description}
          </p>
          
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg"
          >
            続きを読む
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* 装飾的な要素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
}
