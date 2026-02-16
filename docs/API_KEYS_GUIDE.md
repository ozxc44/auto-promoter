# API Key Acquisition Guide for auto-promoter

This guide walks you through getting API keys for all supported platforms.

## 📋 Quick Reference

| Platform | Difficulty | Time | Notes |
|----------|------------|------|-------|
| Dev.to | ⭐ Easy | 2 min | Instant |
| Hashnode | ⭐ Easy | 3 min | Instant |
| Bluesky | ⭐⭐ Medium | 5 min | Need existing account |
| Mastodon | ⭐⭐ Medium | 5 min | Choose instance |

---

## 1. Dev.to API Key

### Steps:

1. **Login** to [dev.to](https://dev.to)
2. **Navigate** to [Account Settings](https://dev.to/settings/account)
3. **Scroll** to the "DEV API Keys" section
4. **Click** "Generate API Key"
5. **Copy** the generated key
6. **Paste** into `.env`:

```bash
DEVTO_API_KEY=your_api_key_here
```

### Permissions:

- Your API key can: Create, read, update, and delete articles
- Keep it secret! Don't commit to git

---

## 2. Hashnode Personal Access Token

### Steps:

1. **Login** to [hashnode.com](https://hashnode.com)
2. **Navigate** to [Developer Settings](https://hashnode.com/settings/developer)
3. **Click** "Generate New Token"
4. **Name** it (e.g., "auto-promoter")
5. **Copy** the token
6. **Paste** into `.env`:

```bash
HASHNODE_API_KEY=your_token_here
```

### Get Publication ID:

1. Go to your blog on Hashnode
2. The URL format is: `https://hashnode.com/@username`
3. Your publication ID is usually your username
4. Add to `.env`:

```bash
HASHNODE_PUBLICATION_ID=@username
```

---

## 3. Bluesky App Password

⚠️ **Important**: Bluesky requires an **App Password**, NOT your account password!

### Steps:

1. **Login** to [bsky.app](https://bsky.app)
2. **Navigate** to [Settings](https://bsky.app/settings)
3. **Scroll** to "App Passwords"
4. **Click** "Add App Password"
5. **Name** it (e.g., "auto-promoter")
6. **Copy** the generated password
7. **Get your handle** (e.g., `username.bsky.social`)
8. **Paste** into `.env`:

```bash
BLUESKY_HANDLE=your_handle.bsky.social
BLUESKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

### Why App Password?

App passwords are more secure and can be revoked individually without affecting your main account.

---

## 4. Mastodon Access Token

⚠️ **Important**: Mastodon is decentralized! You need to choose an instance.

### Popular Instances:

- **mastodon.social** - Largest, but sometimes slow
- **hachyderm.io** - Tech-focused community
- **fosstodon.org** - Open source focused

### Steps:

1. **Login** to your chosen Mastodon instance
2. **Navigate** to [Settings > Development](https://mastodon.social/settings/applications)
3. **Click** "New Application"
4. **Fill out** the form:
   - Application name: `auto-promoter`
   - Application website: `https://github.com/user/auto-promoter`
   - Scopes: `write:statuses`
5. **Submit** and get your access token
6. **Copy** the access token
7. **Paste** into `.env`:

```bash
MASTODON_INSTANCE=https://mastodon.social
MASTODON_ACCESS_TOKEN=your_access_token_here
```

---

## 🔒 Security Best Practices

1. **Never commit** `.env` to git (it's in `.gitignore`)
2. **Use separate keys** for development and production
3. **Rotate keys** periodically
4. **Revoke immediately** if compromised
5. **Use read-only** keys when possible

---

## 🧪 Test Your Keys

After setting up keys, test them:

```bash
cd auto-promoter
npm install

# Test all platforms
node src/index.js all

# Test specific platform
node src/index.js devto
```

---

## 📝 Next Steps

1. ✅ Get all API keys
2. ✅ Configure `.env`
3. ✅ Test with a sample post
4. ✅ Run promotion campaign

---

**Need help?** Open an issue on [GitHub](https://github.com/user/auto-promoter/issues)
