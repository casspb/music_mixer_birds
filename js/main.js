(() => {
    let nest = document.querySelector('.nest');
    let birdEggs = document.querySelectorAll(".egg img");
    let playButton = document.getElementById('playButton');
    let pauseButton = document.getElementById('pauseButton');
    let rewindButton = document.getElementById('rewindButton');
    let volSlider = document.getElementById('volumeControl');
    let volAmount = document.getElementById('volumeAmt');
    let eggBox = document.querySelector('.egg');

    // Store the audio elements in an object for easy access
    let audios = {
        "commonloon": document.querySelector('#audioLoon'),
        "commonmurre": document.querySelector('#audioMurre'),
        "greattit": document.querySelector('#audioGreat'),
        "robin": document.querySelector('#audioRobin'),
        "rockbunting": document.querySelector('#audioRock'),
        "songthrush": document.querySelector('#audioSong')
    };

    // Associate each egg with its respective audio element
    let eggAudioMap = {};
    birdEggs.forEach(egg => {
        let trackRef = egg.dataset.trackref;
        if (audios[trackRef]) {
            eggAudioMap[trackRef] = audios[trackRef];
            audios[trackRef].addEventListener('ended', () => {
                audios[trackRef].currentTime = 0; // Reset the playback
                audios[trackRef].play(); // Play the audio again
            });
        }
    });

    // Function to make eggs draggable
    const makeEggsDraggable = () => {
        birdEggs = document.querySelectorAll(".egg img"); // Re-select eggs in case some were removed
        birdEggs.forEach(egg => {
            egg.draggable = true;
            egg.removeEventListener('dragstart', handleDragStart);
            egg.addEventListener('dragstart', handleDragStart);
        });
    };

    // Function to handle drag start
    const handleDragStart = (event) => {
        event.dataTransfer.setData("text/plain", event.target.dataset.trackref);
    };

    // Call the function to make eggs draggable initially
    makeEggsDraggable();

    // Add event listener to the nest for dropping
    nest.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow dropping
    });

    nest.addEventListener('drop', (event) => {
        event.preventDefault();
        const trackRef = event.dataTransfer.getData("text/plain");
        if (trackRef && audios[trackRef]) {
            audios[trackRef].play();
            const draggedEgg = document.querySelector(`[data-trackref="${trackRef}"]`);
            const clone = draggedEgg.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.width = '134px';
            clone.style.height = '134px';
            clone.style.top = `${event.clientY - nest.getBoundingClientRect().top - 67}px`; // Adjust for egg size
            clone.style.left = `${event.clientX - nest.getBoundingClientRect().left - 67}px`; // Adjust for egg size
            clone.style.animation = 'infiniteShake 0.5s ease-in-out infinite'; // Apply infinite shake animation
            nest.appendChild(clone);
            draggedEgg.remove();
        }
    });

    // Add event listener for the play button to play only the audios in the drop zone
    playButton.addEventListener('click', () => {
        for (let trackRef in eggAudioMap) {
            let audio = eggAudioMap[trackRef];
            audio.play();
        }
        // Resume animations
        for (let clone of nest.querySelectorAll('img')) {
            clone.style.animationPlayState = 'running';
        }
    });

    // Add event listener for the pause button to pause the animations and audio
    pauseButton.addEventListener('click', () => {
        for (let trackRef in eggAudioMap) {
            let audio = eggAudioMap[trackRef];
            audio.pause();
        }
        // Pause animations
        for (let clone of nest.querySelectorAll('img')) {
            clone.style.animationPlayState = 'paused';
        }
    });

    rewindButton.addEventListener('click', () => {
        for (let trackRef in eggAudioMap) {
            let audio = eggAudioMap[trackRef];
            audio.currentTime = 0;
        }
    });

    volSlider.addEventListener('input', () => {
        let volume = parseFloat(volSlider.value);
        for (let trackRef in eggAudioMap) {
            let audio = eggAudioMap[trackRef];
            audio.volume = volume / 100;
        }
        volAmount.textContent = `Volume: ${volume}%`;
    });
})();