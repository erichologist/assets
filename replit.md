# Font Assets Collection

## Overview

This is an interactive font assets repository that serves as a browsable collection of various font families. The project provides a modern web interface for previewing, comparing, and exploring fonts including CartographCF (with Nerd Font variants), Dank Mono, Josefin, Parity Sans, and Concourse/Valkyrie fonts. The application serves font files with appropriate CORS headers and includes demo pages showcasing different font weights, styles, and OpenType features.

## Recent Changes (December 2025)

- Added dark/light mode toggle with localStorage persistence
- Implemented live text preview with custom input
- Added font comparison tool (side-by-side view)
- Added adjustable size and weight controls
- Implemented search and filter functionality
- Added copy CSS button for each font
- Implemented favorites system with localStorage
- Added animated hover effects and polished UI
- Fixed CORS issues with Parity Sans fonts (now uses local paths)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML/CSS/JS**: The frontend is built with vanilla HTML, CSS, and JavaScript - no framework
- **Theme Support**: Implements light/dark mode switching via CSS custom properties (CSS variables) with `data-theme` attribute on HTML root
- **Responsive Design**: Uses CSS Grid for font card layouts with `auto-fill` and `minmax` for responsive columns
- **Tab-Based Navigation**: Browse, Compare, and Favorites sections managed through JavaScript tab switching
- **Local Storage**: Used for persisting theme preference and favorites list

### Key Features
- **Live Preview**: Type custom text and see it rendered in each font instantly
- **Font Comparison**: Side-by-side comparison of any two fonts
- **Size/Weight Controls**: Adjustable sliders for font size (12-72px) and weight selection
- **Search & Filter**: Filter fonts by name, category, or style
- **Copy CSS**: One-click copy of font-face CSS declarations
- **Favorites**: Mark and save favorite fonts (persisted in localStorage)

### Backend Architecture
- **Express.js Static Server**: Simple Node.js server using Express 5.x
- **Static File Serving**: Serves all files from the root directory with no caching headers (development mode)
- **CORS Configuration**: Adds `Access-Control-Allow-Origin: *` headers specifically for font files (.woff, .woff2, .otf, .ttf)
- **Port Configuration**: Runs on port 5000, bound to 0.0.0.0 for external access

### File Organization
```
/
├── index.html          # Main application entry point
├── index.css           # Main application styles (includes dark/light themes)
├── app.js              # Font data, rendering logic, and interactivity
├── server.js           # Express static file server
├── fonts/              # Font files organized by family
│   ├── cartographcf/   # CartographCF fonts + demo
│   ├── dankmono/       # Dank Mono fonts
│   ├── parity/         # Parity Sans fonts
│   ├── conc-valk/      # Concourse/Valkyrie collection
│   ├── nerdfont/       # Nerd Font variants with demos
│   └── concourse-index/# Concourse Index fonts
├── css-scripts/        # Additional CSS (Prism syntax highlighting, typography)
└── icons/              # Favicon assets
```

### Font Serving Strategy
- Fonts are served locally with local paths (not external URLs) for better reliability
- CSS files use `@font-face` declarations with `local()` sources first, then local URLs
- OpenType features are configured via `font-feature-settings` and `font-variant-*` properties
- Multiple font weights (100-900) and styles (normal/italic) supported per family

## External Dependencies

### Runtime Dependencies
- **Express.js 5.x**: Web server framework for static file serving

### Third-Party Libraries (CDN)
- **PrismJS**: Syntax highlighting for code demos (loaded from local files in css-scripts/)
- **MathJax**: Mathematical notation rendering (CDN redirect script included)

### No Database
- This is a static assets project with no database requirements
- Font metadata is defined in `app.js` as a JavaScript array
- User preferences (theme, favorites) stored in browser localStorage
