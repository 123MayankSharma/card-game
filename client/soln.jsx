const CARDS_INFO = [
  {emoji:"😺",name:"Cat Card"}, 
  {emoji:"👍" ,name:"Defuse Card"},  
  {emoji:"🔀",name:"Shuffle Card"},  
  {emoji:"💣",name:"Exploding Kitten"}
];

const App = () => {
  const [flipped, setFlipped] = useState(Array(5).fill(true));
  const [deck, setDeck] = useState([]);
  const [score, setScore] = useState(0);
  const [defusePower, setDefusePower] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Shuffles an array in place
  const shuffleCards = (cardDeck) => {
    for (let i = cardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardDeck[i], cardDeck[j]] = [cardDeck[j], cardDeck[i]];
    }
  };

  // Creates a new deck of cards 
  const createNewDeck = (count) => {
    const CardDeck = [];
    for (let i = 0; i < count; i++) {
        const randomCardType=Math.floor(Math.random()*(count+1))
        CardDeck.push(CARDS_INFO[randomCardType])
        
    }
    shuffleCards(newDeck);
    return newDeck;
  };

  // Starts a new game
  const startGame = () => {
    setDeck(createNewDeck(5));
    setFlipped(Array(5).fill(true));
    setScore(0);
    setDefused(false);
    setGameOver(false);
  };

  // Handles a card being clicked
  const handleClick = (idx) => {
    // if (gameOver) {
    //   alert("Game Over!! The Game Will be Restarted in 5 Seconds...")
    //   startGame()
    //   return;
    // }

    const newFlipped = [...flipped];
    newFlipped[idx] = false;
    setFlipped(newFlipped);

    const card = deck[idx];
    switch (card.name) {
      case "Cat Card":
        // Remove the cat card from the deck
        alert("Cat Card Will Be removed from The deck!")
        const newDeck = [...deck];
        newDeck.splice(idx, 1);
        setDeck(newDeck);
        break;
      case "Defuse Card":
        alert("You Have Gained Defuse Power")
        setDefusePower(true)
        const tmpDeck = [...deck];
        tmpDeck.splice(idx, 1);
        setDeck(tmpDeck);
        break;
      case "Exploding Kitten Bomb":
        if(defusePower){
          alert("Your Defuse Power Has Stoppped Bomb from Exploding🎉")
          setDefusePower(false)
        }else{
          alert("Bomb Exploded!! You Lose 😢... Game will be Restarted...")
          startGame()
        }
        break;
      case "Shuffle Card":
         setDeck(createNewDeck(5));
         setFlipped(Array(5).fill(true));
         setDefused(false);
         setGameOver(false);
         break; 
       } 

    }

} 
