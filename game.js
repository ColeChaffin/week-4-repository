const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCountertext = document.getElementById('questionCounter');
const scoreText = document.getElementById('score')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "what is a styling page called?",
        choice1: "<script>",
        choice2: "style.css",
        choice3: "index.HTML",
        choice4: "JavaScript",
        answer: 2
    },
    {
        question: "what controls the function of a website?",
        choice1: "JavaScript",
        choice2: "<Lang = eng>",
        choice3: "let",
        choice4: "The browser",
        answer: 1
    },
    {
        question: "what is the correct way to refer to a styling page?",
        choice1: "<script href=>",
        choice2: "<script name=>",
        choice3: "<script src=>",
        choice4: "script file=>",
        answer: 3
    },
    {
        question: "How long should you study outside of class?",
        choice1: "1hr",
        choice2: "5hr",
        choice3: "10hr",
        choice4: "20hr",
        answer: 4
    }
]

const CORRECT_BONUS = 10;
const INCORRECT_BONUS = -5;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCountertext.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        };
        if(classToApply == "incorrect") {
            incrementScore(INCORRECT_BONUS);
        };

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score += num;

    scoreText.innerText = score;
}

startGame();