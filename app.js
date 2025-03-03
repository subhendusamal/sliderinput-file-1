const slider = document.getElementById("mySlider");
const currentValue = document.getElementById("current-value");
const priceBubble = document.getElementById("priceBubble");
const buttons = document.querySelectorAll(".range-btn");

// Function to update the slider and price tag smoothly
function updateSlider(value, applyTransition = true) {
    let percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;

    // Temporarily enable the slider to allow smooth movement
    slider.removeAttribute("disabled");

    // Apply smooth transition effect to both slider and price tag
    if (applyTransition) {
        slider.style.transition = "all 0.7s ease-in-out";  
        priceBubble.style.transition = "all 0.7s ease-in-out";
    } else {
        slider.style.transition = "none";
        priceBubble.style.transition = "none";
    }

    // Set the slider value (ensures smooth movement)
    slider.value = value;  

    // Update the slider's track fill animation
    slider.style.background = `linear-gradient(to right, orange ${percentage}%, lightgray ${percentage}%)`;

    // Format and update the displayed price value
    let formattedValue = parseInt(value).toLocaleString();
    currentValue.innerHTML = value == slider.max ? `${formattedValue}<br>+` : formattedValue;

    // Move the floating price tag smoothly with the slider
    priceBubble.style.left = `calc(${percentage}% - 20px)`;

    // Disable the slider again after transition completes
    setTimeout(() => {
        slider.setAttribute("disabled", "true");
    }, 700); // Match transition duration
}

// Ensure the price tag starts at the minimum value without transition on page load
window.onload = function () {
    updateSlider(slider.min, false); // No transition initially
};

// Event listener for button clicks (triggers smooth transition)
buttons.forEach(button => {
    button.addEventListener("click", function() {
        let value = this.getAttribute("data-value");
        updateSlider(value, true); // Smooth movement when clicking
    });
});


