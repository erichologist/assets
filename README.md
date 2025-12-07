# Font Assets Collection

## Project Overview
This is a static font assets repository that contains a collection of various font families including:
- CartographCF (with Nerd Font variants)
- Dank Mono
- Josefin
- Parity Sans
- Concourse/Valkyrie fonts

The project includes demo pages showcasing different font weights, styles, and features.

## Directory Overview
- [fonts/](./fonts/)[^fonts/] Contains all font files organized by font family[^fonts/]
  - [cartographcf/](./cartographcf/)[^cartographcf/] Original CartographCF fonts[^cartographcf/]
  - [dankmono/](./dankmono/)[^dankmono/] Dank Mono monospace fonts[^dankmono/]
  - [josefin/](./josefin/)[^josefin/] Josefin sans-serif fonts[^josefin/]
  - [parity/](./parity/)[^parity/] Parity Sans fonts[^parity/]
  - [conc-valk/](./conc-valk/)[^conc-valk/] Concourse/Valkyrie font collection[^conc-valk/]
  - [nerdfont/](./nerdfont/)[^nerdfont/] Nerd Font variants with demo HTML pages[^nerdfont/]
- [index.html](../index.html)[^index.html] Landing page with navigation to all font demos[^index.html]
- [server.js](../server.js)[^server.js] Express static file server[^server.js]
- [package.json](../package.json)[^package.json] Node.js dependencies[^package.json]

[^fonts/]:`/fonts/`
[^cartographcf/]:`/cartographcf/`
[^dankmono/]:`/dankmono/`
[^josefin/]:`/josefin/`
[^parity/]:`/parity/`
[^conc-valk/]:`/conc-valk/`
[^nerdfont/]:`/nerdfont/`
[^index.html]:`./index.html`
[^server.js]:`./server.js`
[^package.json]:`./package.json`

## Technical Setup
- **Runtime**: Node.js 20
- **Server**: Express.js static file server
- **Port**: 5000 (bound to 0.0.0.0)
- **Deployment**: Configured for autoscale deployment

## Server Configuration
The server serves static files with:
- Cache-Control headers disabled for development
- CORS headers for font files
- All files accessible from root directory

## Recent Changes (December 4, 2025)
- Created index.html landing page for font navigation
- Set up Express server on port 5000
- Configured workflow to run server
- Added deployment configuration for autoscale
- Created .gitignore for Node.js projects

## Development
To run the server locally:
```bash
npm start
```

The server will start on http://0.0.0.0:5000

## Deployment
The project is configured for autoscale deployment running `npm start`.
