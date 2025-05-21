# CyberAware Sample Data Generation

This document provides an overview of the sample data generation process for the CyberAware platform.

## Generated Data Overview

### News Articles
- **Total Articles**: 50
- **Categories Covered**: Data Breach, Malware, Phishing, Ransomware, Vulnerability, Regulation, Industry News, Other
- **Content Type**: Realistic cybersecurity news with India-specific content
- **Author**: Admin user (ID: see admin-credentials.txt)

## Data Structure

Each news article includes:
- **Title**: Relevant to the category (e.g., "Major Data Breach at [Company]")
- **Description**: 50-200 word summary
- **Content**: HTML-formatted article with multiple paragraphs, headings, quotes, and lists
- **Image**: URL to a cybersecurity-related image
- **Source**: Name of a cybersecurity news source
- **Source URL**: URL to the original source
- **Category**: One of the predefined categories
- **Views**: Random view count (0-5000)
- **Publication Status**: 90% published, 10% drafts
- **Creation Date**: Random date within the past 180 days

## Usage in the Application

The generated news data can be used in the following parts of the application:

1. **News Page** (`/news`): 
   - Displays all published news articles
   - Supports search and filtering by category
   - Shows pagination when there are multiple pages

2. **News Detail Page** (`/news/[id]`): 
   - Displays the full content of an individual news article
   - Shows related news articles

3. **Admin News Management** (`/admin/manage-news`):
   - Lists all news articles (published and drafts)
   - Allows editing, deleting, and adding news articles

4. **Homepage News Section**:
   - Displays the latest news articles in a slider

## Scripts Available

The following npm scripts are available for data management:

- `npm run create-admin`: Creates an admin user if one doesn't already exist
- `npm run generate-news`: Generates 50 sample news articles
- `npm run check-news`: Checks the count and sample of news articles in the database

## Files Generated

- `scripts/admin-credentials.txt`: Contains the credentials for the admin user
- `scripts/sample-news.txt`: Contains samples of the generated news articles
- `scripts/data-generation.log`: Contains the log of the data generation process

## Next Steps

1. **Browse the News**: Visit `/news` to see the generated news articles
2. **Manage News**: Visit `/admin/manage-news` to manage the news articles (requires admin login)
3. **Add More Data**: Modify the scripts to generate more types of data if needed

## Notes

- The script generates unique content for each article
- Images are from a predefined set of URLs
- All news articles are associated with the admin user
- Some articles are in draft mode (not published)
