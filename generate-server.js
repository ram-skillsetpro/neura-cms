const fs = require('fs');
const path = require('path');

const serverScript = `
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Route for handling requests
app.get("/!*", (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`;

const outputPath = path.join(__dirname, 'server.js');

fs.writeFileSync(outputPath, serverScript);

console.log(`Server.js file generated at ${outputPath}`);