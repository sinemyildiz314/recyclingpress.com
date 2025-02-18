/* =====================
   Navigation 
===================== */
function toggleMenu() {
    const menu = document.getElementById("main-menu");
    const hamburger = document.querySelector(".hamburger");

    if (!menu) {
        console.error("❌ Menu element (#main-menu) not found!");
        return;
    }
    if (!hamburger) {
        console.error("❌ Hamburger button not found!");
        return;
    }

    // Toggle menu visibility
    menu.classList.toggle("show");

    // Update ARIA attribute for accessibility
    const isExpanded = menu.classList.contains("show");
    hamburger.setAttribute("aria-expanded", isExpanded);

    console.log(`🔄 Menu toggled: ${isExpanded ? "Opened" : "Closed"}`);
}

// To Ensure the hamburger button ALWAYS Gets an Event Listener !!
function initializeHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");

    if (!hamburger) {
        console.error("❌ Hamburger button not found!");
        return;
    }

    // Add click event listener
    hamburger.addEventListener("click", toggleMenu);

    console.log("✅ Hamburger menu initialized!");
}

// Ensure the function runs after the DOM is fully loaded
if (document.readyState !== "loading") {
    initializeHamburgerMenu();
} else {
    document.addEventListener("DOMContentLoaded", initializeHamburgerMenu);
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
  
  /* =====================
    Launch Confetti 🎉
  ===================== */
  function launchConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
        if (Date.now() > animationEnd) {
            clearInterval(interval);
            return;
        }
        confetti({ particleCount: 5, spread: 80, origin: { x: Math.random(), y: Math.random() - 0.2 } });
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
    setTimeout(() => {  // Delay execution to wait for elements to be ready
        const dropdownLinks = document.querySelectorAll("nav li[aria-haspopup='true'] > a");

        if (dropdownLinks.length === 0) {
            console.warn("⚠️ No dropdowns found - Retrying in 500ms...");
            setTimeout(setupDropdowns, 500); // Retry again if dropdowns aren't ready
            return;
        }

        dropdownLinks.forEach(link => {
            link.removeEventListener("click", toggleDropdown); // Prevent duplicate listeners
            link.addEventListener("click", toggleDropdown);
        });

        console.log("✅ Dropdowns initialized on all pages!");
    }, 100); // Short delay to allow page to load
}

// Function to toggle dropdowns
function toggleDropdown(event) {
    event.preventDefault();

    const dropdownMenu = this.nextElementSibling;
    
    // Close all other dropdowns
    document.querySelectorAll(".dropdown").forEach(menu => {
        if (menu !== dropdownMenu) menu.classList.remove("show");
    });

    dropdownMenu.classList.toggle("show");
}

// Ensure dropdowns initialize
if (document.readyState !== "loading") {
    setupDropdowns();
} else {
    document.addEventListener("DOMContentLoaded", setupDropdowns);
}



/* =====================
   Industry Page JavaScript 
===================== */
/* ===========================
   🌍 HERO SLIDER FUNCTION (MODULAR)
=========================== */
function initImageSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let interval;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
      });
      dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
      });
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
  }

  function goToSlide(index) {
      currentIndex = index;
      showSlide(currentIndex);
  }

  // Auto-slide functionality
  function startAutoSlide() {
      interval = setInterval(nextSlide, 5000); // Change slide every 5s
  }

  // Stop auto-slide on interaction
  function stopAutoSlide() {
      clearInterval(interval);
  }

  // Event Listeners for Dots
  dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
          stopAutoSlide();
          goToSlide(index);
          startAutoSlide();
      });
  });

  // Initialize Slider
  showSlide(currentIndex);
  startAutoSlide();
}

/*********************
 Flip Cards
*********************/

// 🎯 Function to Track User Interactions (Hover & Clicks)
function trackUserInteractions() {
  let hoverLogs = JSON.parse(localStorage.getItem("hoverLogs")) || [];
  let clickLogs = JSON.parse(localStorage.getItem("clickLogs")) || [];

  document.body.addEventListener("mousemove", (event) => {
      hoverLogs.push({ x: event.clientX, y: event.clientY, time: new Date().toISOString() });
      localStorage.setItem("hoverLogs", JSON.stringify(hoverLogs));
  });

  document.body.addEventListener("click", (event) => {
      clickLogs.push({ x: event.clientX, y: event.clientY, time: new Date().toISOString() });
      localStorage.setItem("clickLogs", JSON.stringify(clickLogs));
  });

  console.log("📊 User interactions tracking enabled.");
}

