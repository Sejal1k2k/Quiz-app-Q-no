const counterEl = document.getElementById("question-counter");
const questionSets = [
  [
    {
      q: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: 3
    },
    {
      q: "What does CSS stand for?",
      options: ["Central Style Sheet", "Cascading Style Sheet", "Cascading Simple Sheet", "Control Style Sheet"],
      answer: 1
    },
    {
      q: "What's the ERP component linked to semantic anomaly?",
      options: ["P300", "N400", "FOXP2", "PET"],
      answer: 1
    }
  ],
  [
    {
      q: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1
    },
    {
      q: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: 1
    },
    {
      q: "What does 'null' typeof return in JS?",
      options: ["object", "null", "undefined", "NaN"],
      answer: 0
    }
  ]
];


let currentSetIndex = 0;
let current = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const categoryEl = document.getElementById("category"); 



function loadQuestion() {
  quizEl.innerHTML = "";
  const questions = questionSets[currentSetIndex];
  const { q, options } = questions[current];

  counterEl.textContent = `Question ${current + 1} of ${questions.length}`;

  const qEl = document.createElement("div");
  qEl.className = "question";
  qEl.textContent = `${current + 1}. ${q}`;
  quizEl.appendChild(qEl);

  const opts = document.createElement("div");
  opts.className = "options";

  options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(idx, btn));
    opts.appendChild(btn);
      
  });

  quizEl.appendChild(opts);

}
function selectOption(selected, button) {
  const questions = questionSets[currentSetIndex];
  const correct = questions[current].answer;
  const optionButtons = [...quizEl.querySelectorAll("button")];

  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correct) {
      btn.style.backgroundColor = "#28a745";
    } else if (idx === selected) {
      btn.style.backgroundColor = "#dc3545";
    }
  });

  if (selected === correct) score++;

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questionSets[currentSetIndex].length}`;
}

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  loadQuestion();
});

categoryEl.addEventListener("change", () => {
  currentSetIndex = parseInt(categoryEl.value);
  current = 0;
  score = 0;
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  loadQuestion();
});

loadQuestion();