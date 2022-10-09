var secondsLeft = 60;
var timerInterval;
var questionsAndAnswersEl = document.getElementById("questionsAndAnswers");
var questionCounter = 0;
var timeEl = document.querySelector(".time");
var scoreCounter = 0;
var scoreEl = document.getElementById("score");

questionsAndAnswersEl.setAttribute("style", "font-family:sans-serif; text-align:center; display:flex; flex-direction:column");

// when we click start button, timer function runs. start button disappears. prompt displays
var startButton = document.querySelector("button");
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
    //subtract 10 seconds for a wrong answer, do nothing for a right answer
    var correctAnswer = questionsAndAnswers[questionCounter].correct;
    if (event.target.textContent === correctAnswer) {
        console.log("correct")
    } else {
        secondsLeft = secondsLeft - 10;
    }

    // prevent time left from going negative
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }

    // if there are no more questions, run endgame function
    if (questionCounter === questionsAndAnswers.length - 1) {
        timeEl.textContent = secondsLeft + " seconds remain";
        endGame();

    // if there are still questions, ask the next one
    } else {
        questionCounter++;
        prompt();
    }
    score();
}

questionsAndAnswersEl.addEventListener("click", answerClick);

function score(event) {
    // if question is correct, add 20 points
    var correctAnswer = questionsAndAnswers[questionCounter].correct; 
    if (event.target.textContent === correctAnswer) {  
        scoreEl.textContent = "Score: " + scoreCounter + 20;
    } else {
        scoreEl.textContent = "Score: " + scoreCounter;
    }
}

// create initials form
var initialsField = document.createElement("input");
initialsField.setAttribute("type", "text");
initialsField.setAttribute("placeholder", "Your initials");

function storeInitials() {
    var userInitials = initialsField.value.trim();
    localStorage.setItem("initials", JSON.stringify(userInitials));
}

// when the game ends, clear the timer and questions. allow user to save initials and score
function endGame() {
    // clear timer and questions
    clearInterval(timerInterval);
    questionsAndAnswersEl.innerHTML = "";
    timeEl.style.display = "none";

    // put initials field into score element
    document.scoreEl.appendChild(initialsField);
   

}

// store initials input
storeInitials();




