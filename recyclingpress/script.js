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
// ✅ Confetti Animation (Triggers for a perfect score)
function launchConfetti() {
  const duration = 3 * 1000; // Confetti animation lasts 3 seconds
  const end = Date.now() + duration;

  (function frame() {
      confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
      });
      confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
      });

      if (Date.now() < end) {
          requestAnimationFrame(frame);
      }
  })();
}

const questions = [
  { question: "Recycling arrows on a container mean it is definitely recyclable?", options: ["Yes", "No"], answer: "No" },
  { question: "Containers must be squeaky clean to be recycled?", options: ["Yes", "No"], answer: "No" },
  { question: "Even if an item shouldn't go in the bin, it will get sorted anyway?", options: ["Yes", "No"], answer: "No" },
  { question: "All types of glass bottles and jars are not recyclable?", options: ["Yes", "No"], answer: "Yes" },
  { question: "Aerosol cans are acceptable in the recycle bin?", options: ["Yes", "No"], answer: "Yes" }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quizPopup").style.display = "flex";
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("quizQuestion").innerText = question.question;

  const optionsContainer = document.getElementById("quizOptions");
  optionsContainer.innerHTML = "";
  
  question.options.forEach(option => {
      const label = document.createElement("label");
      label.innerText = option;
      
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quizOption";
      input.value = option;
      input.onclick = () => nextQuestion(input.value); // Moves to next question automatically
      
      label.prepend(input);
      optionsContainer.appendChild(label);
  });
}

function nextQuestion(selectedValue) {
  if (selectedValue === questions[currentQuestionIndex].answer) {
      score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      showResult();
  }
}

function showResult() {
  document.getElementById("quizPopup").style.display = "none";
  document.getElementById("quizResultPopup").style.display = "flex";

  let message;
  if (score === 5) {
      message = "🎉 Congrats! Perfect Score! 🎉";
      launchConfetti(); // 🎊 Start confetti animation if the user scores 5/5
  } else if (score >= 3) {
      message = "Great Job!";
  } else {
      message = "Try Again!";
  }

  document.getElementById("resultMessage").innerText = message;
  document.getElementById("resultScore").innerText = `Your score: ${score} / ${questions.length}`;

  saveUserData(score, message);
}

/* Save User Data to Local & Session Storage */
function saveUserData(score, message) {
  const timestamp = new Date().toLocaleString();

  const userData = {
      score: score,
      message: message,
      timestamp: timestamp
  };

  // Save the latest user data in session storage (clears when tab closes)
  sessionStorage.setItem("quizSession", JSON.stringify(userData));

  // Save the full quiz history in local storage (persists even after browser closes)
  let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
  quizHistory.push(userData);
  localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

  // Console log for debugging and data retrieval
  console.log("Latest Quiz Attempt:", userData);
  console.log("Full Quiz History:", quizHistory);
}

/* Retrieve Saved User Data */
function getUserData() {
  console.log("Session Data (Current Attempt):", JSON.parse(sessionStorage.getItem("quizSession")));
  console.log("Local Storage Data (All Attempts):", JSON.parse(localStorage.getItem("quizHistory")));
}

/* Replay Quiz (Resets and Starts Again) */
function replayQuiz() {
  document.getElementById("quizResultPopup").style.display = "none";
  startQuiz();
}

function closeQuiz() {
  document.getElementById("quizPopup").style.display = "none";
  document.getElementById("quizResultPopup").style.display = "none";
}

document.querySelector(".replay-button").addEventListener("click", replayQuiz);


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

