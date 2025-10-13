import { useState } from 'react';

function RevealTab() {
  const [key, setKey] = useState('');

  const handleReveal = () => {
    alert(`Clave ingresada: ${key}`);
    setKey('');
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Ingresa la clave..."
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleReveal}
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Revelar mensaje
      </button>
    </div>
  );
}

export default RevealTab;
