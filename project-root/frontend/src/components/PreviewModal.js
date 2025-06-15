import React from 'react';
import { Dialog } from '@headlessui/react';

export default function PreviewModal({ isOpen, onClose, videoUrl }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white p-4 rounded">
        <video src={videoUrl} controls className="w-full h-auto" />
        <button onClick={onClose} className="mt-2 px-2 py-1 bg-red-500 text-white rounded">Close</button>
      </div>
    </Dialog>
  );
}