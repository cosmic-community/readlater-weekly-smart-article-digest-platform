// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
  published_at?: string;
  bucket?: string;
  modified_by?: string;
  created_by?: string;
}

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email: string;
    password: string;
    full_name: string;
    subscription_tier: {
      key: string;
      value: SubscriptionTier;
    };
    digest_day: {
      key: string;
      value: DigestDay;
    };
    digest_time: string;
    timezone: {
      key: string;
      value: Timezone;
    };
    email_notifications: boolean;
    account_status: {
      key: string;
      value: AccountStatus;
    };
  };
}

// Saved Article interface
export interface SavedArticle extends CosmicObject {
  type: 'saved-articles';
  metadata: {
    url: string;
    title: string;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    domain?: string;
    user: User;
    tags?: Tag[];
    read_status: {
      key: string;
      value: ReadStatus;
    };
    saved_date: string;
    week_batch?: string;
  };
}

// Weekly Digest interface
export interface WeeklyDigest extends CosmicObject {
  type: 'weekly-digests';
  metadata: {
    user: User;
    week_start_date: string;
    week_end_date: string;
    articles?: SavedArticle[];
    sent_date?: string;
    email_opened: boolean;
    click_count?: number;
    digest_status: {
      key: string;
      value: DigestStatus;
    };
  };
}

// Email Template interface
export interface EmailTemplate extends CosmicObject {
  type: 'email-templates';
  metadata: {
    template_name: string;
    subject_line: string;
    html_content: string;
    plain_text_content: string;
    subscription_tier: {
      key: string;
      value: SubscriptionTier;
    };
    active_status: boolean;
  };
}

// Subscription Plan interface
export interface SubscriptionPlan extends CosmicObject {
  type: 'subscription-plans';
  metadata: {
    plan_name: string;
    monthly_price: number;
    article_limit?: number;
    features: string[];
    cta_button_text: string;
    popular_plan: boolean;
  };
}

// Tag interface
export interface Tag extends CosmicObject {
  type: 'tags';
  metadata: {
    tag_name: string;
    color?: string;
    description?: string;
  };
}

// Type literals for select-dropdown values
export type SubscriptionTier = 'Free' | 'Paid';
export type DigestDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Timezone = 'UTC' | 'Eastern (EST)' | 'Central (CST)' | 'Mountain (MST)' | 'Pacific (PST)';
export type AccountStatus = 'Active' | 'Inactive' | 'Suspended';
export type ReadStatus = 'Unread' | 'Read' | 'Archived';
export type DigestStatus = 'Pending' | 'Sent' | 'Failed';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Form data types
export interface CreateArticleData {
  url: string;
  title: string;
  description?: string;
  userId: string;
  tags?: string[];
}

export interface CreateUserData {
  email: string;
  full_name: string;
  subscription_tier: SubscriptionTier;
  digest_day: DigestDay;
  digest_time: string;
  timezone: Timezone;
  email_notifications: boolean;
  account_status: AccountStatus;
}

// Authentication types
export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  digestDay: DigestDay;
  digestTime: string;
  timezone: Timezone;
  emailNotifications: boolean;
  subscriptionTier: SubscriptionTier;
}

// Type guards for runtime validation
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isSavedArticle(obj: CosmicObject): obj is SavedArticle {
  return obj.type === 'saved-articles';
}

export function isWeeklyDigest(obj: CosmicObject): obj is WeeklyDigest {
  return obj.type === 'weekly-digests';
}

export function isEmailTemplate(obj: CosmicObject): obj is EmailTemplate {
  return obj.type === 'email-templates';
}

export function isSubscriptionPlan(obj: CosmicObject): obj is SubscriptionPlan {
  return obj.type === 'subscription-plans';
}

export function isTag(obj: CosmicObject): obj is Tag {
  return obj.type === 'tags';
}

// Utility types for common patterns
export type OptionalMetadata<T> = T extends { metadata: infer M } ? Partial<M> : never;
export type CreateSavedArticleData = Omit<SavedArticle, 'id' | 'created_at' | 'modified_at' | 'slug'>;
export type CreateWeeklyDigestData = Omit<WeeklyDigest, 'id' | 'created_at' | 'modified_at' | 'slug'>;

// Component prop types
export interface ArticleCardProps {
  article: SavedArticle;
  onMarkAsRead?: (article: SavedArticle) => void;
  onDelete?: (article: SavedArticle) => void;
  showUser?: boolean;
  className?: string;
}

export interface UserDashboardProps {
  user: User;
  articles: SavedArticle[];
  weeklyDigests: WeeklyDigest[];
}

export interface PricingCardProps {
  plan: SubscriptionPlan;
  currentPlan?: SubscriptionPlan;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  className?: string;
}

export interface TagBadgeProps {
  tag: Tag;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
}

// Error types
export interface CosmicError extends Error {
  status?: number;
  code?: string;
}

export function isCosmicError(error: unknown): error is CosmicError {
  return error instanceof Error && 'status' in error;
}

// Helper function for handling potentially undefined values
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Constants for form validation
export const SUBSCRIPTION_TIERS: SubscriptionTier[] = ['Free', 'Paid'];
export const DIGEST_DAYS: DigestDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const TIMEZONES: Timezone[] = ['UTC', 'Eastern (EST)', 'Central (CST)', 'Mountain (MST)', 'Pacific (PST)'];
export const ACCOUNT_STATUSES: AccountStatus[] = ['Active', 'Inactive', 'Suspended'];
export const READ_STATUSES: ReadStatus[] = ['Unread', 'Read', 'Archived'];
export const DIGEST_STATUSES: DigestStatus[] = ['Pending', 'Sent', 'Failed'];