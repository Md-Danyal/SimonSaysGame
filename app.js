let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.getElementById("game-text");
let h3 = document.querySelector("h3");

let button = document.querySelector(".start");

// responsive

function updateText() {
    let textElement = document.getElementById("game-text");
    console.log("Updating text...");
    if (window.innerWidth <= 800) {
        h2.textContent = "Click 'Start' below to begin.";
    } else {
        textElement.textContent = "Press any keyboard key or 'Start' below to start the game.";
    }
}

updateText();

window.addEventListener("resize", updateText);

// audio

function playAudio() {
    let audio = document.getElementById("bg-music");
    if (audio) {
        audio.play()
    }
}

function playSfx() {
    let sfx = new Audio("assets/pop-1.mp3");
    sfx.play();
}

function playTap() {
    let tap = new Audio("assets/pop-6.mp3");
    tap.play();
}

function playEnd() {
    let end = new Audio("assets/end.mp3");
    end.play();
}


document.addEventListener("keydown", gameStarted);
button.addEventListener("click", gameStarted);
button.addEventListener("click", () => {
    playAudio();
    // gameStarted = true;
});

// game functions

function gameStarted() {
    if (started == false) {
        console.log("Game Started");
        started = true;
        button.innerText = "Started!";
        levelUp();
    }

}

function gameFlash(btn) {
    btn.classList.add("flash");
    playSfx();
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    playTap();
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
                    h3.innerHTML = `Your high score <i class="fa-solid fa-trophy"></i>: ${highScore + 1}`;
                }, 1000);
            }
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart the game`;
        document.querySelector("body").style.backgroundColor = "red";
        button.innerText = "Restart";
        playEnd();
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "";
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

icon.onclick = function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        this.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode <i class="fa-solid fa-toggle-on"></i>`;
    } else {
        this.innerHTML = `<i class="fa-solid fa-moon"></i>
                Dark Mode <i class="fa-solid fa-toggle-off"></i>`;
    }
}

// Try to autoplay when the page loads
window.addEventListener("load", () => {
    playAudio();
});

// menu

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
}

function toggleSubMenu() {
    var subMenu = document.getElementById("sub-menu");
    if (subMenu.style.display === "none" || subMenu.style.display === "") {
        subMenu.style.display = "flex";
    } else {
        subMenu.style.display = "none";
    }
}

function toggleSoundMenu() {
    var soundMenu = document.getElementById("sounds");
    if (soundMenu.style.display === "none" || soundMenu.style.display === "") {
        soundMenu.style.display = "flex";
    } else {
        soundMenu.style.display = "none";
    }
}

// sound

const slider = document.getElementById("volume-slider");
const progressBar = document.getElementById("volume-progress");
const volumeValue = document.getElementById("volume-value");
const volumeIcon = document.getElementById("volume-icon");

const audioElements = document.querySelectorAll("audio");

// Function to update volume for all audio elements
slider.oninput = function () {
    let volume = slider.value / 100; // Convert 0-100 to 0-1 for audio

    audioElements.forEach(audio => {
        audio.volume = volume;
    });

    progressBar.value = slider.value;
    volumeValue.textContent = slider.value + "%";

    if (slider.value == 0) {
        volumeIcon.className = "fas fa-volume-mute";
    } else if (slider.value < 40) {
        volumeIcon.className = "fas fa-volume-down";
    } else if (slider.value < 80) {
        volumeIcon.className = "fas fa-volume";
    } else {
        volumeIcon.className = "fas fa-volume-up";
    }
};
