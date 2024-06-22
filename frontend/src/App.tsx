import React from 'react';
import TransactionVisualizer from './components/TransactionVisualizer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blockchain Pulse</h1>
      </header>
      <TransactionVisualizer />
    </div>
  );
}

export default App;
