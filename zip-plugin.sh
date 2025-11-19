#!/bin/bash

# Honey Hole Plugin - Zip Script
# This script creates a zip file of the plugin, excluding development files

# Navigate to the plugins directory (parent of honey-hole)
cd "$(dirname "$0")/.." || exit

# Remove old zip if it exists
rm -f honey-hole-plugin.zip

# Create zip file, excluding development files
zip -r honey-hole-plugin.zip honey-hole \
  -x "honey-hole/node_modules/*" \
  -x "honey-hole/.git/*" \
  -x "honey-hole/.gitignore" \
  -x "honey-hole/package*.json" \
  -x "honey-hole/webpack.config.js" \
  -x "honey-hole/postcss.config.js" \
  -x "honey-hole/watch.sh" \
  -x "honey-hole/test-big-sale.php" \
  -x "honey-hole/test-big-sale-feature.php" \
  -x "honey-hole/cursor_implementing_a_plugin_feature.md" \
  -x "honey-hole/BIG_SALE_FEATURE.md" \
  -x "honey-hole/CHANGELOG.md" \
  -x "honey-hole/zip-plugin.sh"

# Show the result
echo ""
echo "✅ Plugin zipped successfully!"
echo "📦 File: $(pwd)/honey-hole-plugin.zip"
ls -lh honey-hole-plugin.zip

