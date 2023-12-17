//Look into snippet codes: good for repeated codes
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
//constantly update question #
const progressText = document.getElementById('progressText');
//constantly update score
const scoreText= document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
//Arrray.from that converts elements to array
let currentQuestion = {};//object
let acceptingAnswers = false;//delay
let score = 0;
let questionCounter = 0;//what question you are on
let availableQuesions = []; //copy of question to give unique questions
let hira=['a', 'i', 'u','e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so',
        'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 
        'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo',
        'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'n', 'wo']; 

var kana={'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ',
'ka':'カ', 'ki': 'キ', 'ku':'ク','ke':'ケ', 'ko':'コ',
'sa':'サ', 'shi':'シ', 'su':'ス','se':'セ', 'so':'ソ', 
'ta':'タ', 'chi':'チ', 'tsu':'ツ', 'te':'テ','to':'ト',
'na':'ナ', 'ni':'ニ', 'nu':'ヌ', 'ne':'ネ', 'no':'ノ', 
'ha':'ハ', 'hi':'ヒ', 'fu':'フ', 'he':'ヘ', 'ho':'ホ', 
'ma':'マ', 'mi':'ミ', 'mu':'ム', 'me':'メ', 'mo':'モ',
'ya':'ヤ', 'yu':'ユ', 'yo':'ヨ', 'ra':'ラ', 'ri':'り', 'ru':'ル', 're':'レ', 'ro':'ロ',
'wa':'ワ', 'n':'ン', 'wo':'ヲ'};
var ch={1:'a', 2:'b', 3:'c', 4:'d'}
//CONSTANTS
const CORRECT_BONUS = 10; //score if answer correctly
const MAX_QUESTIONS = 10;
  
let questions = [ //zero base indexing
    {
        
        choice1: a=hira[Math.floor(Math.random()*hira.length)],
        choice2: b=hira[Math.floor(Math.random()*hira.length)],
        choice3: c=hira[Math.floor(Math.random()*hira.length)],
        choice4: d=hira[Math.floor(Math.random()*hira.length)],
        
        answer: e=Math.floor(Math.random()*4)+1,
        question: kana[window[ch[e]]],
    },
  
];
for(let i=0; i<MAX_QUESTIONS;i++){
    questions.push({choice1: a=hira[Math.floor(Math.random()*hira.length)],
    choice2: b=hira[Math.floor(Math.random()*hira.length)],
    choice3: c=hira[Math.floor(Math.random()*hira.length)],
    choice4: d=hira[Math.floor(Math.random()*hira.length)],
    
    answer: e=Math.floor(Math.random()*4)+ 1,
    question: kana[window[ch[e]]]})
}


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];//spread operator ...
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = "Question" + questionCounter+"/"+MAX_QUESTIONS;//
    //update progress bar by changing width
    progressBarFull.style.width = questionCounter/MAX_QUESTIONS * 100+"%";

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);//. random gives decimals
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);//gets rid of the question already used
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        //Displays on console if answer selected is correct
        const classToApply= 
        (selectedAnswer)==currentQuestion.answer ? "correct": "incorrect";
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }
        console.log(classToApply);
  
        //
        selectedChoice.parentElement.classList.add(classToApply);
        //interval of time between each new question
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };
startGame();