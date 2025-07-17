export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content: string;
  bucket: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at: string;
  type: string;
  metadata: any;
}

export interface User extends CosmicObject {
  metadata: {
    email: string;
    password: string;
    full_name: string;
    subscription_tier: string | { key: string; value: string };
    digest_day: string | { key: string; value: string };
    digest_time: string;
    timezone: string | { key: string; value: string };
    email_notifications: boolean;
    account_status: string | { key: string; value: string };
  };
}

export interface SavedArticle extends CosmicObject {
  metadata: {
    url: string;
    title: string;
    description: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    domain: string;
    user: User;
    tags: Tag[];
    read_status: { key: string; value: string };
    saved_date: string;
    week_batch: string;
  };
}

export interface Tag extends CosmicObject {
  metadata: {
    tag_name: string;
    color: string;
    description: string;
  };
}

export interface SubscriptionPlan extends CosmicObject {
  metadata: {
    plan_name: string;
    monthly_price: number;
    article_limit: number;
    features: string[];
    cta_button_text: string;
    popular_plan: boolean;
  };
}

export interface EmailTemplate extends CosmicObject {
  metadata: {
    template_name: string;
    subject_line: string;
    html_content: string;
    plain_text_content: string;
    subscription_tier: { key: string; value: string };
    active_status: boolean;
  };
}

export interface WeeklyDigest extends CosmicObject {
  metadata: {
    user: User;
    week_start_date: string;
    week_end_date: string;
    articles: SavedArticle[];
    sent_date: string;
    email_opened: boolean;
    click_count: number;
    digest_status: { key: string; value: string };
  };
}

export const DIGEST_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const TIMEZONES = ['UTC', 'Eastern (EST)', 'Central (CST)', 'Mountain (MST)', 'Pacific (PST)'];