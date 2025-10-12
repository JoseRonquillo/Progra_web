import React, { useState } from 'react';
import axios from 'axios';

const RevealSecret = () => {
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!key.trim()) {
      setError('Por favor ingresa una key');
      return;
    }

    setLoading(true);
    setError('');
    setSecret('');

    try {
      const response = await axios.get(`http://localhost:8000/api/secrets/${key.trim()}/`);
      setSecret(response.data.secret);
      setKey('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Secreto no encontrado. Puede que ya haya sido visto o haya expirado.');
      } else {
        setError('Error al recuperar el secreto. Intenta nuevamente.');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="key">Ingresa la key del secreto:</label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Pega aquí la key que recibiste..."
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Buscando Secreto...' : 'Revelar Secreto'}
        </button>
      </form>

      {error && <div className="result error">{error}</div>}

      {secret && (
        <div className="result success">
          <p> Secreto revelado:</p>
          <div className="key-display" style={{ background: '#d4edda' }}>
            {secret}
          </div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#155724' }}>
             Este secreto ha sido destruido y no podrá ser accedido nuevamente.
          </p>
        </div>
      )}

      {loading && <div className="loading">Buscando y eliminando secreto...</div>}
    </div>
  );
};

export default RevealSecret;