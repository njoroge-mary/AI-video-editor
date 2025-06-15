import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { clipsState } from '../state/atoms';

export default function EffectsPanel() {
  const clips = useRecoilValue(clipsState);
  const [params, setParams] = useState({ brightness:0, contrast:1, saturation:1, filters: [] });

  const apply = async () => {
    const response = await axios.post('/apply-effects-async', {
      s3_key: clips[0]?.id, // for demo, apply to first clip
      params
    });
    console.log('Effect Task ID:', response.data.task_id);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Effects Panel</h2>
      <label>
        Brightness
        <input
          type="range"
          min={-1} max={1} step={0.1}
          value={params.brightness}
          onChange={e => setParams({...params, brightness: parseFloat(e.target.value)})}
        />
      </label>
      {/* Similarly for contrast, saturation */}
      <button onClick={apply} className="px-3 py-1 bg-green-600 text-white rounded">
        Apply Effects
      </button>
    </div>
  );
}