import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled, source }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='parte da frente da carta' />
        <img className='back' src={source} onClick={handleClick} alt='parte de trás da carta' />
      </div>
    </div>
  );
}
