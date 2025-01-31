//A simple fade-in animation on page load
document.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.opacity = 0; // Start with opacity 0
    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease-in-out"; // Add a smooth transition
        document.body.style.opacity = 1; // Fade in
    }, 100); // Delay the fade-in slightly
});