const HEIGHT = 400;
const URI = "/vocab-slideshow";
const SPEED = 0.008

let dmak;
let autoPlay = false;
let autoNext = true;
let playing = true;

let index = 1;

function playAudio(file) {
    let audio = new Audio(URI + `/audios/${file}.mpeg`);
    audio.play();
}

function main() {
    let data = vocabData.find(v => v['#'] == index);
    console.log(data);
    heading.innerText = data.devnagri;
    kanji.innerText = data.kanji || data.kana;
    draw.innerHTML = "";
    playing = autoPlay;
    dmak = new Dmak(data.kanji || data.kana, {
        'element': "draw",
        "autoplay": autoPlay,
        "autonext": autoNext,
        "uri": URI + "/kanji/",
        "height": HEIGHT,
        "width": HEIGHT,
        "step": SPEED,
    },
        main, 1000);
    playAudio(data.audio);
    index += 1;
}

function gotoFunction() {
    dmak.pause();
    let target = gotoInput.value;
    gotoInput.value = "";
    let foundIndex = fullData.findIndex(v => v['#'] == target || v['kanji'] == target);
    if (foundIndex && foundIndex != -1) {
        index = foundIndex;
        main();
    }
}

document.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        gotoFunction();
    }

    if (event.key == "ArrowRight") {
        next();
    }

    if (event.key == "ArrowLeft") {
        prev();
    }

    if (event.key == " ") {
        if (playing) { pause() } else { play() }
    }
})

gotoButton.onclick = gotoFunction

main()