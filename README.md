# Girish Lade Portfolio — girish.ladestack.in

Solo founder building free AI-powered developer tools. Based in Mumbai, India.

## Built with

- Next.js 16, TypeScript, Tailwind CSS 4
- Framer Motion, Three.js, Howler.js
- shadcn/ui, Mantine, next-themes

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Music Setup

The portfolio includes 15 original tracks (LadeStack Originals):

1. Code to Empire
2. Built in Silence
3. Lade Stack Rising
4. Zero to System
5. Architect of the Future
6. Midnight Deployments
7. Vision Over Comfort
8. One Man Infrastructure
9. From Local to Limitless
10. The Grind Protocol
11. Digital Bloodline
12. No Sleep Just Build
13. System Over Hype
14. Legacy in Code
15. Infinite Stack

### For Production Deployment

1. Upload MP3 files to Cloudflare R2 bucket (with public access enabled)
2. Name files: `song-1.mp3` through `song-15.mp3`
3. Add the R2 public URL to Vercel environment variables:
   - Variable: `NEXT_PUBLIC_CF_R2_BASE_URL`
   - Value: `https://your-bucket-name.your-account-id.r2.cloudflarestorage.com`

### For Local Development

Place MP3 files in `/public/music/` named `song-1.mp3`, `song-2.mp3`, etc. They will be served locally via `/music` path.

## Deployment

Deployed on Vercel: https://girish.ladestack.in

### Deploy Command

```bash
vercel --prod
```

### Manual Vercel Deployment

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio launch"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → Import GitHub repository

3. Add environment variable in Vercel project settings:
   - `NEXT_PUBLIC_CF_R2_BASE_URL` = your R2 bucket public URL

4. Deploy

5. Add custom domain:
   - Go to Vercel project settings → Domains → Add `girish.ladestack.in`
   - In your domain registrar (where ladestack.in is registered): add CNAME record
   - CNAME: `girish` → `cname.vercel-dns.com`

6. Wait 5-10 minutes for DNS propagation

7. Visit https://girish.ladestack.in — site is live!

## Links

- Portfolio: https://girish.ladestack.in
- LadeStack: https://ladestack.in
- GitHub: https://github.com/girishlade111
- Instagram: https://instagram.com/girish_lade_

## License

MIT