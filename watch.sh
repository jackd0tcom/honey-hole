#!/bin/bash

# Path to your WordPress plugin directory
WP_PLUGIN_DIR="/Users/jackball/Local Sites/honey-hole/app/public/wp-content/plugins/honey-hole"

# Path to your development plugin directory
DEV_PLUGIN_DIR="wordpress-plugin"

# Function to sync files
sync_files() {
    echo "Syncing files to WordPress..."
    cp -r "$DEV_PLUGIN_DIR"/* "$WP_PLUGIN_DIR/"
    echo "Sync complete!"
}

# Initial sync
sync_files

# Watch for changes and sync
fswatch -o "$DEV_PLUGIN_DIR" | while read f; do
    sync_files
done 