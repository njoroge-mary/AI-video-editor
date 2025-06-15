const fs = require('fs');
const path = require('path');

function getFileExtension(filePath) {
  return path.extname(filePath);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

module.exports = { getFileExtension, ensureDir };