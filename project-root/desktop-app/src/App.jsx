import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [filePath, setFilePath] = useState('');
  const [output, setOutput] = useState('');

  const handleSelect = () => {
    const { dialog } = window.require('electron').remote;
    dialog.showOpenDialog({ properties: ['openFile'] })
      .then(({ filePaths }) => setFilePath(filePaths[0]));
  };

  const process = async () => {
    const result = await window.api.processVideo(filePath);
    setOutput(result);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Desktop Video Processor</h1>
      <button onClick={handleSelect} className="p-2 bg-blue-500 text-white rounded">Select Video</button>
      <span className="mx-2">{filePath}</span>
      <button onClick={process} className="p-2 bg-green-500 text-white rounded">Process</button>
      <pre className="mt-4 bg-gray-100 p-2">{output}</pre>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);