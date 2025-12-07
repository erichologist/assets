const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static('.', {
  setHeaders: (res, path) => {
    if (path.endsWith('.woff') || path.endsWith('.woff2') || path.endsWith('.otf') || path.endsWith('.ttf')) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Font assets server running on http://0.0.0.0:${PORT}`);
});
