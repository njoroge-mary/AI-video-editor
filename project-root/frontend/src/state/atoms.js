import { atom } from 'recoil';

export const clipsState = atom({
  key: 'clipsState',
  default: []  // { id, start, end, thumbnailUrl }
});

export const userState = atom({
  key: 'userState',
  default: { email: '', id: '' }
});