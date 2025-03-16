let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let button = document.querySelector("button");

document.addEventListener("keypress", gameStarted);
button.addEventListener("click", gameStarted)

function gameStarted() {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }

}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            if (level > highScore) {
                highScore = level;
                setTimeout(() => {
                h3.textContent = `Your high score : ${highScore + 1}`;
                }, 1000);
            }
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#e0ff4f";
        }, 200);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

// theme toggling

var icon = document.getElementById("icon");

icon.onclick = function() {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")) {
        icon.src = "assets/sun.png";
    } else {
        icon.src = "assets/moon.png";
    }
}
