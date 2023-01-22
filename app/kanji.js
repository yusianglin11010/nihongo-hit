let dict = {}
let kanjiList = []

async function createQuestion() {
    await fetch('https://nekosekai.com/nihon-hitter/kanji-question')
    .then((response) => {
        return response.json()
    }).then((jsonData) => {
        dict = jsonData["question"]
        kanjiList = []
        for (const [key, _] of Object.entries(dict)){
            kanjiList.push(key);
        }
    })
}


function checkAnswer(e) {
    question = document.getElementById("kanji-question")
    questionColor = document.querySelector(".kanji-question-gray")
    if (e.target.value == "") {
        questionColor.style.backgroundColor = "#444648"
    }
    else if (e.target.value == dict[question.textContent]) {
        questionColor.style.backgroundColor = "#C8E6C9"
    } else {
        questionColor.style.backgroundColor = "#FFCDD2"
    }
}


function pickQuestion() {
    questionColor = document.querySelector(".kanji-question-gray")
    questionColor.style.backgroundColor = "#444648"
    question = document.getElementById("kanji-question")
    answer = document.getElementById("kanji-answer")
    randomElement = kanjiList[Math.floor(Math.random() * kanjiList.length)]
    question.textContent = randomElement
    answer.textContent = dict[randomElement]
    document.getElementById("submit-answer").value = ""
}

function KeyPressPickQuestion(e) {
    if (e.key === "Enter" || e.key === " "){
        pickQuestion()
    }
}
let keysPressed = {};
function KeyPressFetchNewQuestion(e) {
    if (e.key === "Shift"){
        createQuestion().then(pickQuestion)
    }
}

let keyPressed = {}
function showAnswer(e) {
    keyPressed[e.key] = true
    if (keyPressed["Alt"] && e.key === "ArrowUp"){
        answerColor = document.querySelector(".submit-answer")
        answerColor.style.color = "#444648"
    }
}

function hideAnswer(e) {
    if (keyPressed["Alt"] && e.key === "ArrowDown"){
        answerColor = document.querySelector(".submit-answer")
        answerColor.style.color = "#fff"
    }
}

function onloadFunction() {
    createQuestion().then(pickQuestion)
}

document.getElementById("submit-answer").addEventListener("input", checkAnswer)
window.addEventListener("keypress", KeyPressPickQuestion)
window.addEventListener("keydown", KeyPressFetchNewQuestion)
document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });
window.addEventListener("keydown", showAnswer)
window.addEventListener("keydown", hideAnswer)


window.onload = onloadFunction()
