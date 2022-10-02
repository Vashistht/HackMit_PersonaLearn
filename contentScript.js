// ==============================
// > Video Load Logic
// ==============================

let currentVideo = "";

chrome.runtime.onMessage.addListener((obj) => {
    const { type, videoId } = obj;

    if (type === "NEW") {
        currentVideo = videoId;
        newVideoLoaded();
    }
});

function appendComprehensionSlider() {
    // Comprehension slider input
    const sliderInput = document.createElement("input");
    sliderInput.type = "range";
    sliderInput.id = 'pl-slider-elmt';

    sliderInput.addEventListener('change', handlePLSliderChange);
    sliderInput.addEventListener('mousedown', handlePLSliderDragStart);
    sliderInput.addEventListener('mouseup', handlePLSliderDragEnd);
    sliderInput.addEventListener('keydown', handlePLSliderKeyDown);

    // Container to clip slider input
    const sliderClip = document.createElement("div");
    sliderClip.id = 'pl-slider-clip';
    sliderClip.appendChild(sliderInput);

    // Comprehension labels
    const sliderLabels = document.createElement("div");
    sliderLabels.id = 'pl-slider-labels';

    ['Clear', 'Neutral', 'Confusing'].forEach((sentiment) => {
        const sliderTextLabel = document.createElement("p");
        sliderTextLabel.innerText = sentiment;
        sliderLabels.appendChild(sliderTextLabel);
    });

    // Comprehension slider container
    const comprehensionSliderContainer = document.createElement("div");
    comprehensionSliderContainer.id = "pl-comprehension-container";
    
    comprehensionSliderContainer.appendChild(sliderClip);
    comprehensionSliderContainer.appendChild(sliderLabels);

    // Comprehension container title
    const comprehensionTitle = document.createElement("h3");
    comprehensionTitle.id = "pl-comprehension-title";
    comprehensionTitle.innerText = "PersonaLearn Comprehension";

    // Comprehension container
    const comprehensionContainer = document.createElement("div");
    comprehensionContainer.id = "pl-comprehension";

    comprehensionContainer.appendChild(comprehensionTitle);
    comprehensionContainer.appendChild(comprehensionSliderContainer);

    document.body.append(comprehensionContainer);
}

function newVideoLoaded () {
    const comprehensionSliderContainerExists = document.getElementById("pl-comprehension-container")

    if (!comprehensionSliderContainerExists) {
        appendComprehensionSlider()
    }
}

// Wait for the webpage to stop loading
if (document.readyState !== 'loading') {
newVideoLoaded();
} else {
document.addEventListener('DOMContentLoaded', newVideoLoaded);
}

// ==============================
// > Comprehension Slider Logic
// ==============================

let PLSliderUpdaterInterval = null;
let PLSliderTimeout = null;

/**
 * Function which gets called every PLSliderUpdaterInterval
 * It will update the slider value so it trends toward the center.
 */
function PLSliderTicker() {
    const sliderElmt = document.getElementById("pl-slider-elmt")
    const currentValue = +sliderElmt.value
    if (currentValue === 50) {
        clearInterval(PLSliderUpdaterInterval);
        return;
    }
    const delta = currentValue < 50 ? 1 : -1
    sliderElmt.value = currentValue + delta
}

/**
 * Handle the PLSlider change event
 */
function handlePLSliderChange() {
    clearInterval(PLSliderUpdaterInterval)
    clearTimeout(PLSliderTimeout)
    
    PLSliderTimeout = setTimeout(() => {
        PLSliderUpdaterInterval = setInterval(PLSliderTicker, 50)
    }, 1000)
}

/**
 * Pause the slider interval when the user is dragging the slider
 */
function handlePLSliderDragStart() {
    clearInterval(PLSliderUpdaterInterval);
}

/**
 * Resume the slider interval when the user is done dragging the slider
 */
function handlePLSliderDragEnd() {
    PLSliderUpdaterInterval = setInterval(PLSliderTicker, 100)
}

/**
 * Support jumping the slider up and down with the arrow keys
 */
function handlePLSliderKeyDown(event) {
    const sliderElmt = document.getElementById("pl-slider-elmt")
    const currentValue = +sliderElmt.value
    switch (event.key) {
        case 'ArrowUp':
        sliderElmt.value = currentValue + 10
        break
        case 'ArrowDown':
        sliderElmt.value = currentValue - 10
    }
}