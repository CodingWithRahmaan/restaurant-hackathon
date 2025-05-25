// Save last section to localStorage
function setLastSection(section) {
  localStorage.setItem('lastSection', section);
}

// Load categories from localStorage if available
let categoriesList = JSON.parse(localStorage.getItem("categoriesList")) || [];

// Each category will be an object: { name, description, price, image }
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
      <div class="header">Manage Menu Items</div>
      <div class="card">
        <h3><i class="fa fa-list"></i> Add New Item</h3>
        <button onclick="addCategoryPrompt()" style="padding:8px 12px;background:#c9a66b;color:#fff;border:none;border-radius:5px;">Add New Item</button>
      </div>
      <div class="category-cards-container"></div>
    `;
    renderCategoryCards();
  }
}

// SweetAlert2 prompt for adding a new item
function addCategoryPrompt() {
  Swal.fire({
    title: 'Add New Menu Item',
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="Item Name">
      <input id="swal-input2" class="swal2-input" placeholder="Description">
      <input id="swal-input3" class="swal2-input" placeholder="Price (e.g. 499)">
      <input id="swal-input4" class="swal2-input" placeholder="Image URL (optional)">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Add',
    preConfirm: () => {
      const name = document.getElementById('swal-input1').value.trim();
      const desc = document.getElementById('swal-input2').value.trim();
      const price = document.getElementById('swal-input3').value.trim();
      const img = document.getElementById('swal-input4').value.trim();
      if (!name || !desc || !price || !img) {
        Swal.showValidationMessage('Name, Description, and Price are required!');
        return false;
      }
      return { name, description: desc, price, image: img };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      categoriesList.push(result.value);
      localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
      renderCategoryCards();
      Swal.fire('Added!', 'Menu item has been added.', 'success');
    }
  });
}

// SweetAlert2 edit prompt
function editCategory(index) {
  const cat = categoriesList[index];
  Swal.fire({
    title: 'Edit Menu Item',
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="Item Name" value="${cat.name || ''}">
      <input id="swal-input2" class="swal2-input" placeholder="Description" value="${cat.description || ''}">
      <input id="swal-input3" class="swal2-input" placeholder="Price" value="${cat.price || ''}">
      <input id="swal-input4" class="swal2-input" placeholder="Image URL" value="${cat.image || ''}">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Save',
    preConfirm: () => {
      const name = document.getElementById('swal-input1').value.trim();
      const desc = document.getElementById('swal-input2').value.trim();
      const price = document.getElementById('swal-input3').value.trim();
      const img = document.getElementById('swal-input4').value.trim();
      if (!name || !desc || !price) {
        Swal.showValidationMessage('Name, Description, and Price are required!');
        return false;
      }
      return { name, description: desc, price, image: img };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      categoriesList[index] = result.value;
      localStorage.setItem("categoriesList", JSON.stringify(categoriesList));
      renderCategoryCards();
      Swal.fire('Updated!', 'Menu item has been updated.', 'success');
    }
  });
}

// SweetAlert2 delete confirm
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
      Swal.fire('Deleted!', 'Menu item has been deleted.', 'success');
    }
  });
}

function renderCategoryCards() {
  const container = document.querySelector(".category-cards-container");
  if (!container) return;
  if (categoriesList.length === 0) {
    container.innerHTML = "<p style='color:#888;'>No menu items added yet.</p>";
    return;
  }
  container.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:18px;">
      ${categoriesList.map((cat, idx) => `
        <div class="card" style="min-width:220px;flex:1 1 220px;max-width:260px;box-sizing:border-box;position:relative;">
          ${cat.image ? `<img src="${cat.image}" alt="${cat.name}" style="width:100%;height:120px;object-fit:cover;border-radius:8px 8px 0 0;margin-bottom:10px;">` : ''}
          <h3 style="color:#c9a66b;font-size:18px;"><i class="fa fa-tag"></i> ${cat.name || ''}</h3>
          <p style="font-size:13px;color:#777;min-height:38px;">${cat.description || ''}</p>
          <div style="font-weight:bold;color:#333;margin-bottom:8px;">${cat.price ? 'Rs. ' + cat.price : ''}</div>
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















