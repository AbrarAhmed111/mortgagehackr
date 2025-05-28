import BlogDetailPage from '@/components/MainComponents/blog/BlogDetailPage'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogDetailPage params={params} />
}
