# Deployment Guide

To deploy this Next.js application, there are two main paths:

## Option 1: Vercel (Recommended)
Vercel is the creator of Next.js and provides the best support for dynamic features like Prisma, NextAuth, and API routes.

### Steps:
1.  **Create a GitHub Repository**:
    *   Initialize a git repo: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "initial commit"`
    *   Push to your GitHub account.
2.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com).
    *   Import your GitHub repository.
    *   Add your environment variables (from `.env`) in the Vercel dashboard:
        *   `DATABASE_URL`
        *   `NEXTAUTH_SECRET`
        *   `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (if using Google Auth)
3.  **Deploy**: Vercel will automatically build and deploy your site on every push.

## Option 2: GitHub Pages (Static Only)
> [!WARNING]
> This will disable dynamic features like Login, Admin Dashboard, and Database inquiries unless you migrate them to a purely client-side/mocked state.

### Steps:
1.  Update `next.config.ts`:
    ```typescript
    const nextConfig = {
      output: 'export',
      images: { unoptimized: true }
    };
    ```
2.  Create a GitHub Action at `.github/workflows/deploy.yml` (I can create this for you if you choose this path).
3.  Push to GitHub.

---

### Recommendation
**Use Option 1 (Vercel)**. It handles the backend logic automatically and is free for personal projects.
