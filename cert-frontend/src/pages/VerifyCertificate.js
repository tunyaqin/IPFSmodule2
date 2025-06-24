import React, { useState } from 'react';
import axios from 'axios';

function VerifyCertificate() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/certificate/verify/${certId}`);
      setResult(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Certificate not found or error occurred.');
      setResult(null);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h2>Verify Certificate</h2>
      <input
        type="number"
        placeholder="Enter Certificate ID"
        value={certId}
        onChange={(e) => setCertId(e.target.value)}
        style={{ width: '100%', padding: 8 }}
      />
      <button onClick={handleVerify} style={{ marginTop: 10 }}>Verify</button>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <p><strong>IPFS Hash:</strong> {result.ipfsHash}</p>
          <p><strong>Recipient:</strong> {result.recipient}</p>
          <p><strong>Revoked:</strong> {result.revoked ? 'Yes ❌' : 'No ✅'}</p>
          <p><strong>Issued At:</strong> {new Date(result.issuedAt).toLocaleString()}</p>
          <a href={`https://gateway.pinata.cloud/ipfs/${result.ipfsHash}`} target="_blank" rel="noreferrer">
  📄 View Certificate (IPFS)
</a>
        </div>
      )}
    </div>
  );
}

export default VerifyCertificate;
