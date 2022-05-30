const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const mistakeTag = document.querySelector('.mistake span');
const timeTag = document.querySelector('.time span b');
const cpmTag = document.querySelector('.CPM span');
const wpmTag = document.querySelector('.WPM span');
const btn = document.querySelector('.content button');

let timer = null,
    maxTime = (timeLeft = 60);
let isTyping = false;
let charIndex = 0;
let mistakes = 0;

function randomParagraph() {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = ''
    paragraphs[randIndex].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => inputField.focus());
    typingText.addEventListener('keydown', () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    let typedChar = inputField.value.split('')[charIndex];
    if (timeLeft && charIndex < characters.length - 1) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains('wrong')) mistakes--;
            characters[charIndex].classList.remove('correct', 'wrong');
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
            } else {
                mistakes++;
                characters[charIndex].classList.add('wrong');
            }
            charIndex++;
        }
    } else {
        inputField.value = '';
        clearInterval(timer);
    }

    let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    characters.forEach(span => span.classList.remove('active'));
    characters[charIndex].classList.add('active');
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    wpmTag.innerText = wpm;
}

function initTimer() {
    if (timeLeft) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    randomParagraph();
    timeLeft = maxTime;
    isTyping = false
    charIndex = 0;
    mistakes = 0;
    timeTag.innerText = timeLeft
    mistakeTag.innerText = 0
    wpmTag.innerText = 0
    cpmTag.innerText = 0
    inputField.value = ''
    clearInterval(timer);
}

randomParagraph();
inputField.addEventListener('input', initTyping);
btn.addEventListener('click', reset);

module.exports = randomParagraph
module.exports = initTyping
module.exports = initTimer
module.exports = reset