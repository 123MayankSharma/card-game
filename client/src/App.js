import './App.css';
import React, { useEffect, useState } from 'react';
import Card from './components/Card';

  const CARDS_INFO=[
    {emoji:"😺",name:"Cat Card"},
    {emoji:"👍" ,name:"Defuse Card"},
    {emoji:"🔀",name:"Shuffle Card"},
    {emoji:"💣",name:"Exploding Kitten"}
  ]


  

const App = () => {
  const [flipped, setFlipped] = useState(Array(5).fill(true));
  const [deck, setDeck] = useState([CARDS_INFO[1],CARDS_INFO[3],CARDS_INFO[3],CARDS_INFO[3],CARDS_INFO[3]]);
  const [score, setScore] = useState(0);
  const [defusePower, setDefusePower] = useState(false);
  // const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    startGame() 
  }, [])
    

 
  // Creates a new deck of cards 
  const createNewDeck = (count) => {
    const CardDeck = [];
    for (let i = 0; i < count; i++) {
        const randomCardType=Math.floor(Math.random()*(CARDS_INFO.length))
        CardDeck.push(CARDS_INFO[randomCardType])
        
    }
    return CardDeck;
  };

  // Starts a new game
  const startGame = () => {
    setDeck(createNewDeck(5));
    setFlipped(Array(5).fill(true));
    setScore(0);
    setDefusePower(false);
    // setGameOver(false);
  };

  const moveToNextLevel=()=>{
   setScore(score+1)
   setDeck(createNewDeck(5));
   setFlipped(Array(5).fill(true));
   setDefusePower(false);
   // setGameOver(false);

  }
  
  //removes Card from the deck
  const removeCard=(idx)=>{
     const newDeck = [...deck];
    newDeck.splice(idx, 1);
    setDeck(newDeck);
    const newFlippedDeck=[...flipped]
    newFlippedDeck.splice(idx,1)
    setFlipped(newFlippedDeck)

  }

    // Handles a card being clicked
  const handleClick = (idx) => {

    const newFlipped = [...flipped];
    newFlipped[idx] = false;
    setFlipped(newFlipped);
   //timeout has been set so that animation can take place 
    setTimeout(()=>{
    const card = deck[idx];
    switch (card.name) {
      case "Cat Card":
        // Remove the cat card from the deck
        if(deck.length>1){
          alert("Cat Card Will Be removed from The deck!")
          removeCard(idx)
        }else{
          alert("Cat Card Will Be removed from The deck!")
          alert("you have won this Level")
          moveToNextLevel()
        }
        break;
      case "Defuse Card":
        if(deck.length>1){
        alert("You Have Gained Defuse Power")
        setDefusePower(true)
        removeCard(idx)
        }else if(deck.length==1){
         alert("You Have won this Level")
         moveToNextLevel()
        }

        break;
      case "Exploding Kitten":
        if(defusePower && deck.length>1){
          alert("Your Defuse Power Has Stoppped Bomb from Exploding🎉") 
          removeCard(idx)
          setDefusePower(false)
        }
        else if(defusePower && deck.length==1){
          alert("You Have won this Level🎉")
          moveToNextLevel()
        }
        else if(defusePower===false){
          alert("Bomb Exploded!! You Lose 😢... Game will be Restarted...")
          startGame()
        }
        break;
      case "Shuffle Card":
         alert("Current Level will be Restarted")
         setDeck(createNewDeck(5));
         setFlipped(Array(5).fill(true));
         setDefusePower(false);
         break; 
       } 
   },500) 

    }

  

  return (
    <>
    <h1 style={{display:"grid",placeItems:"center"}}>Score:{score}</h1>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",margin:"50px"}}>
      {deck.map((obj,idx)=>{
        return(<div key={idx}>
          <Card emoji={obj.emoji} onClick={handleClick} idx={idx} flipped={flipped[idx]}/>
          </div>)
      })}
    </div>
    </>
  );
};



export default App;
