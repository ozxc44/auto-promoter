/**
 * Dev.to API Poster
 * https://developers.forem.com/api
 */

const DEVTO_API_BASE = 'https://dev.to/api';

export async function postToDevTo(article, apiKey) {
  const response = await fetch(`${DEVTO_API_BASE}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      article: {
        title: article.title,
        published: article.published ?? true,
        body_markdown: article.body,
        tags: article.tags || ['javascript', 'opensource', 'webdev'],
        series: article.series,
        canonical_url: article.canonicalUrl,
        cover_image: article.coverImage,
        description: article.description || article.excerpt
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Dev.to API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    success: true,
    url: data.url,
    id: data.id
  };
}

export async function publishProjectAnnouncement(config) {
  const { projectName, projectUrl, description, tags = [] } = config;

  const article = {
    title: `🚀 Introducing ${projectName}: ${description}`,
    body: `# ${projectName}

${description}

## 🌐 Demo & Code

- **GitHub**: ${projectUrl}
- **Live Demo**: [View Demo](${projectUrl.replace('github.com', 'github.io').replace('/repo/', '/repo/').replace('/tree/', '/').concat('/demo.html')})

## ✨ Features

- Feature 1
- Feature 2
- Feature 3

## 🛠️ Tech Stack

- JavaScript/TypeScript
- Cloudflare Workers
- GitHub Actions

## 📦 Installation

\`\`\`bash
npm install ${projectName.split('/')[1]}
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*This post was automatically generated. Check out the project on GitHub!*
`,
    tags: ['opensource', 'javascript', 'webdev', 'showdev', ...tags],
    published: true
  };

  return postToDevTo(article, process.env.DEVTO_API_KEY);
}
