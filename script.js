document.addEventListener("DOMContentLoaded", () => {
    
    //Globals
    let cardsContainer = document.querySelector('#cardsContainer');
    let displayCounter = document.querySelector('#displayCounter');
    let tableSize = 36;
    
    // Cards Table

    let cards = [];

    for (i = 0; i < tableSize; i++) {
        cards.push({num: i + 1, identifier: `${String.fromCharCode(64 + i)}`});
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

    // Creating HTML card element

    const generateBoard = () => {

        let cardsBox = document.createElement('div');

        let gridSize = Math.sqrt(tableSize);
        cardsBox.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
        cardsBox.style.gridTemplateRows = `repeat(${gridSize}, 60px)`;

        let cardRandoms = generateRandoms(tableSize / 2);
        let cardCloneRandoms = generateRandoms(tableSize / 2);
        cardsBox.classList.add('cardsBox');

        for(i = 0; i < tableSize / 2; i++) {

            let card = document.createElement('div');
            card.classList.add('card');
            card.innerText = cards[cardRandoms[i]].identifier;

            let cardClone = card.cloneNode(true);
            cardClone.innerText = cards[cardCloneRandoms[i]].identifier;

            cardsBox.appendChild(card)
            cardsBox.appendChild(cardClone);
        }
        return cardsBox;
    }
    
    // Mechanics 
    
    const Mechanics = () => {

        let comparedCards = [];
        let allMatchedCards = [];
        let movsCounter = 0;
        let matchedCounter = 0;

        const counting = () => {
            movsCounter++;
            displayCounter.innerText = `MOVES: ${movsCounter}`;
            displayCounter.classList.toggle('countAnimation');
            setTimeout(() => {
                displayCounter.classList.toggle('countAnimation');
            }, 250)
        }

        const cardListener = (event) => {

            let currentCard = event.currentTarget;

            // pushing compared cards to array & checking if 2x clicked same card
            if(comparedCards.length < 2 && currentCard != comparedCards[0]) {
                comparedCards.push(currentCard);
                currentCard.classList.toggle('showCard');
            }

            // comparing cards
            if(comparedCards.length === 2) {

                // cards validity
                if (comparedCards[0].innerText === comparedCards[1].innerText) {
                    counting();
                    comparedCards.forEach(card => {
                        card.classList.add('matchedCard');
                        allMatchedCards.push(card);
                        card.removeEventListener('click', cardListener);
                    })
                    matchedCounter += 1;
                    comparedCards = [];
                }

                // cards invalidity
                else {
                    counting();
                    setTimeout(() => {
                        comparedCards.forEach(card => {
                            card.classList.toggle('showCard');
                        })
                        comparedCards = [];
                    }, 1000)
                }

                // waiting for collection completement
                if (matchedCounter === tableSize / 2) {
                    setTimeout(() => {
                        allMatchedCards.forEach(card => {
                            card.classList.add('winCardAnimation');
                            card.innerText = "!";
                            displayCounter.innerText = `YOU WON IN ${movsCounter}`;
                            displayCounter.classList.add('win');
                        });
                    }, 500)
                }
            }
            console.log(matchedCounter);
            console.log(comparedCards);
        }
        
        // addig eventListener to each card
        for (let card of box.children) {
            card.addEventListener('click', cardListener);
        }
    }
        

    // RESTART/PLAY
    
    const playBtn = document.querySelector('#play');
    const restartBtn = document.querySelector('#restart');
    let box;

    const handlePlay = () => {
        generateRandoms(tableSize);
        box = generateBoard();
        cardsContainer.appendChild(box);
        Mechanics();
        playBtn.removeEventListener('click', handlePlay);
        displayCounter.innerText = `MOVES: 0`;

        console.log(box)
    }

    const handleRestart = () => {

        // Removing old board and generating new one
        generateRandoms(tableSize);
        cardsContainer.removeChild(box);
        box = generateBoard();
        cardsContainer.appendChild(box);
        displayCounter.classList.remove('win');
        displayCounter.innerText = `MOVES: 0`;
        
        Mechanics();
    }

    playBtn.addEventListener('click', handlePlay);
    restartBtn.addEventListener('click', handleRestart);

    // LEVEL SET
})
