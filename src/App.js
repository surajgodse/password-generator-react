import React from 'react';
import './App.css';
import PasswordGenerator from './PasswordGenerator';
import Footer from './Footer';

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <PasswordGenerator />
      </div>
      <Footer />
    </div>
  );
}

export default App;