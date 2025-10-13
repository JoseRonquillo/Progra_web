import { useState } from 'react';

function HideTab() {
  const [secret, setSecret] = useState('');

  const handleHide = () => {
    alert(`Mensaje a enviar: ${secret}`);
    setSecret('');
  };

  return (
    <div className="space-y-4">
      <textarea
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Escribe tu mensaje secreto..."
        className="w-full border p-2 rounded"
        rows="4"
      />
      <button
        onClick={handleHide}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Esconder mensaje
      </button>
    </div>
  );
}

export default HideTab;
