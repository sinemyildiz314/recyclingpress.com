# 🌍 RecyclingPress - Project Journey & Documentation

## 1️⃣ Introduction
### A Dream Beyond a University Project
RecyclingPress started as more than just a university assessment—it was born from a **deep passion for sustainability**. My goal is to **raise awareness about recycling, sustainability, and environmental responsibility** by starting locally in **Dublin, Ireland** and expanding globally.

I envision this project as the foundation for **real-world initiatives**—leveraging my workplace, **Google Ireland**, to utilize **CSR programs, volunteering activities, and industry partnerships** to drive positive change. RecyclingPress is a step toward making this dream a reality, **one article, one game, and one engaged user at a time.**

---

## 2️⃣ Design Decisions & UI/UX Choices
### **🔹 Layout & Navigation**
- Clean, intuitive navigation ensuring smooth user experience.
- Consistent **Navigation bar & dropdowns** for better accessibility.
- **Hamburger menu** optimized for mobile responsiveness.
- Integrated **search bar** with real-time filtering for articles.

### 🎨 Visual Identity
- **Eco-friendly color scheme** (greens & blues) reflecting sustainability.
- **Consistent typography & spacing** for readability.
- **Aesthetic animations & hover effects** enhancing engagement to maximize page session times. 

### Accessibility Features
- **ARIA attributes** added for screen readers.
- **Keyboard navigation enabled** for dropdowns & interactive elements.
- **Alt text on images** for better SEO & usability.

---

## 3️⃣ Development Process
### 💡Implementation & Development Roadmap
The development of RecyclingPress was heavily focused on interactivity, leveraging JavaScript to create a **dynamic, engaging, and highly responsive experience** for users. Below is the structured process followed:

#### 📌 Initial Planning & Research

1. **Market Analysis:** Examined leading recycling and sustainability resources online, inspired from industry and social initiatives across globe, and used Google Scholar.
2. **Feature Prioritization:** Identified core interactive elements to implement, including gamification features, engagement tracking, and animations to apply my course learnings and push my capabilities to imagine different functions to different versions. Lotsa tests involved to find out best UX. 

#### 🛠 Core JavaScript Implementations

1. **Navigation & UI Interactivity**
   - **Navigation Bar:** Implemented `toggleMenu()` function ensuring smooth mobile navigation.
   - **Dropdown Menu Accessibility:** Used event delegation to **dynamically attach event listeners** for dropdown toggling.
   - **Search Bar Expansion:** JavaScript dynamically **expands and collapses** the search input for a sleek UI. (Listing articles on the existing page only, under further development).

2. **Gamification & Learning Modules**
   - **Sorting Game (Industry Page):** Developed a **drag-and-drop system** with event listeners for desktop. (Mobile version under development...for more view challanges section).
   - **Recycling Quiz (Recycling Page):** Quiz logic includes **real-time feedback, score tracking, explanations, and developed confette animation for users whom grade 5/5**.

3. **User Engagement & Tracking**
   - **Floating Share Button:** Users can share articles on **Instagram, Facebook, LinkedIn, Twitter, and Reddit.**
   - **Like & Visit Counter:** Tracked using `localStorage` and `sessionStorage` to record user engagement data. **Displaying Live Likes and Visits Data to users on the page (i.e.Quotes section).**
   - **Newsletter Signup Animation:** Encourages users to subscribe for sustainability updates.
   - **User Interaction Tracking:** Captured **mouse movement and clicks** for future heatmap analysis.

4. **Animation & Smooth Transitions**
   - **Hero Section Image Slider:** Implemented using JavaScript `setInterval()` with **dynamic dot navigation.** Applied twice on home and news page. 
   - **Fade-In Effects:** Applied `IntersectionObserver()` for a **smooth scrolling animation effect**.
   - **Button & Hover Effects:** JavaScript dynamically applies `transform` animations for **aesthetic hover effects**.

5. **Real-Time API Integrations**
   - **Live Exchange Rates:** Fetches forex data using `fetch()` API with **error handling and retries**.
   - **Bitcoin & Ethereum Prices:** Connected to `CoinGecko API` for real-time cryptocurrency data updates.
   - **Google Sheets Contact Form:** Form submissions are processed via a **Google Apps Script backend** for data storage.

