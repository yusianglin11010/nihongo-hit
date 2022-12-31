// TODO: load data from Google sheet
dict = {
    "仕事": "工作",
    "私": "我",
}

let kanjiList = []
let imiList = ["我","你","他","工作","吃飯"]
for (const [key, _] of Object.entries(dict)){
    kanjiList.push(key);
}

let a = document.getElementById("senta-a")
let b = document.getElementById("senta-b")
let c = document.getElementById("senta-c")
let d = document.getElementById("senta-d")

a.addEventListener("click", checkSenta)
b.addEventListener("click", checkSenta)
c.addEventListener("click", checkSenta)
d.addEventListener("click", checkSenta)

window.addEventListener("keypress", pickQuestion)


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

function pickQuestion(e) {
    if (e.key === "Enter" || e.key === " "){
        question = document.getElementById("kanji-question")
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
}

function checkSenta(e){ 
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
    console.log(e.target.value)
}
