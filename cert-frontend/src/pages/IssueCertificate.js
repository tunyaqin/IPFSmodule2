import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

function IssueCertificate() {
  const [file, setFile] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleRecipientChange = (e) => setRecipient(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !recipient) {
      return setStatus('Please select a PDF and enter a recipient address.');
    }

    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        const formData = new FormData();
        formData.append('certificate', file);
        formData.append('recipient', recipient);

        const res = await axios.post('http://localhost:3000/certificate/issue', formData);

        setStatus(`✅ Certificate issued!\nCert ID: ${res.data.certId}\nTx Hash: ${res.data.transactionHash}`);
      } else {
        setStatus('Please install MetaMask to continue.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error issuing certificate. See console for details.');
    }
  };

  return (
    <div>
      <h2>Issue Certificate</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Recipient Address" value={recipient} onChange={handleRecipientChange} required />
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit">Issue</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default IssueCertificate;
