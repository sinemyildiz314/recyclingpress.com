//Fade-in animation on page load
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
        // event.preventDefault();
        const page = event.target.dataset.page;
        loadPage(page);
    });
});

function loadPage(page) {
    fetch(`${page}.html`)
      .then(response => response.text())
      .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const pageContent = tempDiv.querySelector('#page-content');

            if (pageContent) {
                contentDiv.innerHTML = pageContent.innerHTML;

                const loadedPage = pageContent.dataset.page;

                history.pushState(null, null, loadedPage);  // Use pushState for cleaner URLs

                if (loadedPage === 'contact') { 
                    const form = document.getElementById('contact-form');
                    if (form) {
                        form.addEventListener('submit', handleSubmit);
                    } else {
                        console.error("Contact form not found after loading contact.html");
                    }
                }

            } else {
                console.warn("No #page-content found in loaded HTML. Check your page template: " + page + ".html");
                contentDiv.innerHTML = html; 
            }
        })
      .catch(error => {
            console.error("Error loading page:", error);
            contentDiv.innerHTML = "<p>Error loading page.</p>";
        });
}


function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert('Form submitted!');
}

hamburger.addEventListener('click', () => {
    navUl.style.display = navUl.style.display === 'block' ? 'none' : 'block';
});



