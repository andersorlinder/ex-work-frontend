// import './App.css';
// import React, {useState } from 'react';
import { Mortgage } from './components/mortgage';

function App() {
  // const [mortageSubmitted, submitMortgage] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        Flytta annuitetslån
      </header>
      <Mortgage></Mortgage>
    </div>
  );
}

export default App;
