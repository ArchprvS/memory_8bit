document.addEventListener("DOMContentLoaded", () => {
    
    //Globals
    let cardsContainer = document.querySelector('#cardsContainer');
    let displayCounter = document.querySelector('#displayCounter');
    let movsCounter = 0;
    let compareCards = [];
    let disabledCards = [];
    
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
    
    const addMechanics = () => {
    
        let card = document.getElementsByClassName('card');

        // Card mechanics
        // JPRDL Działa ale trzeba dodać kolejne iteracje

        const listenerFunction = (element) => {
            
                compareCards.push(element);

                if (compareCards.length <= 2 && disabledCards.includes(element) == false) {
                    element.classList.toggle('showCard');
                }
                if (compareCards.length == 2 && compareCards[0].innerText == compareCards[1].innerText) {

                    // Counting moves
                    movsCounter++;
                    displayCounter.innerText = `MOVES: ${movsCounter}`;

                    // Disabling cards
                    disabledCards.push(...compareCards);
                    console.log(disabledCards);

                    // Clearing array
                    compareCards = [];

                }
                else if (compareCards.length == 2 && compareCards[0].innerText != compareCards[1].innerText) {
                    setTimeout(() => {

                        // Counting moves
                        movsCounter++;
                        displayCounter.innerText = `MOVES: ${movsCounter}`;

                        // Hiding cards
                        compareCards[0].classList.toggle('showCard');
                        compareCards[1].classList.toggle('showCard');

                        // Clearing array
                        compareCards = [];

                    }, 1000);
                }
        }

        // Adding event listener to each card
        // Metoda bind --> doczytać
        
        Array.from(card).forEach(element => {
            element.addEventListener('click', listenerFunction.bind(null, element));
        })
    }

    // RESTART/PLAY
    
    const playBtn = document.querySelector('#play');
    const restartBtn = document.querySelector('#restart');
    let box;
    
    const handlePlay = () => {
        box = generateBoard();
        cardsContainer.appendChild(box);
        playBtn.removeEventListener('click', handlePlay);
        addMechanics();
        displayCounter.innerText = `MOVES: 0`;
    }

    const handleRestart = () => {

        // Removing old board and generating new one
        cardsContainer.removeChild(box);
        box = generateBoard();
        cardsContainer.appendChild(box);

        // Calling mechanics
        addMechanics();

        // Resetting values and arrays
        movsCounter = 0;
        displayCounter.innerText = `MOVES: ${movsCounter}`;
        disabledCards = [];
        compareCards = [];
    }

    playBtn.addEventListener('click', handlePlay);
    restartBtn.addEventListener('click', handleRestart);
})
