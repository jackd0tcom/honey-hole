# Git Updater Setup Guide for Honey Hole Plugin

## What is Git Updater?

Git Updater (formerly GitHub Updater) is a WordPress plugin that allows your plugin to receive automatic updates directly from GitHub releases. Users don't need to manually download and upload new versions.

## Step 1: Install Git Updater Plugin

### Option A: WordPress Admin Dashboard (Recommended)
1. Go to **Plugins > Add New** in your WordPress admin
2. Click **Upload Plugin**
3. Download the latest Git Updater from: https://github.com/afragen/git-updater/releases/latest
   - Download the `git-updater.zip` file
4. Upload and activate the plugin

### Option B: Via WP-CLI (Command Line)
```bash
wp plugin install --activate https://github.com/afragen/git-updater/archive/master.zip
```

### Option C: Via Composer
Add to your `composer.json`:
```json
{
    "require": {
        "afragen/git-updater": "^12"
    }
}
```

## Step 2: Configure Git Updater (Optional)

After activating Git Updater, you may need to:
1. Go to **Settings > Git Updater**
2. If your repository is **private**, you'll need to add a Personal Access Token:
   - Go to GitHub > Settings > Developer settings > Personal access tokens
   - Create a token with `repo` scope
   - Add it in Git Updater settings

**Note:** For public repositories, no token is needed!

## Step 3: Verify Your Plugin Header

Your plugin header in `honey-hole.php` should include:
- ✅ `Plugin Name: Honey Hole 2.0`
- ✅ `Version: 2.1.0` (update this for each release)
- ✅ `Update URI: https://github.com/jackd0tcom/honey-hole`
- ✅ `GitHub Plugin URI: jackd0tcom/honey-hole`

## Step 4: Create a GitHub Release

When you're ready to release a new version:

### 4.1: Create a ZIP File
Run your zip script:
```bash
cd /Users/jackball/Local\ Sites/honey-hole/app/public/wp-content/plugins/honey-hole
./zip-plugin.sh
```

This creates: `honey-hole-plugin.zip` in the `plugins` directory.

### 4.2: Push Your Code to GitHub
Make sure all your changes are committed and pushed:
```bash
cd /Users/jackball/Local\ Sites/honey-hole/app/public/wp-content/plugins/honey-hole
git add .
git commit -m "Version 2.1.0 - Description of changes"
git push
```

### 4.3: Create a Release on GitHub
1. Go to your repository: https://github.com/jackd0tcom/honey-hole
2. Click **Releases** (right sidebar)
3. Click **Create a new release**
4. Fill in:
   - **Tag version**: `2.1.0` (must match your plugin version, prefixed with `v` if you prefer: `v2.1.0`)
   - **Release title**: `Version 2.1.0` or descriptive name
   - **Description**: What's new in this version
5. **Upload the ZIP file** you created:
   - Scroll down to **Attach binaries**
   - Click **select your files** or drag & drop `honey-hole-plugin.zip`
   - **Important:** The ZIP should contain the plugin folder (e.g., `honey-hole/honey-hole.php`)
6. Click **Publish release**

### 4.4: Update Your Plugin Version
Before creating each new release:
1. Update the version in `honey-hole.php`:
   ```php
   * Version:           2.1.0
   define('HONEY_HOLE_VERSION', '2.1.0');
   ```
2. Update `README.txt` stable tag if you have one
3. Commit and push these changes
4. Then create the GitHub release

## Step 5: Testing Updates

### Test the Update Process:
1. Install an older version of your plugin on a test site
2. Install and activate Git Updater
3. Go to **Dashboard > Updates** or **Plugins**
4. You should see "Honey Hole 2.0" with an update available
5. Click **Update Now** to test the update process

### Check for Updates:
- Git Updater checks for updates every 12 hours
- You can manually check by going to **Dashboard > Updates** and clicking **Check Again**
- Or go to **Plugins** page - updates will show there too

## How It Works

1. **Git Updater** checks GitHub for new releases
2. When a new release is found (version number is higher), it shows an update notification
3. WordPress downloads the ZIP file from the GitHub release
4. WordPress automatically updates your plugin

## Troubleshooting

### Updates Not Showing?
- ✅ Make sure Git Updater is activated
- ✅ Check that `GitHub Plugin URI` is correct in plugin header
- ✅ Verify the GitHub release tag matches your version (or is higher)
- ✅ Ensure the release includes a ZIP file attachment
- ✅ Clear WordPress transients: Go to **Settings > Git Updater > Clear Cache**

### ZIP File Structure Issue?
The ZIP should have this structure:
```
honey-hole-plugin.zip
└── honey-hole/
    ├── honey-hole.php
    ├── admin/
    ├── includes/
    └── ... (all other files)
```

Your `zip-plugin.sh` script already creates this structure correctly!

### Private Repository?
If your repo is private:
1. Generate a GitHub Personal Access Token
2. Go to **Settings > Git Updater**
3. Add the token in the settings

## Quick Release Checklist

Before creating each release:
- [ ] Update version in `honey-hole.php` (both places)
- [ ] Test all functionality
- [ ] Run `./zip-plugin.sh` to create ZIP
- [ ] Commit and push all changes to GitHub
- [ ] Create GitHub release with matching version tag
- [ ] Upload the ZIP file to the release
- [ ] Test update on a staging site

## More Information

- Git Updater Documentation: https://git-updater.com/knowledge-base/
- Git Updater GitHub: https://github.com/afragen/git-updater

