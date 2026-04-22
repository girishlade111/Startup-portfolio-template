# 🚀 Startup Portfolio Template

A modern, high-performance portfolio website built with cutting-edge web technologies. Perfect for developers, founders, and creatives who want to showcase their work with style.

**Live Demo:** [https://girish.ladestack.in](https://girish.ladestack.in)

---

## ✨ Features

### 🎨 Visual & Interactive
- **Smooth Animations** — Powered by Framer Motion with staggered reveals and scroll-based transitions
- **3D Elements** — Three.js integrated particle fields and 3D visual effects
- **Custom Cursor** — Interactive cursor that follows mouse movement with magnetic effects
- **Theme Support** — Dark/Light mode toggle with smooth transitions
- **Scroll Progress** — Visual indicator showing scroll position on page

### 🎵 Audio & Music
- **Built-in Music Player** — 15 original tracks (LadeStack Originals) with visual audioizer
- **Audio Visualization** — Real-time frequency bars that react to music
- **Persistent Playback** — Music continues across page navigation
- **Background Ambient Sounds** — Optional atmospheric audio

### 📱 Sections & Components
- **Hero Section** — Animated intro with scroll-morph effect
- **About Section** — Personal bio with animated timeline
- **Skills Section** — Animated skill bars and categories
- **Products/Projects Section** — Showcase your work with product cards
- **Timeline Section** — Journey/progress visualization
- **Brand Section** — Infinite marquee of partner/client logos
- **Contact Section** — Contact information and links

### 🛠 Technical
- **SEO Optimized** — JSON-LD structured data, Open Graph images
- **Responsive Design** — Mobile-first approach, works on all devices
- **Performance Optimized** — Lazy loading, code splitting, optimized images
- **Loading States** — Beautiful loading screens and transitions

---

## 🛠 Tech Stack

### Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.3 | React framework with App Router |
| **TypeScript** | 5.x | Type-safe development |
| **React** | 19.2.4 | UI library |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |

### UI & Styling
| Technology | Purpose |
|------------|---------|
| **Framer Motion** | Animation library |
| **Three.js / React Three Fiber** | 3D graphics |
| **shadcn/ui** | UI component primitives |
| **Mantine** | Component library |
| **next-themes** | Dark/light mode |
| **Lucide React** | Icon library |

### Audio & Media
| Technology | Purpose |
|------------|---------|
| **Howler.js** | Audio playback |
| **@react-three/drei** | 3D helpers |

### Utilities
| Technology | Purpose |
|------------|---------|
| **clsx** | Conditional class names |
| **tailwind-merge** | Tailwind class merging |
| **sonner** | Toast notifications |

---

## 📦 Project Structure

```
portfolio/
├── app/
│   ├── components/        # App-level React components
│   ├── globals.css        # Global styles (Tailwind)
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading state
│   ├── not-found.tsx      # 404 page
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/
│   ├── music/             # Audio player components
│   ├── providers/         # UI provider wrappers
│   ├── sections/          # Page sections
│   ├── shared/            # Shared components (Navbar, Footer, etc.)
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/
│   ├── images/            # Static images
│   └── music/             # Audio files (local dev)
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment config
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** 18.x or later
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/girishlade111/Startup-portfolio-template.git
   cd Startup-portfolio-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_CF_R2_BASE_URL=https://your-bucket.r2.cloudflarestorage.com
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🎵 Music Setup

### For Production (Cloudflare R2)

1. Upload MP3 files to Cloudflare R2 bucket with public access
2. Name files: `song-1.mp3` through `song-15.mp3`
3. Add R2 public URL to Vercel environment variables:
   - **Variable:** `NEXT_PUBLIC_CF_R2_BASE_URL`
   - **Value:** `https://your-bucket-name.your-account-id.r2.cloudflarestorage.com`

### For Local Development

1. Place MP3 files in `/public/music/` directory
2. Name files: `song-1.mp3`, `song-2.mp3`, etc.
3. Files are served locally via `/music` path

---

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CF_R2_BASE_URL` | No | Cloudflare R2 bucket URL for audio files |

### Tailwind CSS

Tailwind CSS v4 uses CSS-based configuration. Custom styles are defined in `app/globals.css`.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_CF_R2_BASE_URL` = your R2 bucket URL

4. **Deploy:**
   - Click "Deploy" button
   - Wait for build to complete

5. **Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain
   - Configure DNS records with your registrar

### Deploy Command
```bash
vercel --prod
```

---

## 📈 Stats

| Metric | Value |
|--------|-------|
| **Total Files** | 54 |
| **Lines of Code** | 7000+ |
| **Dependencies** | 30+ |
| **Build Size** | Optimized for performance |

---

## 🔗 Links

- **Live Portfolio:** [https://girish.ladestack.in](https://girish.ladestack.in)
- **LadeStack:** [https://ladestack.in](https://ladestack.in)
- **GitHub:** [https://github.com/girishlade111](https://github.com/girishlade111)
- **Instagram:** [https://instagram.com/girish_lade_](https://instagram.com/girish_lade_)

---

## 📄 License

MIT License — Feel free to use this template for your own portfolio!

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using Next.js, Tailwind CSS, Framer Motion, and Three.js