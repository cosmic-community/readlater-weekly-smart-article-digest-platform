// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getSavedArticleBySlug } from '@/lib/cosmic';
import ArticleDetail from '@/components/ArticleDetail';
import { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getSavedArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: `${article.metadata.title} - ReadLater Weekly`,
    description: article.metadata.description || `Read ${article.metadata.title} on ReadLater Weekly`,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description || `Read ${article.metadata.title} on ReadLater Weekly`,
      images: article.metadata.featured_image ? [article.metadata.featured_image.imgix_url] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getSavedArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleDetail article={article} />
    </div>
  );
}