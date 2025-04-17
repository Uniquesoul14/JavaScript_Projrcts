const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolkien", "Rowling", "Hemingway"],
    answer: 0
  },
  {
    question: "What is 5 * 6?",
    options: ["11", "30", "35", "25"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: 2
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "80°C", "95°C"],
    answer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    answer: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: 0
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: 2
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: 1
  },
  {
    question: "What year did World War II end?",
    options: ["1945", "1939", "1918", "1965"],
    answer: 0
  }
];

let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let answers = new Array(10).fill(null);

function shuffleQuestions() {
  shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
}

function startTimer() {
  let timeLeft = 60;
  document.getElementById("timer").textContent = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      document.getElementById("nextBtn").click();
    }
  }, 1000);
}

function loadQuestion() {
  const q = shuffledQuestions[currentQuestion];
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h5>Q${currentQuestion + 1}: ${q.question}</h5>
    ${q.options.map((opt, idx) => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="option" id="opt${idx}" value="${idx}" ${answers[currentQuestion] == idx ? 'checked' : ''}>
        <label class="form-check-label" for="opt${idx}">
          ${opt}
        </label>
      </div>
    `).join('')}
  `;
  startTimer();
}

function showResult() {
  clearInterval(timer);
  score = answers.reduce((acc, ans, idx) => acc + (ans == shuffledQuestions[idx].answer ? 1 : 0), 0);
  document.getElementById("quiz-container").innerHTML = "";
  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("result").textContent = `Your score: ${score} / 10`;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[currentQuestion] = parseInt(selected.value);
  }
  if (currentQuestion < 9) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[currentQuestion] = parseInt(selected.value);
  }
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("prevBtn").addEventListener("click", prevQuestion);

shuffleQuestions();
loadQuestion();
