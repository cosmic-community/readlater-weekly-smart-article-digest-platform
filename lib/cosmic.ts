import { createBucketClient } from '@cosmicjs/sdk';
import { SavedArticle, Tag, SubscriptionPlan, User } from '@/types';

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function getSavedArticles(userId?: string): Promise<SavedArticle[]> {
  try {
    const query = userId 
      ? { type: 'saved-articles', 'metadata.user': userId }
      : { type: 'saved-articles' };
    
    const response = await cosmic.objects.find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SavedArticle[];
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    return [];
  }
}

export async function getSavedArticle(slug: string): Promise<SavedArticle | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'saved-articles',
      slug: slug
    }).depth(1);
    
    return response.object as SavedArticle;
  } catch (error) {
    console.error('Error fetching saved article:', error);
    return null;
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'tags'
    }).props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Tag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'subscription-plans'
    }).props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as SubscriptionPlan[];
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
}

export async function saveArticle(articleData: {
  url: string;
  title: string;
  description?: string;
  featuredImage?: string;
  domain: string;
  userId: string;
  tags?: string[];
  readStatus?: string;
}): Promise<SavedArticle | null> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'saved-articles',
      title: articleData.title,
      metadata: {
        url: articleData.url,
        title: articleData.title,
        description: articleData.description || '',
        featured_image: articleData.featuredImage || '',
        domain: articleData.domain,
        user: articleData.userId,
        tags: articleData.tags || [],
        read_status: articleData.readStatus || 'Unread',
        saved_date: new Date().toISOString().split('T')[0],
        week_batch: getWeekBatch(new Date())
      }
    });
    
    return response.object as SavedArticle;
  } catch (error) {
    console.error('Error saving article:', error);
    return null;
  }
}

export async function updateArticleReadStatus(
  articleId: string, 
  readStatus: string
): Promise<SavedArticle | null> {
  try {
    const response = await cosmic.objects.updateOne(articleId, {
      metadata: {
        read_status: readStatus
      }
    });
    
    return response.object as SavedArticle;
  } catch (error) {
    console.error('Error updating article read status:', error);
    return null;
  }
}

function getWeekBatch(date: Date): string {
  const year = date.getFullYear();
  const onejan = new Date(year, 0, 1);
  const week = Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
}