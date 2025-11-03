#!/bin/bash

# Ceylon Care - Quick Deploy to Vercel
# Run this script to deploy your app

echo "🚀 Ceylon Care - Vercel Deployment Script"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ceylon Care Investment Platform"
else
    echo "✅ Git repository already initialized"
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo ""
echo "🔨 Building project to check for errors..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Push to GitHub:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/ceylon-care.git"
    echo "   git push -u origin main"
    echo ""
    echo "2. Go to vercel.com and import your repository"
    echo ""
    echo "3. Add these environment variables in Vercel:"
    echo "   NEXT_PUBLIC_SUPABASE_URL"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   NEXT_PUBLIC_ADMIN_USERNAME"
    echo "   NEXT_PUBLIC_ADMIN_PASSWORD"
    echo ""
    echo "Or run: vercel (for instant deploy)"
    echo ""
else
    echo ""
    echo "❌ Build failed. Please fix errors above before deploying."
    exit 1
fi
