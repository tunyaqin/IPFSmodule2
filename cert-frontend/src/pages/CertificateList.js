import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get('http://localhost:3000/certificate/list');
        setCertificates(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch certificates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Issued Certificates</h2>

      {loading && <p>Loading certificates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && certificates.length === 0 && <p>No certificates issued yet.</p>}

      {certificates.map((cert) => (
        <div key={cert.certId} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 10 }}>
          <p><strong>Certificate ID:</strong> {cert.certId}</p>
          <p><strong>Recipient:</strong> {cert.recipient}</p>
          <p><strong>IPFS Hash:</strong> {cert.ipfsHash}</p>
          <p><strong>Issued At:</strong> {new Date(parseInt(cert.issuedAt) * 1000).toLocaleString()}</p>
          <p>
            <strong>Status:</strong>{' '}
            {cert.revoked
              ? `Revoked ❌ (Tx: ${cert['revoked Tx Hash'] || 'N/A'})`
              : 'Valid ✅'}
          </p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 View Certificate on IPFS
          </a>
        </div>
      ))}
    </div>
  );
}

export default CertificateList;
