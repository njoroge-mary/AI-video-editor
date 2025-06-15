import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { clipsState } from '../state/atoms';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [, setClips] = useRecoilState(clipsState);

  const handleUpload = async () => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await axios.post('/upload', form);
    // Poll scene detection
    const { data: job } = await axios.post('/detect-scenes-async', { s3_key: data.s3_key });
    const interval = setInterval(async () => {
      const status = await axios.get(`/task-status/${job.task_id}`);
      if (status.data.state === 'SUCCESS') {
        setClips(status.data.result.map((scene, idx) => ({
          id: `clip-${idx}`,
          start: scene[0],
          end: scene[1],
          thumbnailUrl: ''
        }))); clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="file"
        accept="video/*"
        onChange={e => setFile(e.target.files[0])}
      />
      <button
        disabled={!file}
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Upload & Detect Scenes
      </button>
    </div>
  );
}