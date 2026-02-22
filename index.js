var questionsArr = [
  {
    question: "Who is Mirasol's husband?",
    answer: 'Dakila',
    options: [
      'Marshall',
      'Leonardo DiCaprio',
      'Dakila',
      'Kevin',
    ]},
  {
    question: 'How many people has Devonte fist fought?',
    answer: 'At least 12',
    options: [
      'At least 12',
      '6 or 7',
      'None',
      '21',
    ]},
  {
    question: "What is Dakila's favorite band?",
    answer: 'Nuclear Youth',
    options: [
      'Fall Out Boy',
      'Nuclear Youth',
      'Your Scientific Love Interest',
      'Stab the Fabric',
    ]},
  {
    question: 'How did Alon meet Xiulan?',
    answer: 'They work at the same hospital',
    options: [
      'They were classmates in college',
      'They were part of the same Christian Bible study group',
      'They never met',
      'They work at the same hospital',
    ]},
  {
    question: "What is Calisto?",
    answer: 'A horse',
    options: [
      'A horse',
      'A dad',
      'A dog',
      'A well-loved Ford F150',
    ]},
];

var quizDiv = document.getElementById("quiz");
var currentQuestionIndex = 0;
var score = 0;
var timer;
var timeLeft = 30;

function startScreen() {
    quizDiv.innerHTML = "";

    var previousScore = localStorage.getItem("previous-score");
    if (previousScore !== null) {
        var scoreText = document.createElement("p");
        scoreText.textContent = "Previous Score: " + previousScore + "%";
        quizDiv.appendChild(scoreText);
    }

    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz!";
    startButton.id = "start-quiz";
    startButton.addEventListener("click", startQuiz);
    quizDiv.appendChild(startButton);
}

startScreen();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 30;

    quizDiv.innerHTML = "";

    var questionObj = questionsArr[currentQuestionIndex];

    var questionText = document.createElement("p");
    questionText.textContent = questionObj.question;
    quizDiv.appendChild(questionText);

    var optionsDiv = document.createElement("div");

    questionObj.options.forEach(function(option) {
        var button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", function() {
            if (option === questionObj.answer) {
                score++;
            }
            nextQuestion();
        });

        optionsDiv.appendChild(button);
    });

    quizDiv.appendChild(optionsDiv);

    var timerText = document.createElement("p");
    timerText.textContent = timeLeft;
    quizDiv.appendChild(timerText);

    timer = setInterval(function() {
        timeLeft--;
        timerText.textContent = timeLeft

        if (timeLeft <= 0) {
        nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsArr.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizDiv.innerHTML = "";

    var percentage = Math.round((score / questionsArr.length) * 100);

    localStorage.setItem("previous-score", percentage);

    var scoreText = document.createElement("p");
    scoreText.textContent = "Previous Score: " + percentage + "%";
    quizDiv.appendChild(scoreText);

    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz!";
    startButton.id = "start-quiz";
    startButton.addEventListener("click", startQuiz);

    quizDiv.appendChild(startButton);
}

