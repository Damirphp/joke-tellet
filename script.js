// API Key: a825be358634425d8085e1cbece5ef68

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
    // button.disabled ? audioElement.hidden = true : audioElement.hidden = false
}

// Passing joke from Joke API to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'a825be358634425d8085e1cbece5ef68',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.delivery ? joke = `${data.setup} ... ${data.delivery}` : joke = data.joke
        console.log(joke);
        audioElement.setAttribute('src', joke)
        toggleButton();
        tellMe(joke);
    } catch (error) {
        // Catch Errors Here
        console.log('Whoops!', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);