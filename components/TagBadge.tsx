import { Tag } from '@/types';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: Tag;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
}

export default function TagBadge({ 
  tag, 
  size = 'md', 
  variant = 'default',
  className 
}: TagBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const color = tag.metadata.color || '#6B7280';
  
  const variantClasses = {
    default: {
      backgroundColor: color + '20',
      color: color,
      border: 'none'
    },
    outline: {
      backgroundColor: 'transparent',
      color: color,
      border: `1px solid ${color}40`
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        className
      )}
      style={variantClasses[variant]}
    >
      {tag.metadata.tag_name}
    </span>
  );
}