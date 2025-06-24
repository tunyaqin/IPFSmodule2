import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IssueCertificate from './pages/IssueCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import RevokeCertificate from './pages/RevokeCertificate';
import CertificateList from './pages/CertificateList';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 15 }}>Issue</Link>
          <Link to="/verify" style={{ marginRight: 15 }}>Verify</Link>
          <Link to="/revoke" style={{ marginRight: 15 }}>Revoke</Link>
          <Link to="/list" style={{ marginRight: 15 }}>Certificate Lists</Link>
        </nav>
        <Routes>
          <Route path="/" element={<IssueCertificate />} />
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/revoke" element={<RevokeCertificate />} />
          <Route path="/list" element={<CertificateList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
