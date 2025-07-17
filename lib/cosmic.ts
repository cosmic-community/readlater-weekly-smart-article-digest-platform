import { createBucketClient } from '@cosmicjs/sdk';
import { 
  User, 
  SavedArticle, 
  WeeklyDigest, 
  EmailTemplate, 
  SubscriptionPlan, 
  Tag,
  CosmicResponse,
  CreateArticleData,
  CreateUserData,
  hasStatus
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// User-related functions
export async function getUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'users'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as User[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch users');
  }
}

export async function getUserBySlug(slug: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      slug
    }).depth(1);
    
    return response.object as User;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'users',
      title: userData.full_name,
      metadata: {
        email: userData.email,
        full_name: userData.full_name,
        subscription_tier: userData.subscription_tier,
        digest_day: userData.digest_day,
        digest_time: userData.digest_time,
        timezone: userData.timezone,
        email_notifications: userData.email_notifications,
        account_status: userData.account_status
      }
    });
    
    return response.object as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

// Saved Articles functions
export async function getSavedArticles(): Promise<SavedArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'saved-articles'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SavedArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch saved articles');
  }
}

export async function getSavedArticlesByUser(userId: string): Promise<SavedArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'saved-articles',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SavedArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch user articles');
  }
}

export async function getSavedArticleBySlug(slug: string): Promise<SavedArticle | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'saved-articles',
      slug
    }).depth(1);
    
    return response.object as SavedArticle;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch saved article');
  }
}

export async function createSavedArticle(articleData: CreateArticleData): Promise<SavedArticle> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'saved-articles',
      title: articleData.title,
      metadata: {
        url: articleData.url,
        title: articleData.title,
        description: articleData.description || '',
        user: articleData.userId,
        tags: articleData.tags || [],
        read_status: 'unread',
        saved_date: new Date().toISOString().split('T')[0],
        week_batch: `${new Date().getFullYear()}-W${Math.ceil(new Date().getDate() / 7)}`
      }
    });
    
    return response.object as SavedArticle;
  } catch (error) {
    console.error('Error creating saved article:', error);
    throw new Error('Failed to create saved article');
  }
}

export async function updateSavedArticle(id: string, updates: Partial<SavedArticle['metadata']>): Promise<SavedArticle> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updates
    });
    
    return response.object as SavedArticle;
  } catch (error) {
    console.error('Error updating saved article:', error);
    throw new Error('Failed to update saved article');
  }
}

export async function deleteSavedArticle(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting saved article:', error);
    throw new Error('Failed to delete saved article');
  }
}

// Weekly Digests functions
export async function getWeeklyDigests(): Promise<WeeklyDigest[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'weekly-digests'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as WeeklyDigest[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch weekly digests');
  }
}

export async function getWeeklyDigestsByUser(userId: string): Promise<WeeklyDigest[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'weekly-digests',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as WeeklyDigest[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch user weekly digests');
  }
}

// Email Templates functions
export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'email-templates'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as EmailTemplate[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch email templates');
  }
}

export async function getEmailTemplateByTier(tier: 'free' | 'paid'): Promise<EmailTemplate | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'email-templates',
        'metadata.subscription_tier.key': tier,
        'metadata.active_status': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects[0] as EmailTemplate || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch email template');
  }
}

// Subscription Plans functions
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'subscription-plans'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SubscriptionPlan[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch subscription plans');
  }
}

export async function getSubscriptionPlanBySlug(slug: string): Promise<SubscriptionPlan | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'subscription-plans',
      slug
    }).depth(1);
    
    return response.object as SubscriptionPlan;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch subscription plan');
  }
}

// Tags functions
export async function getTags(): Promise<Tag[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'tags'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Tag[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tags');
  }
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'tags',
      slug
    }).depth(1);
    
    return response.object as Tag;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch tag');
  }
}

// Utility functions
export async function getArticlesByTag(tagId: string): Promise<SavedArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'saved-articles',
        'metadata.tags': tagId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SavedArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles by tag');
  }
}

export async function getArticlesByWeek(weekBatch: string): Promise<SavedArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'saved-articles',
        'metadata.week_batch': weekBatch
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SavedArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles by week');
  }
}

export async function getUnreadArticlesByUser(userId: string): Promise<SavedArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'saved-articles',
        'metadata.user': userId,
        'metadata.read_status.key': 'unread'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SavedArticle[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch unread articles');
  }
}