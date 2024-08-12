import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Score from './components/Score';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTime(0);
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  // Timer effect
  useEffect(() => {
    let timerId;
    if (gameStarted) {
      timerId = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    } else if (!gameStarted && time !== 0) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [gameStarted]);

  return (
    <div className="App">
      <Header />
      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div className="container">
          <Score score={score} />
          <GameBoard setScore={setScore} onGameOver={handleGameOver} />
          <h2>Time: {time} seconds</h2>
        </div>
      )}
    </div>
  );
}

export default App;
