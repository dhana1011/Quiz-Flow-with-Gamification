const startBtn = document.querySelector('.Start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizeSection = document.querySelector('.quize-section');
const quizeBox = document.querySelector('.quize-box');
const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
let optionList;

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizeSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizeBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizeBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizeSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        console.log('question completed');
        showResultBox();
    }
};

function showQuestions(index) {
    optionList = document.querySelector('.option-list');
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `;
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent.trim();
    let correctAnswer = questions[questionCount].answer.trim();

    // Reset all options to their default state
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(option => {
        option.classList.remove('correct', 'wrong');
        if (option.textContent == correctAnswer) {
            option.classList.add('correct');
        }
    });

    // Add class to the selected option
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        console.log('Answer is correct');
        userScore++;
        headerScore();
    } else {
        answer.classList.add('wrong');
        console.log('Answer is wrong');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;
}

function showResultBox() {
    quizeBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} Out Of ${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const Progressvalue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;
        Progressvalue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgb(45, 121, 83) 0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
