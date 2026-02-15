// French alphabet letters
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Numbers 0-20 in French
const numbers = [
    { value: '0', french: 'zéro' },
    { value: '1', french: 'un' },
    { value: '2', french: 'deux' },
    { value: '3', french: 'trois' },
    { value: '4', french: 'quatre' },
    { value: '5', french: 'cinq' },
    { value: '6', french: 'six' },
    { value: '7', french: 'sept' },
    { value: '8', french: 'huit' },
    { value: '9', french: 'neuf' },
    { value: '10', french: 'dix' },
    { value: '11', french: 'onze' },
    { value: '12', french: 'douze' },
    { value: '13', french: 'treize' },
    { value: '14', french: 'quatorze' },
    { value: '15', french: 'quinze' },
    { value: '16', french: 'seize' },
    { value: '17', french: 'dix-sept' },
    { value: '18', french: 'dix-huit' },
    { value: '19', french: 'dix-neuf' },
    { value: '20', french: 'vingt' }
];

// Initialize speech synthesis
const speechSynthesis = window.speechSynthesis;

// Constants
const SPEECH_RATE = 0.8; // Slightly slower for learning

// Function to speak text in French
function speak(text, button) {
    // Cancel any ongoing speech
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    
    // Create a new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = SPEECH_RATE;
    
    // Add visual feedback
    button.classList.add('speaking');
    
    // Remove visual feedback when done
    utterance.onend = () => {
        button.classList.remove('speaking');
    };
    
    // Speak the text
    speechSynthesis.speak(utterance);
}

// Create letter buttons
function createLettersGrid() {
    const grid = document.getElementById('letters-grid');
    
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'item-button';
        button.textContent = letter;
        button.addEventListener('click', () => speak(letter, button));
        grid.appendChild(button);
    });
}

// Create number buttons
function createNumbersGrid() {
    const grid = document.getElementById('numbers-grid');
    
    numbers.forEach(num => {
        const button = document.createElement('button');
        button.className = 'item-button';
        button.textContent = num.value;
        button.addEventListener('click', () => speak(num.french, button));
        grid.appendChild(button);
    });
}

// Tab switching functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    createLettersGrid();
    createNumbersGrid();
    setupTabs();
    
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
        const container = document.querySelector('.container');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Lo sentimos, tu navegador no soporta text-to-speech. Por favor intenta con un navegador moderno como Chrome, Firefox o Safari.';
        container.appendChild(errorMessage);
    }
});
