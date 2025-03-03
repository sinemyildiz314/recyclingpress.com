"use strict";

/** =============================
 * ✅ 1) Global Event Listener Optimization
 * ============================= */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM fully loaded - Initializing functions...");

    // ✅ 1. Critical UI Elements (Navigation & Menus)
    initializeHamburgerMenu();  // Ensures navigation works first
    initializeSearchToggle();   // Enables search bar interactions
    setupDropdowns();

    // ✅ 2. User Engagement Features
    initializeFeedbackForm();   // Feedback button form
    initializeShareButton();    // Social media sharing

    // ✅ 3. Interactive Elements (Flip Cards, Games)
    initImageSlider();
    initializeNewsletterSignup();
    initializeFlipCards();      // Ensures flip cards work properly
    initializeRecyclingGame();  // Starts the recycling sorting game
    initializeContactForm();    // Ensure the form works and collects user data
    initializeQuizGame();       // Runs Quiz Game effectively
    setupTeamMemberHoverEffects();

    // ✅ 4. Financial & Market Data (Run only if needed)
      if (document.querySelector(".live-rates")) {
        fetchLiveRates();
        setInterval(fetchLiveRates, 10000);
    }

    // ✅ 5. User Activity Tracking (Hover & Clicks)
    trackUserInteractions();    // Tracks user engagement for analytics

    console.log("✅ All event listeners successfully added!");
});


/** =============================
 * ✅ Hamburger Menu
 * ============================= */
// ✅ Function to ensure event listeners are correctly applied
function initializeHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");

    if (!hamburger) {
        console.error("❌ Hamburger button not found!");
        return;
    }

    // ✅ Attach click event (Desktop)
    hamburger.addEventListener("click", toggleMenu);

    // ✅ Attach touch event (Mobile) to ensure taps work
    hamburger.addEventListener("touchend", (event) => {
        event.preventDefault(); // Prevents unwanted double-tap behavior
        toggleMenu();
    });

    console.log("✅ Hamburger menu initialized!");
}

// ✅ Function that toggles the menu visibility
function toggleMenu() {
    const menu = document.getElementById("main-menu");
    const hamburger = document.querySelector(".hamburger");

    if (!menu || !hamburger) {
        console.error("❌ Menu or hamburger button not found!");
        return;
    }

    // ✅ Toggle menu visibility
    menu.classList.toggle("show");

    // ✅ Update accessibility attribute
    hamburger.setAttribute("aria-expanded", menu.classList.contains("show"));

    console.log(`🔄 Menu toggled: ${menu.classList.contains("show") ? "Opened" : "Closed"}`);
}

/** =============================
 * ✅ Feedback Form
 * ============================= */
// function initializeFeedbackForm() {
//     const feedbackBtn = document.querySelector(".feedback-btn");
//     const feedbackForm = document.querySelector(".feedback-form");
//     const closeBtn = document.querySelector(".close-btn");

//     if (!feedbackBtn || !feedbackForm || !closeBtn) return;
//     feedbackForm.style.display = "none";

//     function toggleFeedbackForm() {
//         feedbackForm.style.display = feedbackForm.style.display === "none" ? "block" : "none";
//         feedbackBtn.style.display = feedbackForm.style.display === "block" ? "none" : "block";
//     }

//     feedbackBtn.addEventListener("click", toggleFeedbackForm);
//     feedbackBtn.addEventListener("touchend", toggleFeedbackForm);
//     closeBtn.addEventListener("click", toggleFeedbackForm);
//     closeBtn.addEventListener("touchend", toggleFeedbackForm);
// }

