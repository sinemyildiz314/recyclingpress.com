function toggleMenu() {
    const menu = document.getElementById("main-menu");
    menu.classList.toggle("show");

    const hamburger = document.querySelector('.hamburger');
    const isExpanded = menu.classList.contains('show');
    hamburger.setAttribute('aria-expanded', isExpanded);
}

function newsSlider() {
    const newsSliderContainer = document.querySelector('.section.news-slider');
    if (newsSliderContainer) {
        const newsSlider = document.querySelector('div.news-slider');
        const sliderPrev = document.querySelector('.slider-prev');
        const sliderNext = document.querySelector('.slider-next');
        const newsItems = document.querySelectorAll('.news-slider .news-item');
        let currentPosition = 0;
        let itemWidth = newsItems[0].offsetWidth;

        window.addEventListener('resize', () => {
            itemWidth = newsItems[0].offsetWidth;
        });

        sliderNext.addEventListener('click', () => {
            const maxPosition = (newsItems.length - 1) * itemWidth;
            currentPosition = Math.min(currentPosition + itemWidth, maxPosition);
            newsSlider.style.transform = `translateX(-${currentPosition}px)`;
            console.log("sliderNext", currentPosition);
        });

        sliderPrev.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - itemWidth, 0);
            newsSlider.style.transform = `translateX(-${currentPosition}px)`;
            console.log("sliderPrev", currentPosition);
        });
    }
}

function contactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // --- Local Storage ---
            const formData = { name, email, message };
            localStorage.setItem('contactFormData', JSON.stringify(formData));
            console.log('Saved to local storage:', formData);


            // --- Console Logging ---
            console.log("Contact Form Data:");
            console.log(JSON.stringify({ name, email, message }, null, 2)); 

            // --- "Live" Storage (Placeholder - Requires Backend) ---
            fetch('192.168.1.83', {  // Replace with your server endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data sent to server:', data);
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error sending data to server:', error);
                    alert('An error occurred. Please try again later.'); // User-friendly message
                });

        });
    }
}


// Newsletter signup animation 
document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM is fully loaded');
        const newsletterSignup = document.getElementById('newsletter-signup');
        const newsletterEmail = document.getElementById('newsletter-email');
        const newsletterSubscribe = document.getElementById('newsletter-subscribe');
        const newsletterMessage = document.getElementById('newsletter-message');
    
        if (newsletterSignup) {
            console.log('Newsletter signup element found');
            setTimeout(() => {
                newsletterSignup.classList.add('show');
            }, 2000);
    
            newsletterSubscribe.addEventListener('click', () => {
                console.log('Subscribe button clicked');
                const email = newsletterEmail.value;
                console.log('Email value:', email);
    
                if (email.includes('@')) {
                    console.log('Email is valid');
                    newsletterMessage.textContent = "Thank you for subscribing!";
                    newsletterMessage.style.color = "green";
                    newsletterEmail.value = "";
                } else {
                    console.log('Email is not valid');
                    newsletterMessage.textContent = "Please enter a valid email address.";
                    newsletterMessage.style.color = "red";
                }
            });
        }
    


    // Event Hover 
    const events = document.querySelectorAll('.event');
    events.forEach(event => {
        event.addEventListener('mouseover', () => {
            console.log("hover")
        });
    });

    // Fade-in animation 
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease-in-out";
        document.body.style.opacity = 1;
    }, 100);

    newsSlider();
    contactForm();
});