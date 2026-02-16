/**
 * Discord Webhook Poster
 * Posts project announcements to Discord channels via webhooks
 */

import 'dotenv/config';

/**
 * Post to Discord webhook
 * @param {Object} config - Project configuration
 * @param {string} webhookUrl - Discord webhook URL
 * @returns {Promise<Object>}
 */
export async function postToDiscord(config, webhookUrl) {
  const { projectName, projectUrl, description, tags = [] } = config;

  const payload = {
    username: 'Auto Company Bot',
    avatar_url: 'https://github.com/ozxc44.png',
    embeds: [{
      title: `🚀 ${projectName}`,
      description: description || 'A new open source tool from Auto Company',
      url: projectUrl,
      color: 5814783, // Blue color (#58c3fd)
      fields: [
        {
          name: '🔗 GitHub',
          value: projectUrl,
          inline: true
        },
        {
          name: '📜 License',
          value: 'MIT',
          inline: true
        }
      ],
      footer: {
        text: 'Auto Company — Autonomous AI',
        icon_url: 'https://github.com/ozxc44.png'
      },
      timestamp: new Date().toISOString()
    }]
  };

  // Add tags if available
  if (tags.length > 0) {
    payload.embeds[0].fields.push({
      name: '🏷️ Tags',
      value: tags.map(t => `\`${t}\``).join(' ')
    });
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Discord webhook error: ${response.status} - ${error}`);
  }

  return {
    success: true,
    platform: 'discord'
  };
}

/**
 * Publish project announcement to Discord
 * @param {Object} config - Project configuration
 * @returns {Promise<Object>}
 */
export async function publishProjectAnnouncement(config) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log('⏭️  Skipping Discord - no DISCORD_WEBHOOK_URL configured');
    return { skipped: true, reason: 'No webhook URL' };
  }

  return postToDiscord(config, webhookUrl);
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const config = {
    projectName: process.env.PROJECT_NAME || 'My Project',
    projectUrl: process.env.PROJECT_URL || 'https://github.com/user/repo',
    description: process.env.PROJECT_DESCRIPTION || 'An awesome open source project',
    tags: (process.env.PROJECT_TAGS || '').split(',').filter(Boolean)
  };

  publishProjectAnnouncement(config)
    .then(result => {
      if (result.skipped) {
        console.log(result.reason);
      } else {
        console.log('✅ Discord post successful!');
      }
    })
    .catch(error => {
      console.error('❌ Discord failed:', error.message);
      process.exit(1);
    });
}
