(() => {
    let nest = document.querySelector('.nest');
    let birdEggs = document.querySelectorAll(".egg img");
    let playButton = document.getElementById('playButton');
    let pauseButton = document.getElementById('pauseButton');
    let rewindButton = document.getElementById('rewindButton');
    let volSlider = document.getElementById('volumeControl');
    let volAmount = document.getElementById('volumeAmt');

    // Store the audio elements in an object for easy access
    let audios = {
        "commonloon": document.querySelector('#audioLoon'),
        "commonmurre": document.querySelector('#audioMurre'),
        "greattit": document.querySelector('#audioGreat'),
        "robin": document.querySelector('#audioRobin'),
        "rockbunting": document.querySelector('#audioRock'),
        "songthrush": document.querySelector('#audioSong')
    };

    // Add event listeners to each egg for dragging
    birdEggs.forEach(egg => {
        egg.draggable = true;
        egg.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text/plain", event.target.dataset.trackref);
        });
    });

    // Add event listener to the nest for dropping
    nest.addEventListener('dragover', (event) => {
        event.preventDefault();
    });



    // Add event listeners for audio controls
    playButton.addEventListener('click', () => {
        for (let audio in audios) {
            audios[audio].play();
        }
    });

    pauseButton.addEventListener('click', () => {
        for (let audio in audios) {
            audios[audio].pause();
        }
    });

    rewindButton.addEventListener('click', () => {
        for (let audio in audios) {
            audios[audio].currentTime = 0;
        }
    });

    volSlider.addEventListener('input', () => {
        let volume = parseFloat(volSlider.value);
        for (let audio in audios) {
            audios[audio].volume = volume / 100;
        }
        volAmount.textContent = `Volume: ${volume}%`;
    });
})();