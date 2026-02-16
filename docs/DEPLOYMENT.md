# Deployment Guide for auto-promoter

This project is ready to deploy to GitHub. Here's what needs to be done.

## 🚀 Quick Deploy

### 1. Create GitHub Repository

Since `gh` CLI is currently broken, use one of these methods:

**Option A: GitHub Web UI**
1. Go to https://github.com/new
2. Repository name: `auto-promoter`
3. Description: `Automated promotion tool for open source projects`
4. Public: ✅
5. Don't initialize with README (we have one)
6. Click "Create repository"

**Option B: Git Push**

```bash
cd /home/zzy/auto-company/projects/auto-promoter

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/auto-promoter.git

# Push
git push -u origin master
```

### 2. Verify Deployment

Visit: `https://github.com/YOUR_USERNAME/auto-promoter`

## 🧪 Testing the Tool

### 1. Get API Keys

Follow the guide in `docs/API_KEYS_GUIDE.md`

### 2. Configure Environment

```bash
cd /home/zzy/auto-company/projects/auto-promoter
cp .env.example .env

# Edit .env with your API keys
nano .env  # or use your preferred editor
```

### 3. Test with Real Post

```bash
# Test a single platform first (e.g., Dev.to)
node src/index.js devto

# If that works, test all platforms
node src/index.js all
```

## 📦 Using auto-promoter for Other Projects

### Method 1: Install as a Package

```bash
cd /path/to/your-project
npm install ../auto-promoter

# Create a publish script
cat > publish.js << 'EOF'
import { promoteToAllPlatforms } from 'auto-promoter';

await promoteToAllPlatforms({
  projectName: 'your-project-name',
  projectUrl: 'https://github.com/user/your-project',
  description: 'Your project description',
  tags: ['opensource', 'javascript', 'webdev']
});
EOF

node publish.js
```

### Method 2: Copy Files

```bash
cp -r /home/zzy/auto-company/projects/auto-promoter/src /path/to/your-project/tools/
```

## 🔄 Continuous Integration

### GitHub Actions Example

Create `.github/workflows/promote.yml`:

```yaml
name: Promote Release

on:
  release:
    types: [published]

jobs:
  promote:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - name: Publish to Dev.to
        env:
          DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}
        run: node src/index.js devto
```

Add secrets in GitHub Settings:
- `DEVTO_API_KEY`
- `HASHNODE_API_KEY`
- etc.

## 📋 Checklist

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Get Dev.to API key
- [ ] Get Hashnode API key
- [ ] Get Bluesky App Password
- [ ] Get Mastodon Access Token
- [ ] Test with sample post
- [ ] Publish first article about status-badge-2.0
- [ ] Add to project READMEs

## 🔧 Troubleshooting

### gh CLI is broken

Reinstall using npm:

```bash
echo 'prefix=~/.npm-global' > ~/.npmrc
npm uninstall -g gh
npm install -g gh

export PATH="$HOME/.npm-global/bin:$PATH"
gh auth login
```

### npm permission errors

```bash
echo 'prefix=~/.npm-global' > ~/.npmrc
export PATH="$HOME/.npm-global/bin:$PATH"
```

## 📊 Next Steps After Deployment

1. **Write first article** about status-badge-2.0
2. **Publish to Dev.to** and Hashnode
3. **Announce on Bluesky** and Mastodon
4. **Share link** on existing projects' READMEs
5. **Iterate** based on feedback

---

**Status**: ✅ Code ready, needs GitHub push
**Next Action**: Human creates GitHub repo and pushes code
