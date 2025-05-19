function showSignup() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('signupBox').style.display = 'block';
}

function showLogin() {
    document.getElementById('signupBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
}

// Signup functionality
document.querySelector('#signupBox form').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = this.querySelector('input[placeholder="Full Name"]').value.trim();
    var email = this.querySelector('#signEmail').value.trim();
    var password = this.querySelector('input[placeholder="Password"]').value;

    // Get users array from localStorage or create new
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    var exists = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            exists = true;
            break;
        }
    }

    if (exists) {
        Swal.fire({
            title: 'Signup Failed',
            text: 'Email already registered!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Add new user
    users.push({ name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed up!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
    showLogin();
    this.reset();
});

// Login functionality
document.querySelector('#loginBox form').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = this.querySelector('input[placeholder="Email or Username "]').value.trim();
    var password = this.querySelector('input[placeholder="Password"]').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var found = false;
    var userName = '';

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            found = true;
            userName = users[i].name;
            break;
        }
    }

    if (found) {
        Swal.fire({
            title: 'Success!',
            text: 'Login successful! Welcome, ' + userName + '!',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'OK'
        }).then(function() {
            window.location.href = 'dashboard.html';
        });
    } else {
        Swal.fire({
            title: 'Login Failed',
            text: 'Invalid email or password.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    this.reset();
});









//   function showSignup() {
//     document.getElementById('loginBox').style.display = 'none';
//     document.getElementById('signupBox').style.display = 'block';
//   }

//   function showLogin() {
//     document.getElementById('signupBox').style.display = 'none';
//     document.getElementById('loginBox').style.display = 'block';
//   }

//   // Signup functionality
//   document.querySelector('#signupBox form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     var name = this.querySelector('input[placeholder="Full Name"]').value.trim();
//     var email = this.querySelector('#signEmail').value.trim();
//     var password = this.querySelector('input[placeholder="Password"]').value;

//     // Save user data in localStorage
//     localStorage.setItem('user', JSON.stringify({ name: name, email: email, password: password }));

// Swal.fire({
//   title: 'Success!',
//   text: 'You have successfully signed up!',
//   icon: 'success',
//   confirmButtonText: 'OK'
// });
//     showLogin();
//     this.reset();
//   });

//   // Login functionality
//   document.querySelector('#loginBox form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     // var email = this.querySelector('input[placeholder="Email"]').value.trim();
//     var email = this.querySelector('input[placeholder="Email or Username "]').value.trim();

//     var password = this.querySelector('input[placeholder="Password"]').value;

//     var user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.email === email && user.password === password) {
//     //   alert('Login successful! Welcome, ' + user.name + '!');
// Swal.fire({
//   title: 'Success!',
//   text: 'You have successfully signed up!',
//   icon: 'success',
//     timer: 2000, // 3 seconds

//   confirmButtonText: 'OK'
// });
//         window.location.href = 'dashboard.html'; // Yahan apne page ka naam likhein

//       // Yahan aap dashboard ya next page pe redirect kar sakte hain
//     } else {
// Swal.fire({
//   title: 'Login Failed',
//   text: 'Invalid email or password.',
//   icon: 'error',
//   confirmButtonText: 'OK'
// });
//     }
//     this.reset();
//   });