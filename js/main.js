(() => {
    let nest = document.querySelector('.nest');
    let birdEggs = document.querySelectorAll(".egg");

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

    nest.addEventListener('drop', (event) => {
        event.preventDefault();
        const trackRef = event.dataTransfer.getData("text/plain");
        if (trackRef && audios[trackRef]) {
            audios[trackRef].play();
            // Append the dragged egg to the nest
            const draggedEgg = document.querySelector(`[data-trackref="${trackRef}"]`);
            nest.appendChild(draggedEgg);
        }
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