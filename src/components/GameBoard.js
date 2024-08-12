import React, { useState, useEffect } from 'react';
import Card from './Card';

const cardImages = [
  { src: '/img/image1.png', matched: false },
  { src: '/img/image2.png', matched: false },
  { src: '/img/image3.png', matched: false },
  { src: '/img/image4.png', matched: false },
  { src: '/img/image5.png', matched: false },
  { src: '/img/image6.png', matched: false },
];

const GameBoard = ({ setScore }) => {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Shuffle cards and duplicate them for pairs
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setScore(0);
    setTimer(0);
    setGameOver(false);
  };

  // Handle a card being clicked
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
        setScore((prevScore) => prevScore + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Reset choices and enable card clicking again
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  // Start a new game when the component mounts
  useEffect(() => {
    shuffleCards();
  }, []);

  // Timer effect
  useEffect(() => {
    let timerId;
    if (!gameOver) {
      timerId = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [gameOver]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  return (
    <div className="game-board">
      <h2>Time: {timer} seconds</h2>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === firstChoice || card === secondChoice || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;
