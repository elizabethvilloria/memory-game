import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {/* Card content will go here */}
    </div>
  );
};

export default Card;
