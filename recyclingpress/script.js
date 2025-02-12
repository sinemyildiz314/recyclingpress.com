function toggleMenu() {
    const menu = document.getElementById("main-menu");
    menu.classList.toggle("show");

    const hamburger = document.querySelector('.hamburger');
    const isExpanded = menu.classList.contains('show');
    hamburger.setAttribute('aria-expanded', isExpanded);
}

// Function to handle the contact form
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


// The Game Logic
let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const result = document.getElementById('result');
let score = 0;

questions[currentQuestion].classList.add('show');

function checkAnswers() {
  const answers = {
    q1: ['b'],
    q2: ['b']
  };

  for (let q in answers) {
    const selectedAnswers = document.querySelectorAll(`input[name="${q}"]:checked`);
    const selectedValues = Array.from(selectedAnswers).map(input => input.value);

    if (selectedValues.length === answers[q].length && selectedValues.every((value, index) => value === answers[q][index])) {
      score++;
    }
  }

  const currentQuestionInputs = questions[currentQuestion].querySelectorAll('input');
  currentQuestionInputs.forEach(input => input.disabled = true);

  setTimeout(showNextQuestion, 1000);
}

function showNextQuestion() {
  questions[currentQuestion].classList.remove('show');

  const currentQuestionInputs = questions[currentQuestion].querySelectorAll('input');
  currentQuestionInputs.forEach(input => {
    input.checked = false;
    input.disabled = false;
  });

  currentQuestion++;

  if (questions[currentQuestion]) {
    questions[currentQuestion].classList.add('show');
  } else {
    showResultMessage();
  }
}

function showResultMessage() {
  const answers = {
    q1: ['b'],
    q2: ['b']
  };
  const totalQuestions = Object.keys(answers).length;
  const percentage = (score / totalQuestions) * 100;

  let message = "";
  if (percentage >= 80) {
    message = "Congratulations! You did great!";
  } else if (percentage >= 50) {
    message = "Not bad! You can do better!";
  } else {
    message = "Try again! You can do it!";
  }

  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-content">
      <h2>${message}</h2>
      <p>Your score is ${score} out of ${totalQuestions}.</p>
      <button class="close-button">Close</button>
      <button class="replay-button">Replay</button>
    </div>
  `;
  document.body.appendChild(popup);

  const closeButton = popup.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    popup.remove();
  });

  const replayButton = popup.querySelector('.replay-button');
  replayButton.addEventListener('click', () => {
    // Reset the quiz
    currentQuestion = 0;
    score = 0;
    questions.forEach(question => {
      question.classList.remove('show');
    });
    questions[currentQuestion].classList.add('show');

    // Remove the pop-up
    popup.remove();
  });

  const data = {
    score: score,
    percentage: percentage,
    message: message
  };
  console.log("Quiz data:", data);
  localStorage.setItem("quizData", JSON.stringify(data));
}




//DOM 

document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM is fully loaded');
        
    // Newsletter signup animation 
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

    // Newsletter Page Slider
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

    

    newsSlider();
    contactForm();
    // checkAnswers();

});