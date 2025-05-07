#!/bin/bash

# Path to your WordPress plugin directory
WP_PLUGIN_DIR="/Users/jackball/Local Sites/honey-hole-2/app/public/wp-content/plugins/honey-hole-v2"

# Path to your development plugin directory
DEV_PLUGIN_DIR="/Users/jackball/Desktop/Web Dev Projects/honey-hole-v2"

# Kill any existing watch processes
pkill -f "wp-scripts start"

# Start the wp-scripts watch process in the background
echo "Starting React compilation..."
npm run watch &
WP_PID=$!

# Function to sync files
sync_files() {
    echo "Syncing files to WordPress..."
    cp -r "$DEV_PLUGIN_DIR"/* "$WP_PLUGIN_DIR/"
    echo "Sync complete!"
}

# Initial sync
sync_files

# Watch for changes and sync
echo "Watching for changes..."
fswatch -o "$DEV_PLUGIN_DIR" | while read f; do
    sync_files
done 

# Cleanup on exit
trap "kill $WP_PID" EXIT 
