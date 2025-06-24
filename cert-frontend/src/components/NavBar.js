import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav style={{ padding: 20, background: '#ddd' }}>
    <Link to="/" style={{ marginRight: 20 }}>Home</Link>
    <Link to="/issue" style={{ marginRight: 20 }}>Issue</Link>
    <Link to="/verify" style={{ marginRight: 20 }}>Verify</Link>
    <Link to="/revoke" style={{ marginRight: 20 }}>Revoke</Link>
    <Link to="/list" style={{ marginRight: 20 }}>List</Link>
  </nav>
);

export default NavBar;
