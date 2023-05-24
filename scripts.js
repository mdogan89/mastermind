var coll = document.getElementsByClassName("collapsible");
var k;

for (k = 0; k < coll.length; k++) {
    coll[k].addEventListener("click", function () {
        this.classList.toggle("active");
        this.lastElementChild.classList.toggle("active_svg");

        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

function focusColorboard() {
    let colors = document.getElementById("colours");
    colors.style.boxShadow = "inset 0px 30px 30px rgba(255, 255, 255, 1)";
    const myTimeout = setTimeout(r, 1000);
    function r() {
        colors.style.boxShadow = "inset 0px 10px 10px rgba(0, 0, 0, 1)";
    }
}

function focusGuess() {
    let guess = document.getElementById("guess");
    guess.style.boxShadow = "inset 0px 15px 15px rgba(255, 255, 255, 1)";
    const myTimeout = setTimeout(r, 1000);
    function r() {
        guess.style.boxShadow = "inset 0px 10px 10px rgba(0, 0, 0, 1)";
    }
}

function focusCode() {
    let question = document.getElementById("row");
    question.style.boxShadow = "inset 0px 15px 15px rgba(255, 255, 255, 1)";
    const myTimeout = setTimeout(r, 1000);
    function r() {
        question.style.boxShadow = "none";
    }
}

function focusPins() {
    let pins = document.getElementsByClassName("res")[0];
    pins.style.boxShadow = "inset 0px 20px 20px rgba(255, 255, 255, 1)";
    pins.style.borderRadius = "5px";
    const myTimeout = setTimeout(r, 1000);
    function r() {
        pins.style.boxShadow = "none";
    }
}

//colour list and random colour
const colours = ["yellow", "red", "blue", "orange", "black", "green"];
let colour = () => colours[parseInt(Math.random() * 6)];

//getting question
let question = [];
for (let i = 0; i < 4; i++) {
    document.getElementById("row").children[i].style.backgroundColor = colour();
    question.push(document.getElementById("row").children[i].style.backgroundColor);
}

//setting colour choose
for (let i = 0; i < 6; i++) {
    document.getElementById("colours").children[i].style.backgroundColor = colours[i];
    document.getElementById("colours").children[i].addEventListener("click", function (event) {
        picker.style.backgroundColor = event.target.style.backgroundColor;
        picker.style.opacity = 1;
    })
}
//setting picker
let mousePos = { x: undefined, y: undefined }
let picker = document.getElementById("picker")
window.addEventListener("mousemove", function (event) {
    mousePos = { x: event.pageX, y: event.pageY }
    picker.style.top = mousePos.y - 30 + "px"
    picker.style.left = mousePos.x - 30 + "px"
    picker.style.pointerEvents = "none";
})

for (let i = 0; i < 4; i++) {
    document.getElementById("guess").children[i].addEventListener("click", function (event) {
        event.target.style.backgroundColor = document.getElementById("picker").style.backgroundColor
        picker.style.opacity = 0
    })
};

// submission
let turn = 1
function sub() {

    let guessList = []
    for (let i = 0; i < 4; i++) {
        guessList.push(document.getElementById("guess").children[i].style.backgroundColor);
    }

    if (guessList.includes("white") || guessList.includes('')) {
        return alert("You should not leave any blank spaces.")
    }

    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("row")[turn].children[i].style.backgroundColor = guessList[i]
    }

    let gList = guessList
    let tList = [...question]
    let pins = []
    //calculatin red pins
    for (let i = 3; i > -1; i--) {
        if (guessList[i] == question[i]) {
            tList.splice(i, 1)
            gList.splice(i, 1)
            pins.push("red")
        }
    }

    if (pins.length == 4) {
        if (confirm("Congratulations!\nDo you want to try again?")) {
            location.reload();
        }
        else {
            console.log(pins)
        }
    }

    // calculating white pins
    for (let i = gList.length - 1; i > -1; i--) {
        for (let j = tList.length - 1; j > -1; j--) {
            if (gList[i] === tList[j]) {
                pins.push("white")
                tList.splice(j, 1)
                gList.splice(i, 1)
            }
        }
    }

    let n = pins.length
    while (n < 4) {
        pins.push("grey")
        n++
    }

    //randomizing pins
    let r = pins.length
    let rPins = []
    let rt = pins
    while (r > 0) {
        let j = Math.floor(Math.random() * r)
        rPins.push(rt[j])
        rt.splice(j, 1)
        r--
    }

    //cleaning guess and returning pins
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("row")[turn].children[4].children[i].style.backgroundColor = rPins[i]

        if (document.getElementsByClassName("row")[turn].children[4].children[i].style.backgroundColor != "grey") {
            document.getElementsByClassName("row")[turn].children[4].children[i].style.boxShadow = "0px 3px 3px rgba(0, 0,0,1)"
        }

        document.getElementById("guess").children[i].style.backgroundColor = "white"
        document.getElementsByClassName("row")[turn].children[i].style["boxShadow"] = "0px 3px 3px rgba(0, 0,0,1)";
    }
    turn++
    if (turn == 9) {
        if (confirm("Sorry you loose.\nDo you want to try again?")) {
            location.reload();
        }
        else {
            return
        }
    }
}

function hint() {
    let h = document.getElementById("row").children[Math.floor(Math.random() * 4)]
    h.style.opacity = "1"
    const myTimeout = setTimeout(r, 1000)
    function r() {
        h.style.opacity = 0
    }
}

function retry() {
    location.reload()
}

/* Events fired on the drag target */

document.addEventListener("drag", function (event) {
    picker.style.backgroundColor = event.target.style.backgroundColor
});

/* Events fired on the drop target */
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.getElementById("guess").addEventListener("drop", function (event) {
    event.preventDefault();
    event.target.style.backgroundColor = picker.style.backgroundColor;
});
