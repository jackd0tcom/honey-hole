#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Copy the built files to the WordPress plugin
echo "Copying files to WordPress plugin..."
cp -r dist/* ../wordpress-plugin/build/

# Copy the built files to the local WordPress installation
echo "Copying files to local WordPress installation..."
cp -r dist/* ~/Local\ Sites/honey-hole/app/public/wp-content/plugins/honey-hole/build/

echo "Build complete!" 