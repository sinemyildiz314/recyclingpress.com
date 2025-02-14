/* =====================
   Navigation 
===================== */
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

// Function to Manage Search Toggle Behaviour
function setupSearchToggle() {
  const searchToggle = document.querySelector(".search-toggle");
  const searchBar = document.querySelector(".search-bar");
  const searchClose = document.querySelector(".search-close");
  const navRight = document.querySelector(".nav-right");
  const navbarSocialIcons = document.querySelector(".social-media-nav");

  if (searchToggle && searchBar) {
      searchToggle.addEventListener("click", () => {
          searchBar.style.display = "flex";
          navRight.classList.add("search-active");
          searchToggle.style.display = "none";

          // Hide Social Media Icons when the search bar is active
          if (navbarSocialIcons) {
              navbarSocialIcons.style.opacity = "0";
              navbarSocialIcons.style.pointerEvents = "none";
          }
      });

      // Close Search Bar & Show Social Icons Again
      if (searchClose) {
          searchClose.addEventListener("click", () => {
              searchBar.style.display = "none";
              navRight.classList.remove("search-active");
              searchToggle.style.display = "block";

              if (navbarSocialIcons) {
                  navbarSocialIcons.style.opacity = "1";
                  navbarSocialIcons.style.pointerEvents = "auto";
              }
          });
      }
  }
}

