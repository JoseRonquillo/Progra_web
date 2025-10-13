import { useState } from 'react';

function App() {
  const [tab, setTab] = useState('hide');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex mb-4">
          <button
            onClick={() => setTab('hide')}
            className="flex-1 py-2 bg-blue-500 text-white font-semibold mr-1"
          >
            Esconder
          </button>
          <button
            onClick={() => setTab('reveal')}
            className="flex-1 py-2 bg-gray-300 font-semibold ml-1"
          >
            Revelar
          </button>
        </div>

        <div className="p-4 bg-white rounded shadow">
          {tab === 'hide' ? <p>HideTab placeholder</p> : <p>RevealTab placeholder</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
