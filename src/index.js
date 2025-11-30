const express = require('express');
const app = express();
const PORT = 3000;

// Read app name from environment variable, default to "Node App"
const APP_NAME = process.env.APP_NAME || 'Default App Name';

app.get('/', (req, res) => {
  res.send(`<h1>App name: ${APP_NAME}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, app name: ${APP_NAME}`);
});
