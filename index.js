const allCards = document.querySelectorAll('.card');
const button = document.querySelector('button');

let firstCard;
let secondCard;

let flippedCardNumb = 0;
let openCards = 0;

const flipCard = (e) => {
  const target = e.target.parentNode;
  if(target.classList.contains('flip')) {
    return;
  }
  target.classList.add('flip');
  flippedCardNumb++;

  if (flippedCardNumb === 1) {
    closePreviousCards();
    firstCard = target;
  } else if (flippedCardNumb === 2) {
    secondCard = target;
    check();
    flippedCardNumb = 0;
  }
};

const closePreviousCards = () => {
  if (firstCard !== undefined &&
    secondCard !== undefined &&
    firstCard.dataset.emoticon !== secondCard.dataset.emoticon) {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
  }

}

const shuffle = () => {
  for (let i = 0; i < allCards.length; i++) {
    let j = Math.round(Math.random() * i);
    let iEmoticon = allCards[i].dataset.emoticon;
    let jEmoticon = allCards[j].dataset.emoticon;

    changeImg(allCards[i], jEmoticon);
    changeImg(allCards[j], iEmoticon);
  }
}

const changeImg = (card, newEmoticon) => {
  card.dataset.emoticon = newEmoticon;
  card.children[0].className = 'front-card ' + newEmoticon;
}

shuffle();

const check = () => {
  if (firstCard.dataset.emoticon === secondCard.dataset.emoticon) {
    openCards = openCards + 2;
    if (openCards === allCards.length) {
      button.style.visibility = 'visible';
    }
  } else {
    console.log('нет');
  }
}

const reset = (q) => {
  //window.location.reload();
  firstCard = undefined;
  secondCard = undefined;
  flippedCardNumb = 0;
  openCards = 0;

  allCards.forEach(a => {
    a.classList.remove('flip');
  });

  shuffle();

  button.style.visibility = 'hidden';
}

allCards.forEach(car => {
  car.addEventListener('click', flipCard);
});

button.addEventListener('click', reset);


