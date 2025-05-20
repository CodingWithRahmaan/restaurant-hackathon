
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
    var name = this.querySelector('input[placeholder="Restaurant Name"]').value.trim();
    var email = this.querySelector('#signEmail').value.trim();
    var password = this.querySelector('input[placeholder="Password"]').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var exists = users.some(user => user.email === email);

    if (exists) {
        Swal.fire({
            title: 'Signup Failed',
            text: 'Email already registered!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

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
    var email = this.querySelector('input[placeholder="Email or Username"]').value.trim();
    var password = this.querySelector('input[placeholder="Password"]').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(user => user.email === email && user.password === password);

    if (user) {
        Swal.fire({
            title: 'Success!',
            text: 'Login successful! Welcome, ' + user.name + '!',
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
