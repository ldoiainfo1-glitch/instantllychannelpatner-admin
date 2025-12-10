#!/bin/bash
# Build script for Vercel deployment
# Copies all static files to public directory

echo "📦 Building Channel Partner Admin..."

# Create public directory
mkdir -p public

# Copy all HTML files
echo "  Copying HTML files..."
cp *.html public/ 2>/dev/null || true

# Copy JavaScript files
echo "  Copying JS files..."
cp *.js public/ 2>/dev/null || true

# Copy CSS directory
echo "  Copying CSS directory..."
cp -r css public/ 2>/dev/null || true

# Copy images directory
echo "  Copying images directory..."
cp -r images public/ 2>/dev/null || true

# Copy any other necessary files
echo "  Copying additional files..."
cp *.csv public/ 2>/dev/null || true

echo "✅ Build complete! Files copied to public/"
ls -la public/