function downloadUserInteractionData() {
  let hoverData = JSON.parse(localStorage.getItem("hoverLogs")) || [];
  let clickData = JSON.parse(localStorage.getItem("clickLogs")) || [];

  let data = { hoverData, clickData };
  let jsonData = JSON.stringify(data, null, 2);
  let blob = new Blob([jsonData], { type: "application/json" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "user_interactions.json"; // File Name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log("✅ User interaction data has been downloaded.");
}



// ✅ Recycling Sorting Game - Restored Drag & Drop Functionality
function startRecyclingGame() {
  console.log("♻️ Initializing Recycling Sorting Game...");

  const wasteItems = document.querySelectorAll(".draggable");
  const bins = document.querySelectorAll(".bin");
  const gameMessage = document.getElementById("game-message");

  let correctCount = 0;
  const totalItems = wasteItems.length;

  // Enable Dragging for Waste Items
  wasteItems.forEach(item => {
      item.draggable = true;
      item.addEventListener("dragstart", event => {
          event.dataTransfer.setData("wasteType", item.dataset.type);
      });
  });

  // Enable Bins to Accept Waste Items
  bins.forEach(bin => {
      bin.addEventListener("dragover", event => event.preventDefault());

      bin.addEventListener("drop", event => {
          event.preventDefault();
          const wasteType = event.dataTransfer.getData("wasteType");

          if (wasteType === bin.dataset.type) {
              gameMessage.textContent = "✅ Correct! Good job!";
              gameMessage.style.color = "green";

              // Remove the item when correctly sorted
              document.querySelector(`img[data-type="${wasteType}"]`).remove();
              correctCount++;

              if (correctCount === totalItems) {
                  launchConfetti();
                  gameMessage.textContent = "🎉 You sorted all items correctly!";
              }
          } else {
              gameMessage.textContent = "❌ Wrong bin! Try again.";
              gameMessage.style.color = "red";
          }

          setTimeout(() => { gameMessage.textContent = ""; }, 2000);
      });
  });
}

// ✅ Launch Confetti When Game is Completed
function launchConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
          clearInterval(interval);
          return;
      }
      confetti({ particleCount: 5, spread: 80, origin: { x: Math.random(), y: Math.random() - 0.2 } });
  }, 100);
}

  // **Newsletter Signup Animation**
  function initializeNewsletterSignup() {
    const newsletterSignup = document.getElementById("newsletter-signup");

    if (!newsletterSignup) {
        console.error("❌ Newsletter signup container not found.");
        return;
    }

    console.log("📧 Newsletter signup element found");

    // Show the newsletter signup after 2 seconds
    setTimeout(() => newsletterSignup.classList.add("show"), 2000);

    // Get elements
    const subscribeButton = document.getElementById("newsletter-subscribe");
    const emailInput = document.getElementById("newsletter-email");
    const message = document.getElementById("newsletter-message");

    if (!subscribeButton || !emailInput || !message) {
        console.error("❌ Missing one or more newsletter elements.");
        return;
    }

    // Attach event listener to the subscribe button
    subscribeButton.addEventListener("click", function () {
        const email = emailInput.value.trim();

        // ✅ Improved Email Validation using RegExp
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            message.textContent = "✅ Thank you for subscribing!";
            message.style.color = "green";
            emailInput.value = "";  // Clear input field after success
        } else {
            message.textContent = "❌ Please enter a valid email address.";
            message.style.color = "red";
        }

        // Ensure message is visible
        message.style.display = "block";
        console.log(`📩 Subscription attempt: ${email}`);
    });
}

/*********************
 1) MAIN DOM: Event Listeners (Optimized & Merged)
*********************/
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM fully loaded");
  // **🚀 Now Start Recycling Sorting Game**
  startRecyclingGame(); // 
  
     //Image SLider
     initImageSlider();

     initializeNewsletterSignup();

    // ✅ Initialize AOS animations
    AOS.init();

    // ✅ Initialize hover effects on team members
    setupTeamMemberHoverEffects();

    // **Dropdown Menu Setup**
    setupDropdowns();

    // ✅ Setup User Interaction Tracking (Hover & Click)
    trackUserInteractions(); 

  // **🚀 Now Start Recycling Sorting Game**
  startRecyclingGame(); // ✅ Place it AFTER setting up other UI elements
  

  // **Event Hover Effect**
  document.querySelectorAll(".event").forEach(event => {
      event.addEventListener("mouseover", () => console.log("🎭 Hovered over event"));
  });

  // **Fade-in Page Animation**
  document.body.style.opacity = 0;
  setTimeout(() => {
      document.body.style.transition = "opacity 1s ease-in-out";
      document.body.style.opacity = 1;
  }, 100);

  // **Newsletter Page Slider**
  newsSlider();

  // **Contact Form Handler**
  contactForm();

  //** FeedBack Form */
  initializeFeedbackForm();

  // Initialize the share button
    createExpandableShareButton();


  console.log("✅ All event listeners successfully added!");

});

