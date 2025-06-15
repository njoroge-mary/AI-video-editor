import { selector } from 'recoil';
import { clipsState } from './atoms';

export const timelineDurationState = selector({
  key: 'timelineDurationState',
  get: ({ get }) => {
    const clips = get(clipsState);
    if (!clips.length) return 0;
    return Math.max(...clips.map(c => c.end));
  }
});