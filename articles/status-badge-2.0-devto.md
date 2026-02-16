# 🚀 Status Badge 2.0: A Zero-Config Status Widget for Your Website

![Status Badge](https://img.shields.io/badge/status-active-brightgreen)

> **TL;DR**: A lightweight, zero-config status badge widget for websites. Embed with one line of code, no backend required. Deploy on Cloudflare Workers for free.

## 🌐 Live Demo & Code

- **GitHub**: [status-badge-2](https://github.com/user/status-badge-2)
- **Live Demo**: Coming Soon
- **Deploy Your Own**: One-click Cloudflare Workers deployment

## ✨ Why Status Badge 2.0?

Every SaaS product needs a status page. But traditional status pages are:
- **Heavy** - Require backend infrastructure
- **Complex** - Need database, monitoring, alerts
- **Expensive** - Hosting costs add up

**Status Badge 2.0** is different. It's a:
- **Zero-config** widget - Embed and forget
- **Lightweight** - Just a few KB
- **Free to host** - Cloudflare Workers free tier
- **Customizable** - Your branding, your colors

## 🛠️ How It Works

The widget is a single JavaScript snippet that renders a status indicator on your site:

```html
<script src="https://your-worker.workers.dev/widget.js"
  data-status="operational"
  data-color="#10b981"
  data-text="All Systems Operational">
</script>
```

The script fetches the current status from your Cloudflare Worker and updates the badge in real-time.

## 📦 Tech Stack

- **Runtime**: Cloudflare Workers (Edge computing)
- **Storage**: Cloudflare KV (Key-Value store)
- **Frontend**: Vanilla JavaScript (no dependencies)
- **Deployment**: `wrangler` CLI

## 🚀 Quick Start

### 1. Clone and Deploy

```bash
git clone https://github.com/user/status-badge-2.git
cd status-badge-2
npm install
npm run deploy
```

### 2. Configure Your Status

Update the status in Cloudflare KV:

```bash
wrangler kv:key put --binding=STATUS "status" "operational"
```

### 3. Embed on Your Site

```html
<script
  src="https://your-worker.workers.dev/widget.js"
  data-status="auto">
</script>
```

## 🎨 Features

| Feature | Status |
|---------|--------|
| Zero-config deployment | ✅ |
| Custom colors & text | ✅ |
| Real-time updates | ✅ |
| Multiple instances | ✅ |
| Status history API | 🚧 Roadmap |
| Incident notifications | 🚧 Roadmap |

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

## 📝 License

MIT License - Free for personal and commercial use.

---

*This post was automatically generated using [auto-promoter](https://github.com/user/auto-promoter)*

## 🔗 Links

- [GitHub Repository](https://github.com/user/status-badge-2)
- [Documentation](https://github.com/user/status-badge-2#readme)
- [Issues](https://github.com/user/status-badge-2/issues)

---

**Tags**: #opensource #javascript #cloudflare #webdev #showdev #statuspage #saas #widget
