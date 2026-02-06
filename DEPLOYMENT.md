# Deployment Guide 🚀

Your portfolio is ready to go live! Follow these steps to deploy it using GitHub and Vercel.

## 1. Safety Check ✅

I've already secured your project by:
- Adding `.env` to `.gitignore` so your Supabase keys don't leak.
- Fixing build warnings to ensure a smooth deployment.

## 2. Push to GitHub 🐙

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
    ```

2.  **Create a Repo**: Go to [GitHub.com/new](https://github.com/new) and create a repository named `verse-weaver` (or whatever you like).

3.  **Push Code**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/verse-weaver.git
    git branch -M main
    git push -u origin main
    ```

## 3. Deploy to Vercel ▲

1.  Go to [Vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your `verse-weaver` repository and click **Import**.

### CRITICAL STEP: Environment Variables 🔑

Before clicking "Deploy", you MUST add your Environment Variables.
Find the **"Environment Variables"** section and add these two:

| Key | Value |
| :--- | :--- |
| `VITE_SUPABASE_URL` | *[Your Supabase URL]* |
| `VITE_SUPABASE_ANON_KEY` | *[Your Supabase Anon Key]* |

> **Tip**: You can find these values in your local `.env` file. Open it with Notepad to copy them.

4.  Click **Deploy**! 🚀

## 4. Final Polish ✨

- **Custom Domain**: Once deployed, you can add your own domain (e.g., `ritishdhar.com`) in the Vercel project settings.
- **Updates**: Anytime you want to update the site, just run:
  ```bash
  git add .
  git commit -m "Update site"
  git push
  ```
  Vercel will automatically detect the push and redeploy!
