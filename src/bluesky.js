/**
 * Bluesky API Poster
 * https://docs.bsky.app/blog/create-post
 */

const BLUESKY_PLC = 'https://api.bsky.app';

export async function createSession(handle, appPassword) {
  const response = await fetch(`${BLUESKY_PLC}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: handle,
      password: appPassword
    })
  });

  if (!response.ok) {
    throw new Error(`Bluesky auth failed: ${response.status}`);
  }

  return response.json();
}

export async function postToBluesky(text, handle, appPassword) {
  // Create session
  const session = await createSession(handle, appPassword);

  // Create post
  const response = await fetch(`${BLUESKY_PLC}/xrpc/com.atproto.repo.createRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessJwt}`
    },
    body: JSON.stringify({
      repo: session.did,
      collection: 'app.bsky.feed.post',
      record: {
        $type: 'app.bsky.feed.post',
        text: text,
        createdAt: new Date().toISOString()
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Bluesky post failed: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    success: true,
    uri: data.uri,
    cid: data.cid
  };
}

export async function publishProjectAnnouncement(config) {
  const { projectName, projectUrl, description } = config;

  const maxLength = 300;
  const hashtag = '#opensource #javascript';

  let text = `🚀 ${projectName}

${description}

${projectUrl}

${hashtag}`;

  // Truncate if needed
  if (text.length > maxLength) {
    const descLength = maxLength - text.length + description.length;
    text = `🚀 ${projectName}

${description.substring(0, descLength - 3)}...

${projectUrl}

${hashtag}`;
  }

  return postToBluesky(
    text,
    process.env.BLUESKY_HANDLE,
    process.env.BLUESKY_APP_PASSWORD
  );
}
