import Layout from '@/components/layout/Layout';
import PostDetail from '@/components/blog/PostDetail';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const postId = parseInt(params.id);

  return (
    <Layout showSidebar={false}>
      <div className="max-w-4xl mx-auto">
        <PostDetail postId={postId} />
      </div>
    </Layout>
  );
}
