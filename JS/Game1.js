// 🪐 Quiz Data
const quizzes = [
  {
    image: "/src/images/Earth.png",
    answer: "Earth",
    options: ["Mars", "Earth", "Venus", "Jupiter"]
  },
  {
    image: "/src/images/Milky way.jpg",
    answer: "Milky Way Galaxy",
    options: ["Jupiter", "Sombrero Galaxy", "Saturn", "Milky Way Galaxy"]
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    answer: "Mars",
    options: ["Mercury", "Mars", "Neptune", "Jupiter"]
  },
];

// ====================
// 🧩 Game Functionality
// ====================

let currentIndex = 0;
let score = 0;
let totalTime = 60;
let countdown;

// ▶️ Start Game
function startGame() {
  score = 0;
  currentIndex = 0;
  totalTime = 60;

  document.getElementById("score").textContent = score;
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("gameArea").style.display = "block";

  loadQuestion();
  startTimer();
}

// 🖼️ Load Question
function loadQuestion() {
  const item = quizzes[currentIndex];
  document.getElementById("progress").textContent = `${currentIndex + 1}/${quizzes.length}`;
  document.getElementById("gameImage").src = item.image;

  const optionsArea = document.getElementById("optionsArea");
  optionsArea.innerHTML = "";

  item.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn m-2";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsArea.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
}

// ⏰ Start Timer
function startTimer() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    totalTime--;
    document.getElementById("timer").textContent = totalTime;
    if (totalTime <= 0) endGame();
  }, 1000);
}

// ✅ Check Answer
function checkAnswer(selected) {
  const correct = quizzes[currentIndex].answer;
  const result = document.getElementById("result");
  const buttons = document.querySelectorAll(".option-btn");

  if (selected === correct) {
    score++;
    result.textContent = `🎉 Correct! It’s ${correct}!`;
    result.style.color = "#00ff7f";
  } else {
    result.textContent = `❌ Oops! It was ${correct}.`;
    result.style.color = "#ff4c4c";
  }

  document.getElementById("score").textContent = score;
  buttons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    currentIndex++;
    currentIndex < quizzes.length ? loadQuestion() : endGame();
  }, 1500);
}

// 🏁 End Game
function endGame() {
  clearInterval(countdown);
  document.getElementById("finalScore").textContent = `${score} / ${quizzes.length}`;
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "block";
}

// 🔄 Replay
function playAgain() {
  clearInterval(countdown);
  startGame();
}

// 🎬 Start when modal opens
document.getElementById("guessImageModal").addEventListener("shown.bs.modal", startGame);

