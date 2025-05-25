
  // Load categories from localStorage if available
  let categoriesList = JSON.parse(localStorage.getItem("categoriesList")) || [];

  function showSection(section) {
    const main = document.getElementById("mainContent");

    if (section === "dashboard") {
      main.innerHTML = `
        <div class="header">Dashboard Overview</div>
        <div class="card">
          <h3><i class="fa fa-user"></i> Total Users</h3>
          <p>1,254 users registered.</p>
        </div>
        <div class="card">
          <h3><i class="fa fa-chart-line"></i> Site Analytics</h3>
          <p>Today’s visitors: 856 | Bounce rate: 37%</p>
        </div>
        <div class="card">
          <h3><i class="fa fa-bell"></i> Notifications</h3>
          <p>No new notifications.</p>
        </div>
      `;
    } else if (section === "users") {
      main.innerHTML = `
        <div class="header">Users</div>
        <div class="card">
          <h3><i class="fa fa-users"></i> User List</h3>
          <p>Coming soon...</p>
        </div>
      `;
    } else if (section === "settings") {
      main.innerHTML = `
        <div class="header">Settings</div>
        <div class="card">
          <h3><i class="fa fa-cogs"></i> Site Settings</h3>
          <p>Coming soon...</p>
        </div>
      `;
    } else if (section === "categories") {
      main.innerHTML = `
        <div class="header">Manage Categories</div>
        <div class="card">
          <h3><i class="fa fa-list"></i> Add New Category</h3>
          <input type="text" id="categoryInput" placeholder="Enter category name" style="padding:8px;width:80%;margin-bottom:10px;" />
          <button onclick="addCategory()" style="padding:8px 12px;background:#c9a66b;color:#fff;border:none;border-radius:5px;">Add</button>
        </div>
        <div class="card">
          <h3>Category List</h3>
          <ul id="categoryList" style="padding-left:20px;"></ul>
        </div>
      `;
      renderCategoryList();
    }
  }

  function addCategory() {
    const input = document.getElementById("categoryInput");
    const category = input.value.trim();
    if (category !== "") {
      categoriesList.push(category);
      localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
      input.value = "";
      renderCategoryList();
    }
  }

  function renderCategoryList() {
    const ul = document.getElementById("categoryList");
    if (!ul) return;
    ul.innerHTML = "";
    categoriesList.forEach((cat, index) => {
      ul.innerHTML += `<li>${index + 1}. ${cat}</li>`;
    });
  }

  // Render categories if categories section is loaded by default
  if (document.getElementById("categoryList")) {
    renderCategoryList();
  }










//   main.html ka code h 

let currentSlide = 0;
const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const totalSlides = slides.children.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.onclick = () => moveToSlide(i);
  dotsContainer.appendChild(dot);
}

function updateCarousel() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  Array.from(dotsContainer.children).forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function moveToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

updateCarousel();
setInterval(nextSlide, 5000); // Auto-slide every 5 sec