function initializeFeedbackForm() {
    const feedbackBtn = document.querySelector(".feedback-btn");
    const feedbackForm = document.querySelector(".feedback-form");
    const closeBtn = document.querySelector(".close-btn"); // Select close button
    
    if (!feedbackBtn || !feedbackForm || !closeBtn) return;
    feedbackForm.style.display = "none";

    if (feedbackBtn && feedbackForm && closeBtn) {
        feedbackForm.style.display = "none";

        feedbackBtn.addEventListener("click", function () {
            feedbackBtn.style.display = "none";
            feedbackForm.style.display = "block";
        });

        closeBtn.addEventListener("click", function () {
            feedbackForm.style.display = "none";
            feedbackBtn.style.display = "block"; // Show button again
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
            feedbackForm.appendChild(thankYouMessage);

            formElement.reset();
            setTimeout(() => {
                feedbackForm.style.display = "none";
                feedbackBtn.style.display = "block";
                thankYouMessage.remove();
            }, 3000);
        });
    } else {
        console.error("Feedback form elements not found in the DOM.");
    }
}

/** =============================
 * ✅ Flip Cards
 * ============================= */
function initializeFlipCards() {
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            setTimeout(() => {
                const backSide = card.querySelector(".flip-card-back");
                backSide.style.pointerEvents = card.classList.contains("flipped") ? "auto" : "none";
            }, 500);
        });
    });
}


/** =============================
 * ✅ Recycling Sorting Game
 * ============================= */

function initializeRecyclingGame() {
    console.log("♻️ Initializing Recycling Sorting Game...");

    const gameContainer = document.querySelector(".recycling-game");
    if (!gameContainer) {
        console.error("❌ ERROR: Recycling Game Container Not Found! Check your HTML.");
        return;
    }

    const wasteItems = gameContainer.querySelectorAll(".draggable");
    const bins = gameContainer.querySelectorAll(".bin");
    const gameMessage = document.getElementById("game-message");

    console.log(`🟢 Found ${wasteItems.length} draggable items inside container`);
    console.log(`🟢 Found ${bins.length} bins inside container`);

    if (wasteItems.length === 0 || bins.length === 0) {
        console.error("❌ ERROR: No draggable items or bins found! The game will not start.");
        return;
    }

    let correctCount = 0;
    const totalItems = wasteItems.length;

    // ✅ Step 1: Enable Drag & Drop for Desktop
    wasteItems.forEach(item => {
        item.draggable = true;
        console.log(`🔹 Making item draggable: ${item.alt} (Type: ${item.dataset.type})`);

        item.addEventListener("dragstart", event => {
            event.dataTransfer.setData("wasteType", item.dataset.type);
            console.log(`🚀 Drag started: ${item.dataset.type}`);
        });
    });

    // ✅ Step 2: Enable Touch Dragging for Mobile
    wasteItems.forEach(item => {
        item.addEventListener("touchstart", event => {
            event.preventDefault();
            console.log(`📱 Touch start: ${item.dataset.type}`);
            item.classList.add("dragging");

            // Store touched element globally
            window.currentDraggedItem = item;
        });
    });

    document.addEventListener("touchmove", event => {
        event.preventDefault();
        console.log("📱 Touch move event detected");
    });

    document.addEventListener("touchend", event => {
        event.preventDefault();
        console.log("📱 Touch end event detected");

        const target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        if (target && target.classList.contains("bin")) {
            handleDropMobile(target, window.currentDraggedItem);
        }

        if (window.currentDraggedItem) {
            window.currentDraggedItem.classList.remove("dragging");
            window.currentDraggedItem = null;
        }
    });

    // ✅ Step 3: Enable Desktop Drag & Drop Bins
    bins.forEach(bin => {
        bin.addEventListener("dragover", event => {
            event.preventDefault();
            console.log(`🚛 Dragging over: ${bin.dataset.type}`);
        });

        bin.addEventListener("drop", event => {
            event.preventDefault();
            const wasteType = event.dataTransfer.getData("wasteType");

            console.log(`🗑️ Dropped into bin: ${bin.dataset.type}, Dragged item: ${wasteType}`);

            handleDrop(bin, wasteType);
        });
    });

    console.log("✅ Recycling Sorting Game initialized successfully!");
}

