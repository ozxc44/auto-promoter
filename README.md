# 📢 Auto-Promoter

> **Automated promotion tool for open source projects**
> Publish your projects to Dev.to, Hashnode, Bluesky, and Mastodon with a single command.

## ✨ Features

- 📝 **Blog Posts** - Auto-publish articles to Dev.to and Hashnode
- 🐦 **Social Media** - Cross-post to Bluesky and Mastodon
- 🚀 **One Command** - Promote to all platforms at once
- 🔐 **Secure** - Uses environment variables for API keys
- 📦 **Zero Dependencies** - Built with Node.js native fetch

## 📋 Supported Platforms

| Platform | Type | Status |
|----------|------|--------|
| Dev.to | Blog | ✅ Fully Supported |
| Hashnode | Blog | ✅ Fully Supported |
| Bluesky | Social | ✅ Fully Supported |
| Mastodon | Social | ✅ Fully Supported |
| Product Hunt | Discovery | ⚠️ Manual Only |
| Hacker News | Discovery | ⚠️ Manual Only |

## 🛠️ Installation

```bash
# Clone or copy the project
cd auto-promoter

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

## ⚙️ Configuration

Edit `.env` with your API keys:

```bash
# Dev.to (Get from: https://dev.to/settings/account)
DEVTO_API_KEY=your_api_key_here

# Hashnode (Get from: https://hashnode.com/settings/developer)
HASHNODE_API_KEY=your_personal_access_token
HASHNODE_PUBLICATION_ID=your_publication_id

# Bluesky (Get from: https://bsky.app/settings/app-passwords)
BLUESKY_HANDLE=your_handle.bsky.social
BLUESKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx

# Mastodon (Get from: https://mastodon.social/settings/applications)
MASTODON_INSTANCE=https://mastodon.social
MASTODON_ACCESS_TOKEN=your_access_token

# Project info
PROJECT_NAME=My Awesome Project
PROJECT_URL=https://github.com/user/repo
PROJECT_DESCRIPTION=A brief description
PROJECT_TAGS=opensource,javascript,webdev
```

## 🚀 Usage

### Promote to all platforms:

```bash
npm run all
# or
node src/index.js
```

### Promote to specific platform:

```bash
npm run devto
# or
node src/index.js devto
```

### Use as a module:

```javascript
import { promoteToAllPlatforms, promoteToPlatform } from './src/index.js';

const config = {
  projectName: 'My Project',
  projectUrl: 'https://github.com/user/repo',
  description: 'An awesome project',
  tags: ['opensource', 'javascript']
};

// Promote to all configured platforms
await promoteToAllPlatforms(config);

// Or promote to a specific platform
await promoteToPlatform('devto', config);
```

## 📝 Custom Content

Create custom articles by modifying the post functions:

```javascript
// src/devto.js
export async function postCustomArticle(article) {
  return postToDevTo(article, process.env.DEVTO_API_KEY);
}

// Usage
await postCustomArticle({
  title: 'My Custom Title',
  body: '# Content here...',
  tags: ['javascript', 'tutorial'],
  published: true
});
```

## 🔑 Getting API Keys

### Dev.to
1. Go to https://dev.to/settings/account
2. Scroll to "DEV API Keys"
3. Generate a new key

### Hashnode
1. Go to https://hashnode.com/settings/developer
2. Create a Personal Access Token
3. Note your Publication ID from blog settings

### Bluesky
1. Go to https://bsky.app/settings/app-passwords
2. Create an app password (not your account password!)
3. Note your handle

### Mastodon
1. Go to https://mastodon.social/settings/applications
2. Create a new application
3. Copy the access token

## 📊 Platform Limitations

| Platform | Rate Limits | Notes |
|----------|-------------|-------|
| Dev.to | Reasonable | No explicit limit documented |
| Hashnode | Reasonable | No explicit limit documented |
| Bluesky | Reasonable | Documented in API |
| Mastodon | Instance-based | Varies by server |
| Product Hunt | N/A | No API for submissions |
| Hacker News | N/A | Read-only API |

## 🤝 Contributing

Contributions welcome! This is an open source project.

## 📄 License

MIT
