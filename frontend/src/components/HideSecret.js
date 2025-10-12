import React, { useState } from 'react';
import axios from 'axios';

const HideSecret = () => {
  const [secret, setSecret] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!secret.trim()) {
      setError('Por favor ingresa un secreto');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/secrets/', {
        secret: secret.trim()
      });

      setGeneratedKey(response.data.key);
      setSecret('');
    } catch (err) {
      setError('Error al crear el secreto. Intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey);
    alert('Key copiada al portapapeles!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="secret">Ingresa tu secreto:</label>
          <textarea
            id="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Escribe aquí el texto que quieres ocultar..."
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creando Secreto...' : 'Ocultar Secreto'}
        </button>
      </form>

      {error && <div className="result error">{error}</div>}

      {generatedKey && (
        <div className="result success">
          <p> Secreto creado exitosamente!</p>
          <p>Comparte esta key con quien quieras revelar el secreto:</p>
          <div className="key-display">{generatedKey}</div>
          <button onClick={copyToClipboard} className="copy-btn">
            Copiar Key
          </button>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
             El secreto solo se puede ver una vez y expirará en 24 horas.
          </p>
        </div>
      )}
    </div>
  );
};

export default HideSecret;