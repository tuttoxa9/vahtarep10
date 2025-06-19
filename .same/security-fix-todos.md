# Security Configuration Fix Tasks

## Current Issues
- Strict security headers in netlify.toml blocking external services
- CSP (Content Security Policy) needs to be relaxed for third-party integrations
- X-Frame-Options may be blocking iframes
- Permissions-Policy may be blocking required features

## Tasks to Complete

### 1. [COMPLETED] Update netlify.toml security headers ✅
- ✅ Modified X-Frame-Options to SAMEORIGIN for legitimate services
- ✅ Added comprehensive CSP header that allows necessary external domains
- ✅ Updated Permissions-Policy to be less restrictive
- ✅ Made compatible with:
  - Yandex.Metrika (mc.yandex.ru)
  - Google Analytics (googletagmanager.com, www.google-analytics.com)
  - Firebase (firestore.googleapis.com, identitytoolkit.googleapis.com, etc.)
  - All HTTPS images (img-src https:)
  - Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
  - CDN services (cdn.jsdelivr.net)

### 2. [COMPLETED] Add Content Security Policy ✅
- ✅ Allow script-src for analytics (Yandex.Metrika, Google Analytics)
- ✅ Allow img-src for external images (https: wildcard)
- ✅ Allow connect-src for API calls (Firebase, Analytics APIs)
- ✅ Allow frame-src for Google services embeds

### 3. [COMPLETED] Documentation and Git Push ✅
- ✅ Created comprehensive CSP_SECURITY_FIX.md documentation
- ✅ Committed changes to git with detailed commit messages
- ✅ Pushed all changes to GitHub repository
- ✅ Provided troubleshooting guide for future CSP issues

### 4. [COMPLETED] Add Yandex.Webmaster verification ✅
- ✅ Added Yandex.Webmaster verification meta tag to layout.tsx
- ✅ Meta tag: `<meta name="yandex-verification" content="0d805610cfa9353f" />`

### 5. [PENDING] Test external service compatibility
- 🔄 Verify Yandex.Metrika works (requires deployment)
- 🔄 Verify Google Analytics works (requires deployment)
- 🔄 Verify Firebase integration works (requires deployment)
- 🔄 Test form submissions and external API calls (requires deployment)

## Notes
- Need to balance security with functionality
- Keep essential security headers
- Make CSP as specific as possible while allowing required services
