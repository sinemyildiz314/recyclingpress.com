//Fade-in animation on page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = 0; 
    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease-in-out"; 
        document.body.style.opacity = 1; 
    }, 100); 

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
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

});

    // Article Slider

    const newsSlider = document.querySelector('.news-slider');
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
    });

    sliderPrev.addEventListener('click', () => {
        currentPosition = Math.max(currentPosition - itemWidth, 0);
        newsSlider.style.transform = `translateX(-${currentPosition}px)`;
    });
