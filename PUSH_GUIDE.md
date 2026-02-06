# How to Push to GitHub

Follow these steps to upload your code to GitHub for the first time.

### Step 1: Create a Repository on GitHub
1.  Log in to your [GitHub account](https://github.com).
2.  Click the **+** (plus) icon in the top right and select **New repository**.
3.  Give it a name (e.g., `edurank`).
4.  Keep it **Public** (or Private if you prefer).
5.  **DO NOT** check any "Initialize this repository with" options (README, .gitignore, etc.).
6.  Click **Create repository**.

### Step 2: Connect Local Project to GitHub
Open your terminal in the project directory (`C:\Users\prabh\.gemini\antigravity\scratch`) and run these commands one by one:

1.  **Initialize Git** (if not already done):
    ```powershell
    git init
    ```
2.  **Add all files**:
    ```powershell
    git add .
    ```
3.  **Commit the changes**:
    ```powershell
    git commit -m "Initial commit with dark mode and rankings"
    ```
4.  **Add the remote URL** (Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual ones):
    ```powershell
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    ```
5.  **Rename branch to main**:
    ```powershell
    git branch -M main
    ```
6.  **Push to GitHub**:
    ```powershell
    git push -u origin main
    ```

### Step 3: Verify Deployment
If you used my previous configuration:
*   **GitHub Actions**: Go to the **Actions** tab in your GitHub repository. You should see a workflow running. Once finished, your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.
*   **Vercel**: If you prefer Vercel, just go to [vercel.com](https://vercel.com) and import this repository. It will handle the rest.

---

### Troubleshooting
*   **Authentication**: If it asks for a password, it's usually recommended to use a [GitHub Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) instead of your regular password.
*   **Existing Remote**: If you get an error "remote origin already exists", run `git remote remove origin` first, then try the `add` command again.
