# ReadLater Weekly - Smart Article Digest Platform

![ReadLater Weekly](https://imgix.cosmicjs.com/ced08470-632f-11f0-a051-23c10f41277a-photo-1521791136064-7986c2920216-1752771743051.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A smart SaaS platform that helps busy professionals manage their reading habits by saving article links throughout the week and receiving organized weekly digest emails. Built with Next.js 15, TypeScript, and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- **📚 Article Management**: Save article links with automatic metadata extraction
- **🏷️ Smart Organization**: Tag-based categorization with color-coded labels
- **📧 Weekly Digests**: Automated email delivery with customizable timing and frequency
- **👤 User Profiles**: Comprehensive account management with subscription tracking
- **💳 Subscription Tiers**: Free (20 articles/week) and Pro ($2/month unlimited) plans
- **✉️ Email Templates**: Customizable digest formats for different user tiers
- **📊 Analytics**: Read/unread tracking and email engagement metrics
- **🔍 Search & Filter**: Advanced article discovery and organization
- **📱 Responsive Design**: Optimized for desktop and mobile experiences

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:
<a href="https://app.cosmic-staging.com/projects/new?clone_bucket=undefined&clone_repository=undefined" target="_blank" style="display: inline-block; background-color: #5DADE2; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; font-size: 16px; font-weight: 600; text-align: center; transition: background-color 0.2s ease; margin: 8px 0;" onmouseover="this.style.backgroundColor='#4A90C2'" onmouseout="this.style.backgroundColor='#5DADE2'">
  Clone this Bucket & Repository
</a>

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I would like a simple saas site that users can sign up for free or pay $2 a month for and I want the service they sign up for to be an incredibly helpful and compelling tool for them. What should it be?"

### Code Generation Prompt

> This is a conversation I had to build out the content model. I would like to now build this as a Next.js website.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: [Cosmic](https://www.cosmicjs.com)
- **Runtime**: Bun
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd readlater-weekly
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Saved Articles

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all saved articles for a user
const getUserArticles = async (userId: string) => {
  try {
    const response = await cosmic.objects
      .find({
        type: 'saved-articles',
        'metadata.user': userId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Creating New Articles

```typescript
// Save a new article
const saveArticle = async (articleData: CreateArticleData) => {
  const response = await cosmic.objects.insertOne({
    type: 'saved-articles',
    title: articleData.title,
    metadata: {
      url: articleData.url,
      title: articleData.title,
      description: articleData.description,
      user: articleData.userId,
      tags: articleData.tags,
      read_status: 'unread',
      saved_date: new Date().toISOString().split('T')[0]
    }
  })
  
  return response.object
}
```

### Weekly Digest Generation

```typescript
// Generate weekly digest
const generateWeeklyDigest = async (userId: string, weekStart: string, weekEnd: string) => {
  const articles = await cosmic.objects
    .find({
      type: 'saved-articles',
      'metadata.user': userId,
      'metadata.saved_date': {
        $gte: weekStart,
        $lte: weekEnd
      }
    })
    .depth(1)
  
  const digest = await cosmic.objects.insertOne({
    type: 'weekly-digests',
    title: `Weekly Digest - ${weekStart}`,
    metadata: {
      user: userId,
      week_start_date: weekStart,
      week_end_date: weekEnd,
      articles: articles.objects.map(a => a.id),
      digest_status: 'pending'
    }
  })
  
  return digest.object
}
```

## Cosmic CMS Integration

This application uses [Cosmic](https://www.cosmicjs.com) as a headless CMS to manage:

- **User Profiles**: Account information, subscription tiers, and preferences
- **Saved Articles**: URL collection with metadata and tagging
- **Weekly Digests**: Batch organization and email tracking
- **Email Templates**: Customizable digest formats
- **Subscription Plans**: Pricing and feature definitions
- **Tags**: Organizational categories with color coding

For more information about Cosmic CMS, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Netlify

1. Build the application:
```bash
bun run build
```

2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Other Platforms

The application can be deployed to any platform that supports Next.js applications. Make sure to configure the environment variables according to your platform's requirements.

## Environment Variables

Make sure to set these environment variables in your production environment:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## License

This project is open source and available under the [MIT License](LICENSE).
<!-- README_END -->