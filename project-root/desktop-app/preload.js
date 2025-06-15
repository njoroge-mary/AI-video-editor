const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  processVideo: (filePath) => ipcRenderer.invoke('process-video', filePath)
});