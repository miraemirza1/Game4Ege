const pictures = [
  { name: "one", img: "photo1.jpg" },
  { name: "two", img: "photo2.jpg" },
  { name: "three", img: "photo3.jpg" },
  { name: "four", img: "photo4.jpg" }
];

let cards = [...pictures, ...pictures];

cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("gameBoard");
const popup = document.getElementById("popup");
const triesText = document.getElementById("tries");
const cuteText = document.getElementById("cuteText");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;
let tries = 0;

const cuteMessages = [
  "Aww good choice 🤍",
  "You’re getting closer :)",
  "Okayyy memory king 😌",
  "That was cute hehe",
  "Almost there, don’t give up 🤍",
  "I believe in you :)",
  "Hmm, I wonder what’s waiting at the end...",
  "This is lowkey adorable"
];

cards.forEach((picture) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = picture.name;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <span>♡</span>
      </div>

      <div class="card-back">
        <img src="${picture.img}" alt="cute picture">
      </div>
    </div>
  `;

  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  this.classList.add("flipped");
  showCuteMessage();

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  tries++;
  triesText.textContent = `Tries: ${tries}`;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedCards += 2;

    cuteText.textContent = "A match! That was adorable 🤍";

    resetTurn();

    if (matchedCards === cards.length) {
      setTimeout(showWinningPopup, 900);
    }
  } else {
    lockBoard = true;

    cuteText.textContent = "Not this one hehe, try again :)";

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 950);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function showCuteMessage() {
  const randomIndex = Math.floor(Math.random() * cuteMessages.length);
  cuteText.textContent = cuteMessages[randomIndex];
}

function showWinningPopup() {
  popup.style.display = "flex";
  cuteText.textContent = "You unlocked the message 🤍";
  createHeartConfetti();
}

function closePopup() {
  popup.style.display = "none";
}

function createHeartConfetti() {
  for (let i = 0; i < 45; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const hearts = ["♡", "🤍", "💕", "✨"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 18 + 16 + "px";
    heart.style.opacity = Math.random() * 0.7 + 0.3;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}
