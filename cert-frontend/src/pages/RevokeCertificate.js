import React, { useState } from 'react';
import axios from 'axios';

function RevokeCertificate() {
  const [certId, setCertId] = useState('');
  const [message, setMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleRevoke = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/certificate/revoke`, {
        certId: certId
      });

      setMessage(`✅ ${res.data.message}`);
      setTxHash(`Tx Hash: ${res.data['revoked Tx Hash']}`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to revoke certificate.');
      setTxHash('');
    }
  };

  return (
    <div>
      <h2>Revoke Certificate</h2>
      <input
        type="number"
        placeholder="Certificate ID"
        value={certId}
        onChange={(e) => setCertId(e.target.value)}
      />
      <button onClick={handleRevoke}>Revoke</button>
      <p>{message}</p>
      {txHash && <p>{txHash}</p>}
    </div>
  );
}

export default RevokeCertificate;
