const quiz1Data = [
  { question: "Which planet is known as the Red Planet?", answer: "Mars", options: ["Earth", "Mars", "Venus", "Jupiter"] },
  { question: "Which galaxy do we live in?", answer: "Milky Way Galaxy", options: ["Andromeda Galaxy", "Whirlpool Galaxy", "Milky Way Galaxy", "Sombrero Galaxy"] },
  { question: "What is the name of the first man-made satellite?", answer: "Sputnik 1", options: ["Apollo 11", "Sputnik 1", "Hubble Telescope", "Voyager 1"] },
  { question: "Which planet is the largest in our Solar System?", answer: "Jupiter", options: ["Earth", "Saturn", "Jupiter", "Neptune"] }
];

// ====================
// 🧩 Game Functionality
// ====================
let quiz1Index = 0;
let quiz1Score = 0;
let quiz1TotalTime = 60;
let quiz1Countdown;

// ▶️ Start Game
function quiz1StartGame() {
  quiz1Score = 0;
  quiz1Index = 0;
  quiz1TotalTime = 60;

  document.getElementById("quiz1-score").textContent = quiz1Score;
  document.getElementById("quiz1-gameOverScreen").style.display = "none";
  document.getElementById("quiz1-gameArea").style.display = "block";

  quiz1LoadQuestion();
  quiz1StartTimer();
}

// 🧠 Load Question
function quiz1LoadQuestion() {
  const item = quiz1Data[quiz1Index];
  document.getElementById("quiz1-progress").textContent = `${quiz1Index + 1}/${quiz1Data.length}`;
  document.getElementById("quiz1-questionText").textContent = item.question;

  const optionsArea = document.getElementById("quiz1-optionsArea");
  optionsArea.innerHTML = "";

  item.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn1 m-2 btn btn-outline-primary";
    btn.textContent = option;
    btn.onclick = () => quiz1CheckAnswer(option);
    optionsArea.appendChild(btn);
  });

  document.getElementById("quiz1-result").textContent = "";
}

// ⏰ Timer
function quiz1StartTimer() {
  clearInterval(quiz1Countdown);
  quiz1Countdown = setInterval(() => {
    quiz1TotalTime--;
    document.getElementById("quiz1-timer").textContent = quiz1TotalTime;
    if (quiz1TotalTime <= 0) quiz1EndGame();
  }, 1000);
}

// ✅ Check Answer
function quiz1CheckAnswer(selected) {
  const correct = quiz1Data[quiz1Index].answer;
  const result = document.getElementById("quiz1-result");
  const buttons = document.querySelectorAll("#quiz1-optionsArea .option-btn");

  if (selected === correct) {
    quiz1Score++;
    result.textContent = `🎉 Correct! It’s ${correct}!`;
    result.style.color = "#00ff7f";
  } else {
    result.textContent = `❌ Oops! It was ${correct}.`;
    result.style.color = "#ff4c4c";
  }

  document.getElementById("quiz1-score").textContent = quiz1Score;
  buttons.forEach(btn => btn.disabled = true);

  setTimeout(() => {
    quiz1Index++;
    quiz1Index < quiz1Data.length ? quiz1LoadQuestion() : quiz1EndGame();
  }, 1500);
}

// 🏁 End Game
function quiz1EndGame() {
  clearInterval(quiz1Countdown);
  document.getElementById("quiz1-finalScore").textContent = `${quiz1Score} / ${quiz1Data.length}`;
  document.getElementById("quiz1-gameArea").style.display = "none";
  document.getElementById("quiz1-gameOverScreen").style.display = "block";
}

// 🔄 Replay
function quiz1PlayAgain() {
  clearInterval(quiz1Countdown);
  quiz1StartGame();
}

// 🧹 Reset Game
function quiz1ResetGame() {
  clearInterval(quiz1Countdown);
  quiz1Score = 0;
  quiz1Index = 0;
  document.getElementById("quiz1-score").textContent = "0";
  document.getElementById("quiz1-timer").textContent = "60";
  document.getElementById("quiz1-result").textContent = "";
  document.getElementById("quiz1-gameOverScreen").style.display = "none";
  document.getElementById("quiz1-gameArea").style.display = "block";
}

// 🎬 Start when modal opens
document.getElementById("quiz1").addEventListener("shown.bs.modal", quiz1StartGame);