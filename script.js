var secondsLeft = 60;
var timerInterval;
var questionsAndAnswersEl = document.getElementById("questionsAndAnswers");
var questionCounter = 0;
var timeEl = document.querySelector(".time");

questionsAndAnswersEl.setAttribute("style", "font-family:sans-serif; text-align:center; display:flex; flex-direction:column");


// i click the start button
// that starts the countdown timer and the button goes away
// the first question is displayed
// the question has a list of possible answers
// i choose an answer and then a new question is displayed

// access start button from HTML
var startButton = document.querySelector("button");
// add event listener to button
// when we click start button, timer function runs. start button disappears. prompt displays
startButton.addEventListener("click", function () {
    timer();
    startButton.style.display = "none";
    prompt();
})

// create timer function
function timer() {

    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remain";
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

var questionsAndAnswers = [
    {
        question: "Inside which HTML element do we put JavaScript?",
        answers: ["<body>", "<script>", "<javascript>", "<head>"],
        correct: "<script>"
    }, {
        question: "Which function asks the user for an input?",
        answers: ["prompt()", "alert()", "confirm()", "input()"],
        correct: "prompt()"
    }, {
        question: "How do you add a comment in JavaScript?",
        answers: ["<!--comment-->", "((comment))", "/*comment*/", "// comment"],
        correct: "// comment"
    }, {
        question: "Which operator is used to assign value to a variable?",
        answers: ["$", "===", "=", "=="],
        correct: "="
    }, {
        question: "What will the following code log to the console: 5 + 3 < 7?",
        answers: ["False", "True", "8", "undefined"],
        correct: "False"
    }
]

function prompt() {
    questionsAndAnswersEl.innerHTML = "";
    var currentQuestion = questionsAndAnswers[questionCounter];
    var questionEl = document.createElement("h3");
    questionEl.textContent = currentQuestion.question;
    questionsAndAnswersEl.append(questionEl);
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var answer = document.createElement("button");
        answer.textContent = currentQuestion.answers[i];
        questionsAndAnswersEl.append(answer);
    }
}

function answerClick(event) {
    var currentAnswer = questionsAndAnswers[questionCounter].correct;
    if (event.target.textContent === currentAnswer) {
        console.log("correct")
    } else {
        secondsLeft = secondsLeft - 10;
    }
    if (questionCounter === questionsAndAnswers.length - 1) {
        timeEl.textContent = secondsLeft + " seconds remain";
        endGame();
    } else {
        questionCounter++;
        prompt();
    }
}

questionsAndAnswersEl.addEventListener("click", answerClick)

function endGame() {
    clearInterval(timerInterval);
    questionsAndAnswersEl.innerHTML = "";
}






