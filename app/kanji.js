// TODO: load data from Google sheet
let dict = {
    "何": "なに", 
    "誰": "だれ",
    "私":"わたし",
    "貴方":"あなた",
    "食べ":"たべ",
    "旅行":"りょうこ",
    "仕事":"しごと",
}

let kanjiList = []

for (const [key, _] of Object.entries(dict)){
    kanjiList.push(key);
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


function pickQuestion(e) {
    if (e.key === "Enter" || e.key === " "){
        question = document.getElementById("kanji-question")
        randomElement = kanjiList[Math.floor(Math.random() * kanjiList.length)]
        question.textContent = randomElement
        document.getElementById("submit-answer").value = ""
    }
}

document.getElementById("submit-answer").addEventListener("input", checkAnswer)

window.addEventListener("keypress", pickQuestion)