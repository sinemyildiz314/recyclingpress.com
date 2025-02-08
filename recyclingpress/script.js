function toggleMenu() {
    const menu = document.getElementById("main-menu");
    menu.classList.toggle("show"); // This is fine

    // Toggle aria-expanded attribute for accessibility
    const hamburger = document.querySelector('.hamburger');
    const isExpanded = menu.classList.contains('show');
    hamburger.setAttribute('aria-expanded', isExpanded); 

    // hamburger.classList.toggle('hidden');

    }

        // Article Slider
        function newsSlider() {
            const newsSliderContainer = document.querySelector('.section.news-slider');
            if (newsSliderContainer) {
                const newsSlider = document.querySelector('div.news-slider');
                const sliderPrev = document.querySelector('.slider-prev');
                const sliderNext = document.querySelector('.slider-next');
                const newsItems = document.querySelectorAll('.news-slider .news-item');
                let currentPosition = 0;
                let itemWidth = newsItems[0].offsetWidth; // No margin in this case
            
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
        // Contact form submission
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent default form submission
    
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const message = document.getElementById('message').value;
    
                    if (!name || !email || !message) {
                        alert('Please fill in all fields.');
                        return;
                    }
                    alert('Message sent successfully!');
                    contactForm.reset(); // Clear the form after successful submission
    
                    console.log("Name:", name);
                    console.log("Email:", email);
                    console.log("Message:", message);
                    }); 
            }
  
        }

//Fade-in animation on page load

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = 0; 
    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease-in-out"; 
        document.body.style.opacity = 1; 
    }, 100); 

    newsSlider(); 
    contactForm();

});
    
    