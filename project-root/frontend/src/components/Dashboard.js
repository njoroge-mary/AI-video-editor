import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const { data } = await axios.get('/user/videos');
      setHistory(data.videos);
    }
    fetchHistory();
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Upload History</h2>
      <ul>
        {history.map(video => (
          <li key={video.id} className="flex items-center space-x-2">
            <img src={video.thumbnailUrl} alt="thumb" className="w-16 h-9 object-cover" />
            <span>{video.filename}</span>
            <span className="text-sm text-gray-500">{video.uploadedAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}