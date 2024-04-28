const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Choose a port

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public', '3d-models')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});