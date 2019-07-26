/* Create data structure to store the cards in a variable */
let cards = ['favorite', 'pets', 'ring_volume', 'brightness_4', 'laptop_windows', 'brush', 'camera_alt', 'filter_vintage'];
let cardNum = 0, cardFlip = 0, moves = 0, seconds = 0, min = 0, counting = 0, paired = 0, numId = [], cardIDs = [];
/* Set Variables Equal to Elements */
const element = document.querySelector('.deck');
const fragment = document.createDocumentFragment();
const timer = document.querySelector('.timer');
const rating = document.querySelector('.rating');
const popup = document.querySelector('.popup');
const medal = document.querySelector('.medal');

/* Adding Cards to Deck */
function addCards() {
    cards = cards.concat(cards);
    
    /* Shuffle Card Icons to be Random */
    let currentIndex = cards.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    for (let i = 0; i < 16; i++){
        /* Creates Cards */
        const newElement = document.createElement('div');
        newElement.className = 'card';
        newElement.id = cards[0];
        /* Create divs and Adds Icons */
        newElement.innerHTML = `<div class='card_face front' id=${cardNum}></div><div class='card_face back'><i class='icons md-light'>${cards[0]}</i></div>`;
        cardNum++;
        cards.shift();
        fragment.appendChild(newElement);
    }   
    
    /* Add Stars Rating */
    for (let i = 0; i < 3; i++){
        let v = rating.innerHTML;
        const s = `<div class='stars'><i class='icons md-light'>star</i></div>`;
        rating.innerHTML = v + s;
    }
    
    element.appendChild(fragment);
}

/* Timer */
function startTimer() {
    counting = setInterval(function() {
        /* Add a 0 into Timer if Less Than 10 Seconds */
        if (seconds < 10) {
            timer.innerHTML = `Timer: ${min}:0${seconds}`;
        }
        else {
            timer.innerHTML = `Timer: ${min}:${seconds}`;
        }
        /* Increase Seconds */
        seconds++;

        /* Increase Minutes if 60 Seconds */
        if (seconds == 60) {
            min++;
            seconds = 0;
        }
        /* Wait 1 Second Before Repeating */
    }, 1000);
}

/* Stars Rating*/
function starRating(){

    /* Decrease to 1 Stars after 28 moves */
    if(moves > 28) {
        rating.innerHTML = `<div class='stars'><i class='icons md-light'>star</i></div>`;
    }
    
    /* Decrease to 2 Stars after 14 moves */
    else if(moves > 14) {
        rating.innerHTML = '';
        for (let i = 0; i < 2; i++){
            let v = rating.innerHTML;
            rating.innerHTML = v + `<div class='stars'><i class='icons md-light'>star</i></div>`;
        }
    }
}

/* Flipped Cards */
function flipped(e) {
    /* Add Card IDs to Array */
    numId.push(e.target.id);
    cardIDs.push(e.target.parentElement.id);
    /* Flip Card */
    e.target.parentElement.classList.toggle('is-flipped');
    cardFlip++;
    /* Add to Move Counter */
    moves++;

    /* Start Timer if First Move*/
    if(moves == 1){
        startTimer();
    }

    /* Check How Many Cards are Flipped */
    if (cardFlip === 2){
        /* Check if Match */
        setTimeout(matched, 1500);
    }
    
    /* Update Move Counter */
    document.querySelector('.info').innerHTML = `Moves: ${Math.floor(moves/2)}`;
}

/* Check if Match or Not */
function matched(){

    /* Get Cards from numId Array */
    let i = document.getElementById(numId[0]);
    let x = document.getElementById(numId[1]);

    /* If Flipped Cards Match */
    if(cardIDs[0] === cardIDs[1]){
        /* Change First Card to Matched */
        i.parentElement.classList.add('matched');
        i.parentElement.children[1].style.backgroundColor = `#46B1C9`;
        i.parentElement.children[1].style.boxShadow = `inset 3px 3px 6px black`;
        /* Change Second Card to Matched */
        x.parentElement.classList.add('matched');
        x.parentElement.children[1].style.backgroundColor = `#46B1C9`;
        x.parentElement.children[1].style.boxShadow = `inset 3px 3px 6px black`;
        /* Add to Paired Count */
        paired++;
        /* Check if Won */
        setTimeout(won, 500);
    }

    /* If Not */
    else {
        i.parentElement.classList.toggle('is-flipped');
        x.parentElement.classList.toggle('is-flipped');
        starRating();
    }

    /* Reset Variables to Check */
    cardFlip = 0;
    cardIDs = [];
    numId = [];
}

/* Reset Game */
function restart () {

    /* Check if Won or Not */
    if (paired == 8){
        /* Reset Winner Screen if Won */
        medal.classList.toggle('show');
        popup.classList.toggle('pop');
        medal.innerHTML = '';
    }

    /* Remove Current Cards and Stars */
    document.querySelector('.deck').innerHTML = '';
    rating.innerHTML = '';
    /* Reset Variables */
    cards = ['favorite', 'pets', 'ring_volume', 'brightness_4', 'laptop_windows', 'brush', 'camera_alt', 'filter_vintage'];
    cardNum = 0, cardFlip = 0, moves = 0, seconds = 0, min = 0, paired = 0, numId = [], cardIDs = [];
    /* Add New Shuffled Cards and reset Stars Rating */
    addCards();
    /* Reset Moves */
    document.querySelector('.info').innerHTML = `Moves: ${moves}`;
    /* Reset Timer */
    clearInterval(counting);
    timer.innerHTML = `Timer: 0:00`;
}

/* Won the Game */
function won(){
    
    /* Check How Many Paired */
    if (paired == 8){
        /* Stop Timer */
        clearInterval(counting);
        /* Get Stars Rating */
        const x = rating.childElementCount;
        let v = '';
        for (let i = 0; i < x; i++){
            const s = `<div class='stars'><i class='icons md-72 md-stars'>star</i></div>`;
            v = v + s;
        }
        /* Make Winning Screen Appear */
        medal.classList.toggle('show');
        popup.classList.toggle('pop');
        medal.innerHTML = `<div class='winner'><div class='starRating' id='starRate'>${v}</div><h1>You Won!</h1>
            <div class='finalMoves'>Total Moves: ${Math.floor(moves/2)}</div><div class='totalTime'></div>
            <div class='button'><button class='b' id='button'>Restart</button></div></div>`;
        
        /* Adjust Middle Star */
        if (x == 3){
            const b = document.getElementById('starRate');
            b.children[1].innerHTML = `<i class='icons md-96 md-stars'>star</i>`;
        }
        /* Fix Timer UI */
        const finalTimer = document.querySelector('.totalTime');
        if (seconds < 10) {
            timer.innerHTML = `Timer: ${min}:0${seconds}`;
            finalTimer.innerHTML = `Total Time: ${min}:0${seconds}`;
        }
        else {
            timer.innerHTML = `Timer: ${min}:${seconds}`;
            finalTimer.innerHTML = `Total Time: ${min}:${seconds}`;
        }
    }
}