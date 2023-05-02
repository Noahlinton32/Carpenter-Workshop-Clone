const express = require('express');
const path = require('path');
const app = express();

const frontendBuildPath = path.join(__dirname, '../carpenterFrontEnd/build');

app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

const PORT = process.env.FRONTEND_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
});