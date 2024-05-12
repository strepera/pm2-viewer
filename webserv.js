const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

function getUserHomeDirectory() {
  return process.env.HOME || process.env.USERPROFILE || process.env.HOMEPATH;
}

app.get('/logs/:filename', (req, res) => {
  const userHomeDir = getUserHomeDirectory();
  const logFilePath = path.join(userHomeDir, '.pm2/logs', req.params.filename);

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Log server running at http://localhost:${port}`);
});
