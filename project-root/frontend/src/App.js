import React from 'react';
import { RecoilRoot } from 'recoil';
import Upload from './components/Upload';
import Timeline from './components/Timeline';
import EffectsPanel from './components/EffectsPanel';
import PreviewModal from './components/PreviewModal';
import PaymentForm from './components/PaymentForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <RecoilRoot>
      <div className="p-4 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold">AI Video Editor</h1>
        </header>
        <Upload />
        <Timeline />
        <EffectsPanel />
        <PreviewModal />
        <PaymentForm />
        <Dashboard />
      </div>
    </RecoilRoot>
  );
}

export default App;