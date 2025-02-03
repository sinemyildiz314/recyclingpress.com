//A simple fade-in animation on page load
document.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.opacity = 0; 
    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease-in-out"; // Added a smooth transition
        document.body.style.opacity = 1; // Fade in
    }, 100); // Delay the fade-in slightly
});

const navLinks = document.querySelectorAll('nav a');
const contentDiv = document.getElementById('content');
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = event.target.dataset.page;
        loadPage(page);
    });
});

function loadPage(page) {
    if (page === 'home') {
        // Display the content of the main element for the home page
        contentDiv.innerHTML = document.querySelector('main').innerHTML;
    } else {
        // Fetch content for other pages as before
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(html => {
                contentDiv.innerHTML = html;
                // Added event listeners for interactive elements on the new page
                if (page === 'contact') {
                    const form = document.getElementById('contact-form');
                    form.addEventListener('submit', handleSubmit);
                }
            });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Form submitted!');
}

hamburger.addEventListener('click', () => {
    navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
});

// To load the home page initially
loadPage('home');

