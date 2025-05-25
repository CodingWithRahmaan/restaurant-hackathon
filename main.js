// Save last section to localStorage
function setLastSection(section) {
  localStorage.setItem('lastSection', section);
}

// Load categories from localStorage if available
let categoriesList = JSON.parse(localStorage.getItem("categoriesList")) || [];

function showSection(section) {
  setLastSection(section);
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
      <div class="header">Manage Menu</div>
      <div class="card">
        <h3><i class="fa fa-list"></i> Add New Item</h3>
        <input type="text" id="categoryInput" placeholder="Enter category name" style="padding:8px;width:80%;margin-bottom:10px;" />
        <button onclick="addCategory()" style="padding:8px 12px;background:#c9a66b;color:#fff;border:none;border-radius:5px;">Add</button>
      </div>
      <div class="category-cards-container"></div>
    `;
    renderCategoryCards();
  }
}

function addCategory() {
  const input = document.getElementById("categoryInput");
  const category = input.value.trim();
  if (category !== "") {
    categoriesList.push(category);
    localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
    input.value = "";
    renderCategoryCards();
  }
}

// SweetAlert edit prompt
function editCategory(index) {
  Swal.fire({
    title: 'Edit category name',
    input: 'text',
    inputValue: categoriesList[index],
    showCancelButton: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value.trim()) {
        return 'Category name cannot be empty!';
      }
    }
  }).then((result) => {
    if (result.isConfirmed && result.value.trim() !== "") {
      categoriesList[index] = result.value.trim();
      localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
      renderCategoryCards();
      Swal.fire('Updated!', 'Category name has been updated.', 'success');
    }
  });
}

// SweetAlert delete confirm
function deleteCategory(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#c9a66b',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      categoriesList.splice(index, 1);
      localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
      renderCategoryCards();
      Swal.fire('Deleted!', 'Category has been deleted.', 'success');
    }
  });
}

function renderCategoryCards() {
  const container = document.querySelector(".category-cards-container");
  if (!container) return;
  if (categoriesList.length === 0) {
    container.innerHTML = "<p style='color:#888;'>No categories added yet.</p>";
    return;
  }
  container.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:18px;">
      ${categoriesList.map((cat, idx) => `
        <div class="card" style="min-width:180px;flex:1 1 180px;max-width:220px;box-sizing:border-box;position:relative;">
          <h3 style="color:#c9a66b;font-size:18px;"><i class="fa fa-tag"></i> ${cat}</h3>
          <p style="font-size:13px;color:#777;">Category #${idx + 1}</p>
          <button onclick="editCategory(${idx})" style="position:absolute;top:12px;right:44px;background:#f3ede2;color:#c9a66b;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;font-size:13px;"><i class="fa fa-edit"></i></button>
          <button onclick="deleteCategory(${idx})" style="position:absolute;top:12px;right:8px;background:#ffeaea;color:#d9534f;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;font-size:13px;"><i class="fa fa-trash"></i></button>
        </div>
      `).join('')}
    </div>
  `;
}

// On page load, show last visited section (default: dashboard)
window.onload = function() {
  const lastSection = localStorage.getItem('lastSection') || 'dashboard';
  showSection(lastSection);
};
















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