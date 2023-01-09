// TODO: load data from Google sheet
let dict = {}
let kanjiList = []
let imiList = []

async function createQuestion() {
    await axios.get('server:8080/imi-question')
    .then(function(response, data) {
        dict = response.data["question"]

        kanjiList = []
        imiList = []
        for (const [kanji, imi] of Object.entries(dict)){
            kanjiList.push(kanji)
            imiList.push(imi)

        }
    })
    console.log(dict, imiList)
}

let a = document.getElementById("senta-a")
let b = document.getElementById("senta-b")
let c = document.getElementById("senta-c")
let d = document.getElementById("senta-d")



function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function pickQuestion() {
    question = document.getElementById("kanji-question")
    questionColor = document.querySelector(".kanji-question-gray")
    questionColor.style.backgroundColor = "#444648"
    randomElement = kanjiList[Math.floor(Math.random() * kanjiList.length)]
    question.textContent = randomElement
    imiChoices = getRandom(imiList, 3)
    imiChoices.push(dict[randomElement])
    imiChoices = shuffle(imiChoices)
    a.value = imiChoices[0]
    b.value = imiChoices[1]
    c.value = imiChoices[2]
    d.value = imiChoices[3]
}

function keyPressPickQuestion(e) {
    if (e.key === "Enter" || e.key === " "){
        pickQuestion()
    }
}

function KeyPressFetchNewQuestion(e) {
    if (e.key === "Shift"){
        createQuestion().then(pickQuestion)
    }
}

function checkSenta(e){ 
    question = document.getElementById("kanji-question")
    questionColor = document.querySelector(".kanji-question-gray")
    value = ""
    if (e.key ==="1") {
        value = a.value
    }
    if (e.key ==="2") {
        value = b.value
    }
    if (e.key ==="3") {
        value = c.value
    }
    if (e.key ==="4") {
        value = d.value
    }
    if (value == "") {
        questionColor.style.backgroundColor = "#444648"
    }
    else if (value == dict[question.textContent]) {
        questionColor.style.backgroundColor = "#C8E6C9"
    } else {
        questionColor.style.backgroundColor = "#FFCDD2"
    }
}

function onloadFunction() {
    createQuestion().then(pickQuestion)
}

window.addEventListener("keypress", keyPressPickQuestion)
window.addEventListener("keypress", checkSenta)
window.addEventListener("keydown", KeyPressFetchNewQuestion)
window.onload = onloadFunction();