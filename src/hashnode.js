/**
 * Hashnode GraphQL API Poster
 * https://docs.hashnode.com/quickstart/introduction
 */

const HASHNODE_GRAPHQL = 'https://gql.hashnode.com';

export async function postToHashNode(post, apiKey, publicationId) {
  const query = `
    mutation CreatePublicationDraft($input: CreateDraftInput!) {
      createDraft(input: $input) {
        draft {
          id
          slug
          title
          url
        }
      }
    }
  `;

  const variables = {
    input: {
      publicationId: publicationId,
      title: post.title,
      contentMarkdown: post.body,
      tags: post.tags?.map(t => ({ name: t })) || [],
      coverImageURL: post.coverImage,
      hideFromHashnode: post.hideFromHashnode || false
    }
  };

  const response = await fetch(HASHNODE_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hashnode API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Hashnode GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  return {
    success: true,
    url: `https://hashnode.com/${data.data.createDraft.draft.slug}`,
    id: data.data.createDraft.draft.id
  };
}

export async function publishProjectAnnouncement(config) {
  const { projectName, projectUrl, description, tags = [] } = config;

  const post = {
    title: `🚀 Introducing ${projectName}`,
    body: `# ${projectName}

${description}

## 🌐 Links

- **GitHub Repository**: ${projectUrl}

## ✨ Key Features

- Easy to use
- Lightweight
- Open source

## 🛠️ Tech Stack

- JavaScript
- Cloudflare Workers

## 🚀 Getting Started

\`\`\`bash
npm install
\`\`\`

---

*Auto-generated post for open source project promotion*
`,
    tags: ['opensource', 'javascript', 'webdev', ...tags]
  };

  return postToHashNode(
    post,
    process.env.HASHNODE_API_KEY,
    process.env.HASHNODE_PUBLICATION_ID
  );
}
