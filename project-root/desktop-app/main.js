const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

ipcMain.handle('process-video', async (event, filePath) => {
  const { execFile } = require('child_process');
  return new Promise((resolve, reject) => {
    execFile('python', [path.join(__dirname, 'src', 'processor.py'), filePath], (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});