import { useState } from 'react';

const API_URL = 'http://localhost:8000';

function HideTab() {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleHideSecret = async () => {
    if (!secret.trim()) {
      setError('Por favor, introduce un mensaje para ocultar');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/hide/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al ocultar mensaje');
      }

      setResult(data.key);
      setSecret('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Escribe tu mensaje secreto
        </label>
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Escribe tu mensaje secreto aquí..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          rows="6"
          disabled={loading}
        />
      </div>

      <button
        onClick={handleHideSecret}
        disabled={loading || !secret.trim()}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Escondiendo...' : 'Esconder mensaje'}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
          <p className="text-green-800 font-semibold">Mensaje escondido correctamente</p>
          <div className="bg-white border border-green-300 rounded p-3">
            <p className="text-sm text-gray-600 mb-2">Tu clave secreta:</p>
            <code className="block bg-gray-100 px-3 py-2 rounded text-sm break-all">
              {result}
            </code>
          </div>
          <p className="text-xs text-gray-600 text-center">
            La clave solo puede ser usada una vez
          </p>
        </div>
      )}
    </div>
  );
}

export default HideTab;
