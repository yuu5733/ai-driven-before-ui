import Layout from '@/components/layout/Layout';
import PostForm from '@/components/blog/PostForm';

export default function CreatePage() {
  return (
    <Layout showSidebar={false}>
      <div className="max-w-4xl mx-auto">
        <PostForm />
      </div>
    </Layout>
  );
}
