# CyberAware Sample News Data Generator

This script generates realistic sample news data for the CyberAware platform. It creates news articles with realistic titles, descriptions, content, and metadata that match the schema of the news model.

## Features

- Generates 50 sample news articles
- Creates India-specific cybersecurity news content
- Assigns appropriate categories based on the news model
- Sets realistic view counts, timestamps, and publishing status
- Links articles to an existing admin user

## Requirements

- Node.js environment
- MongoDB connection
- An admin user must exist in the database

## Usage

1. Make sure all dependencies are installed:

```bash
npm install
```

2. Run the script:

```bash
node scripts/generateNewsData.js
```

## Data Generated

Each news article includes:
- Title (relevant to the selected category)
- Description (50-200 words)
- Content (HTML formatted with multiple paragraphs)
- Image URL
- Source name and URL
- Category (from predefined list)
- Author (admin user ID)
- View count
- Published status
- Creation timestamp

## Categories

The script generates news articles in the following categories:
- Data Breach
- Malware
- Phishing
- Ransomware
- Vulnerability
- Regulation
- Industry News
- Other

## Notes

- The script will clear all existing news articles before generating new ones
- You must have an admin user in the database before running the script
- The MongoDB connection details are read from your .env file
