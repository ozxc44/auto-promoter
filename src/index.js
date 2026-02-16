/**
 * Auto-Promoter - Main Entry Point
 * Automated promotion tool for open source projects
 */

import 'dotenv/config';
import { publishProjectAnnouncement as publishToDevTo } from './devto.js';
import { publishProjectAnnouncement as publishToHashNode } from './hashnode.js';
import { publishProjectAnnouncement as publishToBluesky } from './bluesky.js';
import { publishProjectAnnouncement as publishToMastodon } from './mastodon.js';

const platforms = {
  devto: { name: 'Dev.to', fn: publishToDevTo, env: 'DEVTO_API_KEY' },
  hashnode: { name: 'Hashnode', fn: publishToHashNode, env: 'HASHNODE_API_KEY' },
  bluesky: { name: 'Bluesky', fn: publishToBluesky, env: 'BLUESKY_APP_PASSWORD' },
  mastodon: { name: 'Mastodon', fn: publishToMastodon, env: 'MASTODON_ACCESS_TOKEN' }
};

export async function promoteToAllPlatforms(config) {
  const results = [];

  console.log('🚀 Starting promotion campaign...\n');

  for (const [key, platform] of Object.entries(platforms)) {
    if (!process.env[platform.env]) {
      console.log(`⏭️  Skipping ${platform.name} - no ${platform.env} configured`);
      continue;
    }

    try {
      console.log(`📤 Posting to ${platform.name}...`);
      const result = await platform.fn(config);
      console.log(`✅ ${platform.name} success!`);
      console.log(`   URL: ${result.url || result.uri}\n`);
      results.push({ platform: platform.name, success: true, result });
    } catch (error) {
      console.error(`❌ ${platform.name} failed: ${error.message}\n`);
      results.push({ platform: platform.name, success: false, error: error.message });
    }
  }

  return results;
}

export async function promoteToPlatform(platform, config) {
  const p = platforms[platform];
  if (!p) {
    throw new Error(`Unknown platform: ${platform}. Available: ${Object.keys(platforms).join(', ')}`);
  }

  if (!process.env[p.env]) {
    throw new Error(`Missing environment variable: ${p.env}`);
  }

  console.log(`📤 Posting to ${p.name}...`);
  const result = await p.fn(config);
  console.log(`✅ Success!`);
  console.log(`   URL: ${result.url || result.uri}`);

  return result;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const config = {
    projectName: process.env.PROJECT_NAME || 'My Project',
    projectUrl: process.env.PROJECT_URL || 'https://github.com/user/repo',
    description: process.env.PROJECT_DESCRIPTION || 'An awesome open source project',
    tags: (process.env.PROJECT_TAGS || '').split(',').filter(Boolean)
  };

  const targetPlatform = process.argv[2];

  if (targetPlatform && targetPlatform !== 'all') {
    promoteToPlatform(targetPlatform, config).catch(console.error);
  } else {
    promoteToAllPlatforms(config).then(results => {
      const success = results.filter(r => r.success).length;
      console.log(`\n📊 Summary: ${success}/${results.length} platforms succeeded`);
    }).catch(console.error);
  }
}
