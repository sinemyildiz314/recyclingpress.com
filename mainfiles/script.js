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

    // Dropdown functionality (TBD, I will ask at the Saturday class, it still not working )
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    const dropdownMenus = document.querySelectorAll('.dropdown ul');


    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const parentDropdown = link.parentElement;
            const subMenu = parentDropdown.querySelector('ul');

            if (subMenu) {
                subMenu.classList.toggle('show');

                dropdownMenus.forEach(otherMenu => {
                    if (otherMenu !== subMenu && otherMenu.classList.contains('show')) {
                        otherMenu.classList.remove('show');
                    }
                });
            }
        });
    });
});
