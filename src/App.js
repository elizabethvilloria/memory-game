import React, { useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Score from './components/Score';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <Header />
      <Score score={score} />
      <GameBoard setScore={setScore} />
    </div>
  );
}

export default App;
