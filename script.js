// Story data
const story = {
    start: {
        text: "You wake up in a mysterious field. There are trees and ... strange stone structures. I wonder if they mean something... probably not lol. Mysteriously, you find that there is not a single soul in sight. Where will you go next?",
        image: "images/stonehenge.jpg",
        choices: [
            { text: "Take the Diner Path", next: "diner" },
            { text: "Take the Library path", next: "library" }
        ]
    },
    library: {
        text: "You stumble upon the library and have been cursed with 10 PAs due everyday for the rest of your life. You study for all of eternity... Study ending unlocked!",
        image: "images/geisel.jpg",
        ending: true,
    },
    diner: {
        text: "You come across a Diner. The place is completely empty. Suddenly, a strange man walking from outside. What do you think of him?",
        image: "images/kanediner.png",
        choices: [
            { text: "He's kind of cute", next: "cute" },
            { text: "He's CREEPY", next: "creepy" }
        ]
    },
    cute: {
        text: "Oh sheesh. He aurafarms.",
        image: "images/kaneaura.jpg",
        choices: [
            { text: "Next", next: "carWait" },
        ]
    },
    creepy: {
        text: "You tell the mysterious man that he is creepy. He dies... Creepy ending unlocked!",
        image: "images/kaneded1.jpg",
        ending: true,
    },
    carWait: {
        text: "He offers to take you to a distant land. Will you follow?",
        image: "images/kanecarwait.jpg",
        choices: [
            { text: "Accept his invitation", next: "car" },
            { text: "Politely decline and continue", next: "rejection" }
        ]
    },
    rejection: {
        text: "The rejection gets to him. The embarassment is TOO much. He crawls into the back of his car...and...dies... Rejection ending unlocked!",
        image: "images/kaneded2.jpg",
        ending: true
    },
    car: {
        text: "You get into the car with the strange man. He drives silently. He looks parched. He picks up a bottle drink...",
        image: "images/kanedrive.jpg",
        choices: [
            { text: "Let him drink it", next: "drunk" },
            { text: "Slap it out of his hand", next: "drink" }
        ]
    },
    drunk: {
        text: "OH SH*T HES DRUNK!!! Crash ending unlocked",
        image: "images/kanedrunk.jpg",
        ending: true
    },
    drink: {
        text: "'EEYA,' he yelps.",
        image: "images/kanedrink.jpg",
        choices: [
            { text: "Next", next: "dontDrink" },
        ]
    },
    dontDrink: {
        text: "Good job, don't drink and drive kids!",
        image: "images/goodjob.png",
        choices: [
            { text: "Next", next: "arrived" },
        ]
    },
    arrived: {
        text: "You have arrived at your location. It... is creepyyyyyy! The strange man ushers you into the cavern. What will you do.",
        image: "images/kanehole.jpg",
        choices: [
            { text: "Enter the hole", next: "enter" },
            { text: "WTF DONT FOLLOW HIM", next: "leave" }
        ]
    },
    leave: {
        text: "It is too suspicious. You leave the man. You leave the magical adventure. You wonder what could have been. What whimsy may have been lost as you walk away. You look at the strange man. He looks solemn. Tears do not fall from his eyes, but from his heart...Forlorn ending unlocked...",
        image: "images/kaneleave.jpg",
        ending: true
    },
    enter: {
        text: "You follow your heart and enter the hole. It is dank and gross. You see the light at the end of the tunnel. You enter the blinding rays.... and?",
        image: "images/tunnel.jpg",
        choices: [
            { text: "Next", next: "pangaea" },
        ]
    },
    pangaea: {
        text: "You stumble upon what seems like a magical land. Wow. Magnificient. You feel as if you want to spend much of your time at this location. Maybe like... twice a week, once at 1pm on sundays and another sometime in the middle of the week (tbd lol).",
        image: "images/pangaea.jpg",
        choices: [
            { text: "Next", next: "travel" },
        ]
    },
    travel: {
        text: "You follow the man into the structure, hopeful of whats to come. You feel something in your heart. The emotions start to swell. What have you brought upon yourself? What will the future bring about? Adventure? Riches? Somehow you already know... You now have...",
        image: "images/kanefollow.jpg",
        choices: [
            { text: "Next", next: "ending" },
        ]
    },
    ending: {
        text: "... a family. Welcome to Asayake Taiko!",
        image: "images/welcome.jpg",
        trueEnding: true
    },
};

// Game state
let currentPage = 'start';
let history = ['start'];

// DOM elements
const storyText = document.getElementById('story-text');
const storyImage = document.getElementById('story-image');
const choicesContainer = document.getElementById('choices');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const progress = document.getElementById('progress');

// Initialize the game
function initGame() {
    startBtn.addEventListener('click', () => {
        loadPage('start');
        startBtn.classList.add('hidden');
    });
    
    restartBtn.addEventListener('click', restartGame);
    
    // Load initial state
    updateProgress();
}

// Load a story page
function loadPage(pageId) {
    const page = story[pageId];
    
    if (!page) {
        storyText.textContent = "The story continues... (This path is still being written!)";
        storyImage.innerHTML = '<div class="placeholder-image">[IMAGE NOT FOUND]</div>';
        choicesContainer.innerHTML = '<button class="choice-btn" onclick="restartGame()">Start Over</button>';
        return;
    }
    
    // Update current page and history
    currentPage = pageId;
    if (!history.includes(pageId)) {
        history.push(pageId);
    }
    
    // Update story content
    storyText.textContent = page.text;
    
    // Update image with error handling
    if (page.image) {
        const img = new Image();
        img.src = page.image;
        img.alt = "Story scene";
        img.className = "story-image";
        
        img.onload = function() {
            storyImage.innerHTML = '';
            storyImage.appendChild(img);
        };
        
        img.onerror = function() {
            storyImage.innerHTML = `<div class="placeholder-image">[MISSING: ${page.image.split('/').pop()}]</div>`;
        };
        
        storyImage.innerHTML = '<div class="placeholder-image">Loading image...</div>';
        storyImage.appendChild(img);
    } else {
        storyImage.innerHTML = '<div class="placeholder-image">[NO IMAGE FOR THIS SCENE]</div>';
    }
    
    // Update choices or show ending
    choicesContainer.innerHTML = '';
    
    if (page.trueEnding) {
        choicesContainer.innerHTML = `
            <div class="ending">
                <h2>THE END</h2>
                <p>Congrats! You have found the true ending! Feel free to play again!</p>
                <button class="choice-btn" onclick="restartGame()">Play Again</button>
            </div>
        `;
    } else if (page.ending) {
        choicesContainer.innerHTML = `
            <div class="ending">
                <h2>THE END</h2>
                <p>Please play again! The true ending is somewhere else!</p>
                <button class="choice-btn" onclick="restartGame()">Play Again</button>
            </div>
        `;
    } else if (page.choices) {
        page.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => loadPage(choice.next);
            choicesContainer.appendChild(button);
        });
    }
    
    // Update progress
    updateProgress();
}

// Restart the game
function restartGame() {
    history = ['start'];
    loadPage('start');
}

// Update progress indicator
function updateProgress() {
    progress.textContent = `Page ${history.indexOf(currentPage) + 1} of ${history.length}`;
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);