/*********************
2) Second DOM: Likes & Views counter 
*********************/
document.addEventListener("DOMContentLoaded", function () {
  // Function to handle the like button click
  function handleLikeButtonClick(event) {
      const likeBtn = event.currentTarget;
      const quoteElement = likeBtn.closest(".quote");
      const quoteId = quoteElement.getAttribute("data-quote");
      const likeCountElement = likeBtn.querySelector(".like-count");

      // Retrieve the current like count from localStorage
      let likeCount = parseInt(localStorage.getItem(`likeCount-${quoteId}`)) || 0;

      // Increment the like count
      likeCount++;

      // Update the like count in localStorage
      localStorage.setItem(`likeCount-${quoteId}`, likeCount);

      // Update the like count in the UI
      likeCountElement.textContent = likeCount;
  }

  // Function to handle the visit count
  function handleVisitCount(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const quoteElement = entry.target;
              const quoteId = quoteElement.getAttribute("data-quote");
              const visitCountElement = quoteElement.querySelector(".visit-count");

              // Retrieve the current visit count from sessionStorage
              let visitCount = parseInt(sessionStorage.getItem(`visitCount-${quoteId}`)) || 0;

              // Increment the visit count
              visitCount++;

              // Update the visit count in sessionStorage
              sessionStorage.setItem(`visitCount-${quoteId}`, visitCount);

              // Update the visit count in the UI
              visitCountElement.textContent = `👀 ${visitCount}`;

              // Unobserve the element after counting
              observer.unobserve(quoteElement);
          }
      });
  }

  // Set up the Intersection Observer for visit counting
  const observer = new IntersectionObserver(handleVisitCount, { threshold: 0.5 });

  // Attach event listeners to like buttons and observe quotes for visit counting
  document.querySelectorAll(".quote").forEach(quoteElement => {
      // Observe the quote element for visit counting
      observer.observe(quoteElement);

      // Attach click event listener to the like button
      const likeBtn = quoteElement.querySelector(".like-btn");
      const quoteId = quoteElement.getAttribute("data-quote");
      const likeCountElement = likeBtn.querySelector(".like-count");

      // Retrieve and display the current like count from localStorage
      let likeCount = parseInt(localStorage.getItem(`likeCount-${quoteId}`)) || 0;
      likeCountElement.textContent = likeCount;

      likeBtn.addEventListener("click", handleLikeButtonClick);
  });
});

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

/*********************
Search  function design
*********************/
// Function to Handle Search Functionality
function searchFunction() {
  const input = document.getElementById("search-input").value.toLowerCase().trim();
  const allTextElements = document.querySelectorAll("h1, h2, h3, p");
  const resultContainer = document.getElementById("search-results");

  resultContainer.innerHTML = "";
  resultContainer.style.display = "none";

  if (!input) return;

  const foundResults = [];
  allTextElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes(input)) {
          foundResults.push({
              text: element.textContent.substring(0, 100) + "...",
              link: "#" // Placeholder link; update with actual URL if available
          });
      }
  });

  if (foundResults.length > 0) {
      foundResults.forEach(result => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("search-result-item");
          resultItem.innerHTML = `<a href="${result.link}">${result.text}</a>`;
          resultContainer.appendChild(resultItem);
      });
      resultContainer.style.display = "block";
  } else {
      resultContainer.innerHTML = "<p class='no-results'>No results found.</p>";
      resultContainer.style.display = "block";
  }

  // Hide the results after 5 seconds
  setTimeout(() => {
      resultContainer.style.display = "none";
  }, 5000);
}

// Initialize Everything - Search Button
document.addEventListener("DOMContentLoaded", function () {
  setupSearchToggle();

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
      searchInput.addEventListener("keyup", searchFunction);
  }
});

//ends..//

