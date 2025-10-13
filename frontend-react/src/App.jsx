import { useState } from 'react';
import HideTab from './components/HideTab';
import RevealTab from './components/RevealTab';

function App() {
  const [tab, setTab] = useState('hide');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex mb-4">
          <button
            onClick={() => setTab('hide')}
            className={`flex-1 py-2 font-semibold mr-1 ${tab==='hide'?'bg-blue-500 text-white':'bg-gray-300'}`}
          >
            Esconder
          </button>
          <button
            onClick={() => setTab('reveal')}
            className={`flex-1 py-2 font-semibold ml-1 ${tab==='reveal'?'bg-green-500 text-white':'bg-gray-300'}`}
          >
            Revelar
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          {tab === 'hide' ? <HideTab /> : <RevealTab />}
        </div>
      </div>
    </div>
  );
}

export default App;
