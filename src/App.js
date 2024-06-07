import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from "./components/SingleCard";
import Swal from 'sweetalert2'

const cardImages = [
  { "src": "/img/arya.png", matched: false },
  { "src": "/img/ned.png", matched: false },
  { "src": "/img/JonSnow.png", matched: false },
  { "src": "/img/Robb.png", matched: false },
  { "src": "/img/Sansa.png", matched: false },
  { "src": "/img/Bran.png", matched: false },
];

const cardImages2 = [
  { "src": "/img/aegon.png", matched: false },
  { "src": "/img/aemond.png", matched: false },
  { "src": "/img/daenerys.png", matched: false },
  { "src": "/img/Daemon.png", matched: false },
  { "src": "/img/rhaenyra.png", matched: false },
  { "src": "/img/rhaegar.png", matched: false },
];
const cardImages3 = [
  { "src": "/img/cersei.png", matched: false },
  { "src": "/img/jaime.png", matched: false },
  { "src": "/img/tyrion.png", matched: false },
  { "src": "/img/tommen.png", matched: false },
  { "src": "/img/joffrey.png", matched: false },
  { "src": "/img/twin.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [source, setSource] = useState("");
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards1 = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setSource("/img/starkSigil.png");
    setCards(shuffledCards);
    setTurns(0);
  };

  const shuffleCards2 = () => {
    const shuffledCards = [...cardImages2, ...cardImages2]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setSource("/img/targaryenSigil.png");
    setCards(shuffledCards);
    setTurns(0);
  };
  const shuffleCards3 = () => {
    const shuffledCards = [...cardImages3, ...cardImages3]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setSource("/img/lannisterSigil.png");
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return ({ ...card, matched: true });
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      Swal.fire({
        title: "Você venceu!",
        text: "Para jogar novamente, feche esse aviso e escolha a casa novamente!",
        imageUrl: "/img/winGame.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className='App'>
      <div className='header'>
        <h1>Westeros</h1>
        <h2>Jogo da memoria</h2>
      </div>
      
      <div className='refreshButtons'>
        <h3>Escolha sua casa:</h3>
        <button className='stark' onClick={shuffleCards1}></button>
        <button className='targaryen' onClick={shuffleCards2}></button>
        <button className='lannister' onClick={shuffleCards3}></button>
      </div>

      <div className='startGame'>
        <div className='card-grid'>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              source={source}
            />
          ))}
        </div>
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
