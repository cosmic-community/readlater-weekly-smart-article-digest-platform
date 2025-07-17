import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return '';
  }
}

export function generateWeekBatch(date: Date = new Date()): string {
  const year = date.getFullYear();
  const start = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + start.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

export function getWeekStartEnd(weekBatch: string): { start: Date; end: Date } {
  const [year, week] = weekBatch.split('-W');
  const yearNum = parseInt(year);
  const weekNum = parseInt(week);
  
  const start = new Date(yearNum, 0, 1 + (weekNum - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  
  return { start, end };
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getTagColor(color?: string): string {
  if (!color) return '#6B7280';
  return color;
}

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return `$${price}/month`;
}

export function getTimezoneOffset(timezone: string): number {
  const timezones: Record<string, number> = {
    'UTC': 0,
    'Eastern (EST)': -5,
    'Central (CST)': -6,
    'Mountain (MST)': -7,
    'Pacific (PST)': -8,
  };
  return timezones[timezone] || 0;
}

export function isValidTime(time: string): boolean {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

export function getDayOfWeek(day: string): number {
  const days: Record<string, number> = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
  };
  return days[day] || 0;
}

export function sortArticlesByDate(articles: any[]): any[] {
  return articles.sort((a, b) => {
    const dateA = new Date(a.metadata.saved_date);
    const dateB = new Date(b.metadata.saved_date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function groupArticlesByTag(articles: any[]): Record<string, any[]> {
  const grouped: Record<string, any[]> = {};
  
  articles.forEach(article => {
    if (article.metadata.tags && article.metadata.tags.length > 0) {
      article.metadata.tags.forEach((tag: any) => {
        const tagName = tag.metadata?.tag_name || tag.title;
        if (!grouped[tagName]) {
          grouped[tagName] = [];
        }
        grouped[tagName].push(article);
      });
    } else {
      if (!grouped['Uncategorized']) {
        grouped['Uncategorized'] = [];
      }
      grouped['Uncategorized'].push(article);
    }
  });
  
  return grouped;
}

export function getArticleCount(articles: any[]): number {
  return articles.length;
}

export function getUnreadCount(articles: any[]): number {
  return articles.filter(article => 
    article.metadata.read_status?.key === 'unread' || 
    article.metadata.read_status?.value === 'Unread'
  ).length;
}

export function formatWeekRange(weekBatch: string): string {
  const { start, end } = getWeekStartEnd(weekBatch);
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

export function isCurrentWeek(weekBatch: string): boolean {
  const currentWeek = generateWeekBatch();
  return weekBatch === currentWeek;
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}