// Function to Manage FLoating Share Buttons
function setupShareToggle() {
  const shareButton = document.querySelector(".share-toggle-btn");
  if (shareButton) {
      shareButton.addEventListener("click", () => {
          const shareGroup = document.querySelector(".share-btn-group");
          if (shareGroup) {
              shareGroup.classList.toggle("show");
          }
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


/* =====================
   Industry Page JavaScript 
===================== */


/*********************
 Hero Section (Image Slider)
*********************/
let slideIndex = 0;
function showSlides(n) {
  console.log("Showing slide:", n);
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;
  slides.forEach((slide) => (slide.style.display = "none"));
  slides[n].style.display = "block";
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % document.querySelectorAll(".slide").length;
  showSlides(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + document.querySelectorAll(".slide").length) % document.querySelectorAll(".slide").length;
  showSlides(slideIndex);
}

/*********************
 Like & Visit Counter
*********************/
function updateVisitCount(article) {
  let visitCount = article.querySelector(".visit-count");
  if (!visitCount) return;
  let visits = sessionStorage.getItem(article.dataset.article) || 0;
  visits++;
  sessionStorage.setItem(article.dataset.article, visits);
  visitCount.textContent = `👀 ${visits}`;
}

function likeArticle(event) {
  let likeBtn = event.target;
  let likeCount = likeBtn.querySelector(".like-count");
  let articleId = likeBtn.closest(".article").dataset.article;
  let likes = localStorage.getItem(articleId + "-likes") || 0;
  likes++;
  localStorage.setItem(articleId + "-likes", likes);
  likeCount.textContent = likes;
}

/*********************
 Floating Social Share
*********************/
function toggleShareButtons() {
  console.log("Toggling share buttons");
  const shareGroup = document.querySelector(".share-btn-group");
  if (shareGroup) shareGroup.classList.toggle("show");
}

/*********************
 Feedback Form
*********************/
function toggleFeedbackForm() {
  const feedbackForm = document.querySelector(".feedback-form");
  feedbackForm.classList.toggle("hidden");
}

function submitFeedback() {
  alert("Thank you for your feedback!");
  document.querySelector(".feedback-form").classList.add("hidden");
}

/*********************
 Search Functionality
*********************/
function searchFunction() {
  let input = document.getElementById("search-input").value.toLowerCase().trim();
  let allTextElements = document.querySelectorAll("h1, h2, h3, p"); // Search inside all relevant tags
  let resultContainer = document.getElementById("search-results");

  // Clear previous results
  resultContainer.innerHTML = "";
  resultContainer.style.display = "none";

  if (input.length === 0) {
      return;
  }

  let foundResults = [];

  allTextElements.forEach(element => {
      let text = element.textContent.toLowerCase();
      let parentElement = element.closest("article, section, div"); // Get closest wrapper
      let linkElement = parentElement ? parentElement.querySelector("a") : null;
      let articleLink = linkElement ? linkElement.href : "#"; // Get link if available

      if (text.includes(input)) {
          foundResults.push({ text: element.textContent, articleLink });
      }
  });

  // Display results or show "No Results"
  if (foundResults.length > 0) {
      foundResults.forEach(result => {
          let resultItem = document.createElement("div");
          resultItem.classList.add("search-result-item");
          resultItem.innerHTML = `<a href="${result.articleLink}">${result.text.substring(0, 100)}...</a>`;
          resultContainer.appendChild(resultItem);
      });
      resultContainer.style.display = "block";
  } else {
      resultContainer.innerHTML = "<p class='no-results'>No results found.</p>";
      resultContainer.style.display = "block";
  }

  // **🔹 Hide results after 5 seconds**
  setTimeout(() => {
      resultContainer.style.display = "none";
  }, 5000);
}

/*********************
 Flowing Water Animation
*********************/
function startWaterAnimation() {
  const canvas = document.getElementById("waterCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = 300;
  canvas.height = 100;

  let waveOffset = 0;

  function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 123, 255, 0.5)";

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
          let y =
              20 * Math.sin((x + waveOffset) * 0.05) + 40; // Creates wave motion
          ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      waveOffset += 2;
      requestAnimationFrame(drawWave);
  }

  drawWave();
}

/*********************
 Recycling Sorting Game
*********************/
document.addEventListener("DOMContentLoaded", function () {
  const wasteItems = document.querySelectorAll(".draggable");
  const bins = document.querySelectorAll(".bin");
  const gameMessage = document.getElementById("game-message");

  wasteItems.forEach(item => {
      item.draggable = true;

      item.addEventListener("dragstart", function (event) {
          event.dataTransfer.setData("wasteType", item.dataset.type);
      });
  });

  bins.forEach(bin => {
      bin.addEventListener("dragover", function (event) {
          event.preventDefault();
      });

      bin.addEventListener("drop", function (event) {
          event.preventDefault();
          const wasteType = event.dataTransfer.getData("wasteType");

          if (wasteType === bin.dataset.type) {
              gameMessage.textContent = "✅ Correct! Good job!";
              gameMessage.style.color = "green";

              // Remove item after sorting
              document.querySelector(`img[data-type="${wasteType}"]`).remove();
          } else {
              gameMessage.textContent = "❌ Wrong bin! Try again.";
              gameMessage.style.color = "red";
          }

          setTimeout(() => {
              gameMessage.textContent = "";
          }, 2000);
      });
  });
});




/*********************
 Event Listeners (Inside DOMContentLoaded)
*********************/
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");
  
  // Navigation Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
      hamburger.addEventListener("click", toggleMenu);
  }

    // Ensure search function triggers when typing
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("keyup", searchFunction);
    }

    setupSearchToggle();
    setupShareToggle();
  
  console.log("Initializing Industry Category Animations...");
    
    startWaterAnimation();
    startRecyclingGame();

  // Image Slider Controls
  if (document.querySelector(".slide")) {
      showSlides(slideIndex);
  }
  if (document.querySelector(".prev")) {
      document.querySelector(".prev").addEventListener("click", prevSlide);
  }
  if (document.querySelector(".next")) {
      document.querySelector(".next").addEventListener("click", nextSlide);
  }

  // Like & Visit Counter
  document.querySelectorAll(".article").forEach(article => updateVisitCount(article));
  document.querySelectorAll(".like-btn").forEach(btn => btn.addEventListener("click", likeArticle));

  // Social Share Toggle
  const shareButton = document.querySelector(".share-toggle-btn");
  if (shareButton) {
      shareButton.addEventListener("click", toggleShareButtons);
  }


  // Feedback Form
  if (document.querySelector(".feedback-btn")) {
      document.querySelector(".feedback-btn").addEventListener("click", toggleFeedbackForm);
  }
  if (document.querySelector(".feedback-form button")) {
      document.querySelector(".feedback-form button").addEventListener("click", submitFeedback);
  }
  
  console.log("All event listeners added successfully!");

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
