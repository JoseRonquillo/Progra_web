import React, { useState } from 'react';
import HideSecret from './components/HideSecret';
import RevealSecret from './components/RevealSecret';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('hide');

  return (
    <div className="App">
      <div className="container">
        <h1>Secret Sharing</h1>
        <p>Comparte secretos de forma segura. Una sola visualización.</p>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'hide' ? 'active' : ''}`}
            onClick={() => setActiveTab('hide')}
          >
            Ocultar Secreto
          </button>
          <button 
            className={`tab ${activeTab === 'reveal' ? 'active' : ''}`}
            onClick={() => setActiveTab('reveal')}
          >
            Revelar Secreto
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'hide' ? <HideSecret /> : <RevealSecret />}
        </div>
      </div>
    </div>
  );
}

export default App;