/*********************
FEEDBACK BUTTON function design
*********************/
// Feedback Form Initialization
function initializeFeedbackForm() {
  const feedbackBtn = document.querySelector(".feedback-btn");
  const feedbackForm = document.querySelector(".feedback-form");
  const feedbackContainer = document.querySelector(".feedback-form-container");

  if (feedbackBtn && feedbackForm && feedbackContainer) {
      feedbackForm.style.display = "none";

      feedbackBtn.addEventListener("click", function () {
          feedbackBtn.style.display = "none";
          feedbackForm.style.display = "block";
      });

      const formElement = feedbackForm.querySelector("form");
      formElement.addEventListener("submit", function (event) {
          event.preventDefault();
          const feedbackText = document.getElementById("feedbackText").value;
          console.log("Feedback submitted:", feedbackText);

          const thankYouMessage = document.createElement("p");
          thankYouMessage.textContent = "Thank you for your feedback!";
          thankYouMessage.style.color = "rgb(202, 86, 33)";
          thankYouMessage.style.fontWeight = "bold";
          thankYouMessage.style.marginTop = "10px";
          feedbackContainer.appendChild(thankYouMessage);

          formElement.reset();
          feedbackForm.style.display = "none";

          setTimeout(() => {
              feedbackContainer.removeChild(thankYouMessage);
              feedbackBtn.style.display = "block";
          }, 3000);
      });
  } else {
      console.error("Feedback form elements not found in the DOM.");
  }
}

// Ensure the function runs after the DOM is fully loaded
if (document.readyState !== 'loading') {
  initializeFeedbackForm();
} else {
  document.addEventListener('DOMContentLoaded', initializeFeedbackForm);
}

//ends..//

/*********************
SHARE BUTTON function design
*********************/

function createExpandableShareButton() {
  // Check if the DOM is already loaded
  if (document.readyState !== 'loading') {
      initializeShareButton();
  } else {
      document.addEventListener('DOMContentLoaded', initializeShareButton);
  }
}

function initializeShareButton() {
    const container = document.getElementById('share-container');
    if (!container) {
        console.error('Share container element not found.');
        return;
    }

    // HTML structure for the expandable button
    container.innerHTML = `
        <div class="share-container">
            <div class="share-button" id="share-btn">➕</div>
            <div class="share-options">
                <a href="#" target="_blank" data-platform="facebook" title="Share on Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" target="_blank" data-platform="twitter" title="Share on Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" target="_blank" data-platform="linkedin" title="Share on LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" target="_blank" data-platform="reddit" title="Share on Reddit">
                    <i class="fab fa-reddit-alien"></i>
                </a>
                <a href="#" target="_blank" data-platform="instagram" title="Share on Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    `;

    const shareContainer = container.querySelector('.share-container');
    const shareButton = container.querySelector('#share-btn');
    const shareLinks = container.querySelectorAll('.share-options a');

    // Toggle Active State on Click
    shareButton.addEventListener('click', () => {
        shareContainer.classList.toggle('active');
        shareButton.textContent = shareContainer.classList.contains('active') ? '✖' : '➕';
    });

    // Handle Social Media Sharing
    shareLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const pageUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);
            
            let shareUrl = '';

            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?url=${pageUrl}&title=${pageTitle}`;
                    break;
                case 'reddit':
                    shareUrl = `https://www.reddit.com/submit?url=${pageUrl}&title=${pageTitle}`;
                    break;
                case 'instagram':
                    alert('Instagram does not support direct web sharing. You can copy the link instead.');
                    return;
                default:
                    return;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Ensure the function runs after the DOM is fully loaded
if (document.readyState !== 'loading') {
    initializeShareButton();
} else {
    document.addEventListener('DOMContentLoaded', initializeShareButton);
}

// ends..//


// ==========================
// 🌍 ABOUT US - PAGE Animations
// ==========================

/**
 * Applies a hover effect to an element by scaling and adding a shadow.
 * @param {HTMLElement} element - The element to apply the effect on.
 */
function addHoverEffect(element) {
    element.style.transform = "scale(1.1)";
    element.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)";
}

/**
 * Removes the hover effect, restoring the original state.
 * @param {HTMLElement} element - The element to restore.
 */
function removeHoverEffect(element) {
    element.style.transform = "scale(1)";
    element.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
}

/**
 * Initializes team member hover effects using event delegation.
 */
function setupTeamMemberHoverEffects() {
    const teamContainer = document.querySelector(".team-container");

    if (teamContainer) {
        teamContainer.addEventListener("mouseover", function (event) {
            const member = event.target.closest(".team-member");
            if (member) addHoverEffect(member);
        });

        teamContainer.addEventListener("mouseout", function (event) {
            const member = event.target.closest(".team-member");
            if (member) removeHoverEffect(member);
        });
    }
}

// ends //