// ✅ New Function: Handle Drop for Desktop
function handleDrop(bin, wasteType) {
    const gameMessage = document.getElementById("game-message");

    if (wasteType === bin.dataset.type) {
        gameMessage.textContent = "✅ Correct! Good job!";
        gameMessage.style.color = "green";

        // Remove the correctly sorted item
        document.querySelector(`img[data-type="${wasteType}"]`).remove();

        if (document.querySelectorAll(".draggable").length === 0) {
            launchConfetti();
            gameMessage.textContent = "🎉 You sorted all items correctly!";
        }
    } else {
        gameMessage.textContent = "❌ Wrong bin! Try again.";
        gameMessage.style.color = "red";
    }

    setTimeout(() => { gameMessage.textContent = ""; }, 2000);
}

// ✅ New Function: Handle Drop for Mobile
function handleDropMobile(bin, item) {
    if (!item) return;
    const wasteType = item.dataset.type;
    console.log(`📱 Mobile drop detected - Item: ${wasteType}, Bin: ${bin.dataset.type}`);

    handleDrop(bin, wasteType);
}

// ✅ Ensure It Runs After the DOM Fully Loads
// document.addEventListener("DOMContentLoaded", function () {
//     setTimeout(() => {
//         startRecyclingGame(); 
//     }, 500);
// });


/* =====================
✅ Launch Confetti When Game is Completed🎉
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

/** =============================
 * ✅ Search Toggle
 * ============================= */
