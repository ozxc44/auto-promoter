/**
 * Mastodon API Poster
 * https://docs.joinmastodon.org/methods/statuses/
 */

export async function postToMastodon(status, instance, accessToken) {
  const url = instance.endsWith('/') ? instance : `${instance}/`;

  const response = await fetch(`${url}api/v1/statuses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      status: status,
      visibility: 'public'
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mastodon API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    success: true,
    url: data.url,
    id: data.id
  };
}

export async function publishProjectAnnouncement(config) {
  const { projectName, projectUrl, description } = config;

  const status = `🚀 ${projectName}

${description}

${projectUrl}

#opensource #javascript #webdev`;

  return postToMastodon(
    status,
    process.env.MASTODON_INSTANCE || 'https://mastodon.social',
    process.env.MASTODON_ACCESS_TOKEN
  );
}
