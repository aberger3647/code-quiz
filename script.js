var startButton = document.querySelector("button");
var secondsLeft = 60;
var timerInterval;
var promptEl = document.getElementById("questionsAndAnswers");
var questionCounter = 0;
var timeEl = document.querySelector(".time");
var scoreCounter = 0;
var scoreEl = document.getElementById("score");

promptEl.setAttribute("style", "font-family:sans-serif; text-align:center; display:flex; flex-direction:column");
scoreEl.setAttribute("style", "font-family:sans-serif; text-align:center; display:flex; flex-direction:column");

// when we click start button, timer function runs. start button disappears. prompt displays
startButton.addEventListener("click", function () {
    timer();
    startButton.style.display = "none";
    prompt();
    // why does javascript not like (event)?
    score(event);
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
    promptEl.innerHTML = "";
    var currentQuestion = questionsAndAnswers[questionCounter];
    var questionEl = document.createElement("h3");
    questionEl.textContent = currentQuestion.question;
    promptEl.append(questionEl);
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var answer = document.createElement("button");
        answer.textContent = currentQuestion.answers[i];
        promptEl.append(answer);
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
    score(event);
}

promptEl.addEventListener("click", answerClick);

function score(event) {
    // if question is correct, add 20 points
    var correctAnswer = questionsAndAnswers[questionCounter].correct; 
    // i'm not sure how to access the correct answer to make the comparison
    if (event.target.textContent === correctAnswer) {  
        return scoreEl.textContent = "Score: " + scoreCounter + 20;
    } else {
        return scoreEl.textContent = "Score: " + scoreCounter;
    } 
}

// store score
localStorage.setItem("score", JSON.stringify(score));

// create initials form
var form = document.createElement("form");
var initialsField = document.createElement("input");
form.appendChild(initialsField);
initialsField.setAttribute("type", "text");
initialsField.setAttribute("placeholder", "Your initials");

// create storeInitials function
function storeInitials() {
    var userInitials = initialsField.value.trim();
    localStorage.setItem("initials", JSON.stringify(userInitials));
}

// add event listener to initials submission
initialsField.addEventListener("submit", storeInitials);

// when the game ends, clear the timer and questions. allow user to save initials and score
function endGame() {
    // clear timer and questions
    clearInterval(timerInterval);
    promptEl.innerHTML = "";
    timeEl.style.display = "none";

    // put initials field into score element
    scoreEl.appendChild(initialsField);

    // put score into score element
    scoreEl.appendChild(renderScore);
}

// store initials input
storeInitials();

// render initials and score
function renderInitialsAndScore() {
    // get stored score
    var highScore = JSON.parse(localStorage.getItem("scoreCounter"))
    // create element to hold score info
    var renderScore = document.createElement("span");
    // get stored initials
    var initialsInput = JSON.parse(localStorage.getItem("userInitials"));
    // create element to hold initials info
    var renderInitials = document.createElement("span");
    // put score info into score element
    renderScore.innerHTML = highScore;
    // put initials info into initials element
    renderInitials.innerHTML = initialsInput;
    // put score and initials into score element
    document.scoreEl.appendChild(scoreCounter);
    document.scoreEl.appendChild(renderInitials);
}

renderInitialsAndScore();
