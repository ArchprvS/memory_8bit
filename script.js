document.addEventListener("DOMContentLoaded", () => {
    
    //Globals
    let cardsContainer = document.querySelector('#cardsContainer');
    let displayCounter = document.querySelector('#displayCounter');
    
    // Cards Table

    let cards = [];

    for (i = 0; i < 26; i++) {
        cards.push({num: i + 1, identifier: `${String.fromCharCode(65 + i)}`});
    }

    // Generating array of random indexes

    const generateRandoms = (size) => {
        
        let randomsArray = [];

        do {
            let random = Math.floor(Math.random() * size) + 1;

            if (!randomsArray.includes(random)) {
                randomsArray.push(random);
            }
        }
        while (randomsArray.length < size);

        return randomsArray;
    }

    generateRandoms(8);

    // Creating HTML card element

    const generateBoard = () => {

        let cardsBox = document.createElement('div');
        let cardRandoms = generateRandoms(8);
        let cardCloneRandoms = generateRandoms(8);
        cardsBox.classList.add('cardsBox');

        for(i = 0; i < 8; i++) {

            let card = document.createElement('div');
            card.classList.add('card');
            card.innerText = cards[cardRandoms[i]].identifier;

            let cardClone = card.cloneNode(true);
            cardClone.innerText = cards[cardCloneRandoms[i]].identifier;

            cardsBox.appendChild(card);
            cardsBox.appendChild(cardClone);
        }
        return cardsBox;
    }
    
    // Mechanics 
    
    const Mechanics = () => {

        let comparedCards = [];

        const cardListener = (event) => {

            let currentCard = event.currentTarget;

            // pushing compared cards to array
            if(comparedCards.length < 2) {
                comparedCards.push(currentCard);
                currentCard.classList.toggle('showCard');
            }
            if(comparedCards.length === 2) {
                if (comparedCards[0].innerText === comparedCards[1].innerText) {
                    comparedCards.forEach(card => {
                        card.removeEventListener('click', cardListener);
                    })
                    comparedCards = [];
                }
                else {
                    setTimeout(() => {
                        comparedCards.forEach(card => {
                            card.classList.toggle('showCard');
                        })
                        comparedCards = [];
                    }, 1000)
                }
            }
            console.log(comparedCards);
        }
        
        for (let card of box.children) {
            card.addEventListener('click', cardListener);
        }
    }
        

    // RESTART/PLAY
    
    const playBtn = document.querySelector('#play');
    const restartBtn = document.querySelector('#restart');
    let box;

    const handlePlay = () => {
        box = generateBoard();
        cardsContainer.appendChild(box);
        Mechanics();
        playBtn.removeEventListener('click', handlePlay);
        displayCounter.innerText = `MOVES: 0`;
    }

    const handleRestart = () => {

        // Removing old board and generating new one
        cardsContainer.removeChild(box);
        box = generateBoard();
        cardsContainer.appendChild(box);
        
        Mechanics();
    }

    playBtn.addEventListener('click', handlePlay);
    restartBtn.addEventListener('click', handleRestart);
})
