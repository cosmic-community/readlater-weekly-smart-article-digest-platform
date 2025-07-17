export interface User {
  id: string;
  slug: string;
  title: string;
  content: string;
  bucket: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail: string;
  published_at: string;
  modified_by: string;
  created_by: string;
  publish_at: string | null;
  type: string;
  metadata: {
    email: string;
    password: string;
    full_name: string;
    subscription_tier: {
      key: string;
      value: string;
    };
    digest_day: {
      key: string;
      value: string;
    };
    digest_time: string;
    timezone: {
      key: string;
      value: string;
    };
    email_notifications: boolean;
    account_status: {
      key: string;
      value: string;
    };
  };
}

export interface Tag {
  id: string;
  slug: string;
  title: string;
  metadata: {
    tag_name: string;
    color: string;
    description: string;
  };
}

export interface SavedArticle {
  id: string;
  slug: string;
  title: string;
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
    read_status: {
      key: string;
      value: string;
    };
    saved_date: string;
    week_batch: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  slug: string;
  title: string;
  metadata: {
    plan_name: string;
    monthly_price: number;
    article_limit: number;
    features: string[];
    cta_button_text: string;
    popular_plan: boolean;
  };
}

export interface EmailTemplate {
  id: string;
  slug: string;
  title: string;
  metadata: {
    template_name: string;
    subject_line: string;
    html_content: string;
    plain_text_content: string;
    subscription_tier: {
      key: string;
      value: string;
    };
    active_status: boolean;
  };
}

export interface WeeklyDigest {
  id: string;
  title: string;
  metadata: {
    user: User;
    week_start_date: string;
    week_end_date: string;
    articles: SavedArticle[];
    sent_date: string;
    email_opened: boolean;
    click_count: number;
    digest_status: {
      key: string;
      value: string;
    };
  };
}