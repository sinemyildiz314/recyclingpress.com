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
const questions = [
    { 
      question: "Recycling arrows on a container mean it is definitely recyclable?", 
      options: ["Yes", "No"], 
      answer: "No", 
      explanation: "The recycling arrows indicate the type of plastic, but not all plastics are recyclable in every area. Always check local guidelines."
    },
    { 
      question: "Containers must be squeaky clean to be recycled?", 
      options: ["Yes", "No"], 
      answer: "No", 
      explanation: "Containers should be free of excess food, but they don’t need to be spotless. Rinsing them lightly is enough."
    },
    { 
      question: "Even if an item shouldn't go in the bin, it will get sorted anyway?", 
      options: ["Yes", "No"], 
      answer: "No", 
      explanation: "Incorrectly placed items can contaminate entire batches of recycling, causing them to be discarded as trash."
    },
    { 
      question: "All types of glass bottles and jars are not recyclable?", 
      options: ["Yes", "No"], 
      answer: "Yes", 
      explanation: "Some glass, like Pyrex or ceramics, is not recyclable in standard bins. Only specific glass bottles and jars are accepted."
    },
    { 
      question: "Aerosol cans are acceptable in the recycle bin?", 
      options: ["Yes", "No"], 
      answer: "Yes", 
      explanation: "Most aerosol cans are recyclable, but they should be empty before disposal. Check with local guidelines."
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  let explanationIndex = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
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
        label.prepend(input);
        
        optionsContainer.appendChild(label);
    });
  }
  
  function nextQuestion() {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (!selectedOption) {
      alert("Please select an answer before proceeding.");
      return;
    }
    
    saveAnswer(selectedOption.value);
  }
  
  function saveAnswer(selectedValue) {
    if (selectedValue === questions[currentQuestionIndex].answer) {
        score++;
    }
  
    userAnswers.push({
      question: questions[currentQuestionIndex].question,
      selected: selectedValue,
      correct: questions[currentQuestionIndex].answer,
      explanation: questions[currentQuestionIndex].explanation
    });
  
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
    if (score === questions.length) {
        message = "🎉 Congrats! Perfect Score! 🎉";
        launchConfetti();
    } else if (score >= 3) {
        message = "Great Job!";
    } else {
        message = "Try Again!";
    }
  
    document.getElementById("resultMessage").innerText = message;
    document.getElementById("resultScore").innerText = `Your score: ${score} / ${questions.length}`;
  }
  
  function launchConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
        if (Date.now() > animationEnd) {
            clearInterval(interval);
            return;
        }
        confetti({
            particleCount: 5,
            spread: 80,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
    }, 100);
  }
  
  function openExplanationPopup() {
    explanationIndex = 0;
    document.getElementById("quizResultPopup").style.display = "none";
    document.getElementById("explanationPopup").style.display = "flex";
    showExplanation();
  }
  
  function showExplanation() {
    const explanationContainer = document.getElementById("explanationContent");
    const question = questions[explanationIndex];
    const userAnswer = userAnswers[explanationIndex] || { selected: "Not Answered" };
  
    explanationContainer.innerHTML = `
      <h3>Question ${explanationIndex + 1}</h3>
      <p><strong>Q:</strong> ${question.question}</p>
      <p><strong>Your Answer:</strong> ${userAnswer.selected} ${userAnswer.selected === question.answer ? "✅" : "❌"}</p>
      <p><strong>Correct Answer:</strong> ${question.answer}</p>
      <p><strong>Explanation:</strong> ${question.explanation}</p>
    `;
  }
  
  function nextExplanation() {
    if (explanationIndex < questions.length - 1) {
      explanationIndex++;
      showExplanation();
    } else {
      closeExplanationPopup();
    }
  }
  
  function closeExplanationPopup() {
    document.getElementById("explanationPopup").style.display = "none";
    document.getElementById("quizResultPopup").style.display = "flex";
  }
  
  function closeQuiz() {
    document.getElementById("quizPopup").style.display = "none";
    document.getElementById("quizResultPopup").style.display = "none";
    document.getElementById("explanationPopup").style.display = "none";
  }
  
  function replayQuiz() {
    closeQuiz();
    startQuiz();
  }


// Function to handle dropdown toggling
function setupDropdowns() {
    const dropdownLinks = document.querySelectorAll("nav li[aria-haspopup='true'] > a");

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevents page jumping

            const dropdownMenu = this.nextElementSibling;

            // Close other dropdowns before opening the clicked one
            document.querySelectorAll(".dropdown").forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove("show");
                }
            });

            // Toggle dropdown visibility
            dropdownMenu.classList.toggle("show");

            // Toggle arrow rotation
            this.querySelector("i").classList.toggle("fa-rotate-180");
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest("nav")) {
            document.querySelectorAll(".dropdown").forEach(menu => menu.classList.remove("show"));
            document.querySelectorAll("nav li[aria-haspopup='true'] > a i").forEach(icon => icon.classList.remove("fa-rotate-180"));
        }
    });
}


//DOM 
document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM is fully loaded');
  // Run dropdown function if dropdowns exist
  if (document.querySelector("nav li[aria-haspopup='true'] > a")) {
    setupDropdowns();
}
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
});

