import React from 'react';

const Card = ({ card, handleChoice, flipped, disabled, cardBack }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={card.src}
          alt="card front"
          style={{ display: flipped ? "block" : "none" }}
        />
        <img
          className="back"
          src={cardBack}
          alt="card back"
          onClick={handleClick}
          style={{ display: flipped ? "none" : "block" }}
        />
      </div>
    </div>
  );
};

export default Card;