function initializeSearchToggle() {
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

/** =============================
 * ✅ Share Button
 * ============================= */

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
/** =============================
 * ✅ Track User Interactions
 * ============================= */
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

/** =============================
 * ✅ Contact Form - I used google sheets  & Apps Script
 * ============================= */
const serverUrl = "https://script.google.com/macros/s/AKfycbyEQy4aclUBIUH7WjvdCB802zOMMFw8WOGektN7vKr3xA0fcSORHTpRClnkZCdC0MGc/exec"; 

function initializeContactForm() {
    console.log("📢 Contact form function initialized!");

    const contactForm = document.getElementById("contact-form");
    if (!contactForm) {
        console.error("❌ Contact form not found in the DOM.");
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("🚀 Contact form submitted!");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            console.warn("⚠️ Some fields are empty. Form will not submit.");
            alert("Please fill in all fields before submitting.");
            return;
        }

        console.log("📩 Sending data to server:", { name, email, message });

        // ✅ Show Thank You Message Immediately
        showThankYouMessage();

        // ✅ Format URL for GET request
        const getRequestUrl = `${serverUrl}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;

        // ✅ Send Data to Google Sheets in the Background
        fetch(getRequestUrl, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Server response:", data);
                if (data.status !== "success") {
                    console.error("❌ Server returned an error:", data);
                    alert("Error submitting form. Please try again.");
                }
            })
            .catch(error => {
                console.error("❌ Fetch request failed:", error);
                alert("🚨 There was an issue submitting the form. Check console for details.");
            });

        // ✅ Clear Form Fields Immediately After Clicking Send
        contactForm.reset();
    });
}

// ✅ Show Thank You Message Function (No Delay)
function showThankYouMessage() {
    console.log("🎉 Displaying thank-you message...");
    
    let thankYouMessage = document.getElementById("thank-you-message");
    
    if (!thankYouMessage) {
        // If thank-you message doesn't exist, create it
        thankYouMessage = document.createElement("p");
        thankYouMessage.id = "thank-you-message";
        thankYouMessage.textContent = "🎉 Thank you! Your message has been sent.";
        thankYouMessage.style.color = "green";
        thankYouMessage.style.fontWeight = "bold";
        thankYouMessage.style.marginTop = "10px";
        document.getElementById("contact-form").appendChild(thankYouMessage);
    }

    thankYouMessage.style.display = "block";

    // Hide the message after 3 seconds
    setTimeout(() => {
        console.log("🕒 Hiding thank-you message...");
        thankYouMessage.style.display = "none";
    }, 3000);
}

/** =============================
 * ✅ QUIZ GAME - The Game Logic
 * ============================= */
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
  
//Quiz Game

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

// ==== QUIZ GAME  Logic/ Functions ends === //

/** =============================
 * ✅ Dropdown Menu Setup
 * ============================= */

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

/* ===========================
 * ✅ Image Slider Setup
 * ============================= */
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

/* ===========================
 *  ✅ Newsletter Signup Animation
 * ============================= */
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

/** =============================
 * ✅ Team Member Hover Effects
 * ============================= */
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

/** =============================
 * ✅ News Page Animations
 * ============================= */
document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll(".breaking-news-item, .news-item");

    /* 🎭 Scroll Animation - Always Active */
    function fadeInOnScroll() {
        newsItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                item.classList.add("fade-in-active");
            } else {
                item.classList.remove("fade-in-active"); // Allows re-triggering on scroll up
            }
        });
    }

    /* 🎨 Ultra-Smooth Hover Effect */
    newsItems.forEach(item => {
        item.style.transition = "transform 0.6s ease-out, box-shadow 0.6s ease-out";

        item.addEventListener("mouseenter", () => {
            item.style.transform = "scale(1.02)";
            item.style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.2)";
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "scale(1)";
            item.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.1)";
        });
    });

    /* 🚀 Apply Scroll Effect */
    fadeInOnScroll(); // Run immediately for visible items
    window.addEventListener("scroll", fadeInOnScroll);
});


/** =============================
 * ✅ Live Rates API
 * ============================= */
let previousRates = {}; // Store previous rates for comparison
let retryCount = 0; // To prevent infinite retries

async function fetchLiveRates() {
    try {
        console.log("Fetching exchange rates...");

        // ✅ Use the correct Forex API
        const forexResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);

        if (!forexResponse.ok) throw new Error(`Forex API error: ${forexResponse.statusText}`);
        const forexData = await forexResponse.json();

        console.log("Forex API response:", forexData); // ✅ Debugging log

        if (!forexData.rates) throw new Error("Invalid Forex API response");

        // ✅ Update Forex rates while keeping previous values if API fails
        updateRate("usd-eur", forexData.rates.EUR);
        updateRate("gbp-usd", forexData.rates.GBP);
        updateRate("eur-gbp", forexData.rates.GBP / forexData.rates.EUR);
        updateRate("usd-jpy", forexData.rates.JPY);
        updateRate("usd-chf", forexData.rates.CHF);
        updateRate("usd-cny", forexData.rates.CNY);
        updateRate("usd-inr", forexData.rates.INR);
        updateRate("usd-cad", forexData.rates.CAD);
        updateRate("usd-aud", forexData.rates.AUD);

        // ✅ Fetch Bitcoin & Ethereum Prices
        console.log("Fetching crypto data...");
        const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');

        if (!cryptoResponse.ok) throw new Error(`Crypto API error: ${cryptoResponse.statusText}`);
        const cryptoData = await cryptoResponse.json();

        console.log("Crypto API response:", cryptoData);

        if (!cryptoData.bitcoin || !cryptoData.ethereum) throw new Error("Invalid Crypto API response");

        updateRate("btc-price", cryptoData.bitcoin.usd);
        updateRate("eth-price", cryptoData.ethereum.usd);

        retryCount = 0; // Reset retry count if everything works fine

    } catch (error) {
        console.error("Error fetching data:", error);

        // **Retry fetching after 5 seconds without clearing old data**
        if (retryCount < 3) {
            retryCount++;
            console.log(`Retrying fetch attempt ${retryCount}...`);
            setTimeout(fetchLiveRates, 5000);
        } else {
            console.log("Failed to update data after multiple attempts. Keeping previous values.");
        }
    }
}

function updateRate(id, newRate) {
    const rateElement = document.getElementById(id);
    if (!rateElement) {
        console.error(`Element with ID '${id}' not found.`);
        return;
    }

    if (previousRates[id] !== undefined) {
        const oldRate = previousRates[id];

        // Update color based on increase/decrease
        rateElement.classList.toggle("up", newRate > oldRate);
        rateElement.classList.toggle("down", newRate < oldRate);
    }

    // Store the new rate & update the text
    previousRates[id] = newRate;
    rateElement.innerText = newRate.toFixed(2);
}

// Fetch rates every **10 seconds** instead of 1 second
fetchLiveRates();
setInterval(fetchLiveRates, 10000);

console.log("Script is running...");
// ends //

/*********************
2) Second DOM: Likes & Views counter 
*********************/
document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 DOM fully loaded for Like & Visit Counters");

    document.querySelectorAll(".quote").forEach(quoteElement => {
        const quoteId = quoteElement.getAttribute("data-quote");
        const likeBtn = quoteElement.querySelector(".like-btn");
        const likeCountElement = likeBtn ? likeBtn.querySelector(".like-count") : null;
        const visitCountElement = quoteElement.querySelector(".visit-count");

        if (!likeBtn || !likeCountElement || !visitCountElement) {
            console.warn(`⚠️ Missing elements for Quote ID: ${quoteId}`);
            return;
        }

        // ✅ Restore Like Count
        let likeCount = safeLocalStorageGet(`likeCount-${quoteId}`);
        likeCountElement.textContent = likeCount;

        // ✅ Restore Visit Count
        let visitCount = safeSessionStorageGet(`visitCount-${quoteId}`);
        visitCountElement.textContent = `👀 ${visitCount}`;

        // ✅ Desktop: Click Event
        likeBtn.addEventListener("click", handleLikeButtonClick);

        // ✅ Mobile: Touch Event (Prevents Double Clicks)
        likeBtn.addEventListener("touchend", function (event) {
            event.preventDefault(); // Prevents unwanted "click" events on mobile
            handleLikeButtonClick(event);
        });

        observer.observe(quoteElement);
    });
});

// ✅ Updated Like Button Function (Fix for Mobile & Desktop)
function handleLikeButtonClick(event) {
    const likeBtn = event.currentTarget;
    const quoteElement = likeBtn.closest(".quote");
    const quoteId = quoteElement.getAttribute("data-quote");
    const likeCountElement = likeBtn.querySelector(".like-count");

    if (!quoteId || !likeCountElement) return;

    let likeCount = safeLocalStorageGet(`likeCount-${quoteId}`);
    likeCount++;
    safeLocalStorageSet(`likeCount-${quoteId}`, likeCount);
    likeCountElement.textContent = likeCount;
}

// ✅ Fix: Adjusted Intersection Observer (Threshold Lowered for Mobile)
const observer = new IntersectionObserver(handleVisitCount, { threshold: 0.2 });

function handleVisitCount(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const quoteElement = entry.target;
            const quoteId = quoteElement.getAttribute("data-quote");
            const visitCountElement = quoteElement.querySelector(".visit-count");

            if (!quoteId || !visitCountElement) return;

            let visitCount = safeSessionStorageGet(`visitCount-${quoteId}`);
            visitCount++;
            safeSessionStorageSet(`visitCount-${quoteId}`, visitCount);
            visitCountElement.textContent = `👀 ${visitCount}`;
            observer.unobserve(quoteElement);
        }
    });
}

// ✅ Local & Session Storage Handling
function safeLocalStorageGet(key, fallback = 0) {
    try {
        return parseInt(localStorage.getItem(key)) || fallback;
    } catch (e) {
        console.warn("⚠️ LocalStorage is not available:", e);
        return fallback;
    }
}

function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("⚠️ Unable to store data in LocalStorage:", e);
    }
}

function safeSessionStorageGet(key, fallback = 0) {
    try {
        return parseInt(sessionStorage.getItem(key)) || fallback;
    } catch (e) {
        console.warn("⚠️ SessionStorage is not available:", e);
        return fallback;
    }
}

function safeSessionStorageSet(key, value) {
    try {
        sessionStorage.setItem(key, value);
    } catch (e) {
        console.warn("⚠️ Unable to store data in SessionStorage:", e);
    }
}

