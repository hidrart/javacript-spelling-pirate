window.addEventListener('DOMContentLoaded', async () => {
    var score = 0;
    var counter = 0;
    var difficulty = localStorage.getItem("difficulty");
    word = await updateData(score, difficulty);
    var form = document.getElementById("formSpelling");
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        var input = form.elements['word'].value.toLowerCase();
        if (word == input) {
            score = score + 1;
        }
        counter = counter + 1;
        var attemp = document.getElementById("attemp");
        attemp.innerHTML = 10 - counter;
        if (counter == 10) {
            window.location.replace('index.html');
        }
        let highscore = localStorage.getItem("highscore");
        if (score > highscore) {
            localStorage.setItem("highscore", score);
        }
        word = await updateData(score, difficulty);
        form.reset();
    });
});

function playAudio() {
    document.getElementById("audio").load();
    document.getElementById("audio").play();
}
const updateData = async (score, difficulty) => {
    var words = await getWord();
    var word = words.data.filter((word) => {
        return word.difficulty == difficulty
    })
    var word = word[Math.floor(Math.random() * word.length)];
    var data = await getData(word.word);
    if (data[0].phonetics.length == 0) {
        console.log(data.word);
        console.log('this');
        await updateData(source);
    } else {
        changeData(data, score, difficulty);
    }
    return word.word;
}
const getWord = async () => {
    const url = 'data.json';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => data).catch(console.log);
    return response
}
const getData = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url).then(response => response.json()).then(data => data).catch(console.log);
    return response
}
const changeData = (data, value, difficulty) => {
    console.log(data[0])
    var level = document.getElementById("difficulty");
    level.innerHTML = `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} `;
    var score = document.getElementById("score");
    score.innerHTML = value;
    var definition = document.getElementById("definition");
    definition.innerHTML = data[0].meanings[0].definitions[0].definition;
    var audio = document.getElementById("audio");
    audio.innerHTML = `<source src="https:${data[0].phonetics[0].audio}" type="audio/mpeg" id="source">`
}