6. **SEO & Performance Optimization**
   - **Lazy Loading Images & Scripts:** JavaScript dynamically loads assets **only when needed** to reduce load time.
   - **Event Delegation for Performance:** Implemented across all dynamically generated elements.
   - **Error Handling:** **API calls and JavaScript functions include failover mechanisms** to ensure a smooth experience.

7. **Optimizations**
- **Encapsulated functions** to avoid global scope pollution.
- **Event delegation used** for dynamically loaded elements.
---




## 4️⃣ Challenges Faced & Solutions

### 🚧 Handling Multiple DOM Elements & Function Execution Conflicts
- **Problem:** Some JavaScript functions were running on pages where their target elements did not exist, causing console errors.
- **Fix:** Implemented **conditional checks** before executing functions to ensure elements exist in the DOM.
- **Example:**
  ```js
  if (document.getElementById("search-input")) {
      document.getElementById("search-input").addEventListener("keyup", searchFunction);
  }
  ```

### 🔄 Conflicting Functions Overwriting One Another
- **Problem:** Functions running across multiple pages were unintentionally interfering with one another.
- **Fix:** Encapsulated functions within **page-specific conditionals** to prevent unnecessary execution.
- **Example:**
  ```js
  if (window.location.pathname.includes("industry.html")) {
      startRecyclingGame();
  }
  ```

### 🖇️ Event Listeners Attached Multiple Times
- **Problem:** Event listeners were stacking on elements due to repeated function calls.
- **Fix:** Used **event delegation** and ensured listeners were attached only once.
- **Example:**
  ```js
  document.body.addEventListener("click", function(event) {
      if (event.target.matches(".share-btn")) {
          toggleShareOptions(event.target);
      }
  });
  ```

### 📈 Live Exchange Rates API Integration
- **Problem:** API sometimes failed to fetch data.
- **Fix:** Added **error handling & fallback values** to maintain usability. Decided to use forex data as it was free, other external APIs had daily quotas.


### 📌 Future Development Goals
-  **🔧JavaScript Optimizations** 
        **📱Mobile Performance Issues:** Goal to enhance mobile UX/UI performance on existing and new pages. 
        1.**Industry Page** 
        - **The Industry Page takes a long time to load on phones, especially when running lots of animations.** 
        - **Even though the page eventually works, there's a delay before all the interactive parts start.**
        - **There's a problem on phones where tapping the navigation bar to change pages sometimes stops the article previews from opening.**
        2.**Recycling Sorting Game**
        - The Recycling Sorting Game works great on computers!
        - **Testing it using the phone's developer tools isn't the best way to see how it performs.It's better to try it on real phones.**
        - **It works well on newer phones like the iPhone 15, but it might be slow or have problems on older models.**
        - **Likes & Visits, Sliders, and Fade Animations:**
        - These features work smoothly on both phones and computers.   
- 🌍 **Expand sustainability outreach** via partnerships & local community events.
- 🎮 **Enhance gamification** by adding more interactive sustainability challenges.
- 🏛 **Build a forum/community section** for real-time discussions & knowledge-sharing.

---

## 5️⃣ SEO Optimization & Deployment

### ✅ SEO Best Practices Implemented

- **robots.txt configured** to control search engine crawling.
- **sitemap.xml added** for better search engine indexing.
- **Meta tags optimized** to improve ranking on Google.
- **Google Analytics & Search Console linked** for performance tracking.

### 🚀 Deployment & Hosting

- **GitHub Repository:** [RecyclingPress on GitHub](https://github.com/sinemyildiz314/recyclingpress.com)
- **Live Website:** [RecyclingPress.com](https://recyclingpress.com)
- **Google Search Console:** Sitemap submitted for indexing.

💚 **Sustainability is a movement, and this is just the beginning!** 🚀



















---

## 6️⃣ Conclusion & Personal Reflection

This journey has been more than just coding—it has been a **mission to inspire real change**.

Through **interactive content, gamification, and data-driven insights**, RecyclingPress is designed to educate and engage users about sustainability. This project has taught me not just about **development, SEO, and UX**, but also about **the power of technology to drive global impact.**

### 🌱 What’s Next?

I will continue expanding RecyclingPress beyond the web, starting **real-world awareness campaigns** in **Dublin, Ireland**, leveraging **Google CSR initiatives**, and forming **partnerships with environmental organizations.**

💚 **Sustainability is a movement, and this is just the beginning!** 🚀

