let loginForm = document.getElementById("loginForm");
let signUpForm = document.getElementById("signUpForm");
let passwords = document.getElementById("password");

if (signUpForm) {
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let number = document.getElementById("number").value;

    if (!pass(password)) {
      showError(
        "signUpError",
        "Password must be 8-16 characters with uppercase, lowercase, number & special character."
      );
      return;
    }

    if (phoneNumber(number)) {
      showError(
        "signUpError",
        "Number must start with +91 and include your full phone number."
      );
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      showError("signUpError", "Email already registered.");
      return;
    }

    users.push({ username, email, password, number });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    window.location.href = "./Login.html";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let Email = document.getElementById("loginEmail").value;
    let Password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    let validUser = users.find(
      (user) => user.email === Email && user.password === Password
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      alert("🎉Welcome! You have successfully logged in.🎉");
      window.location.href = "./dashboard.html";
    } else {
      showError("loginError", "Invalid email or password.");
    }
  });
}

function showError(id, message) {
  let errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.innerText = message;
  }
}

function phoneNumber(number) {
  if (!number.startsWith("+91")) {
    return true;
  }
  return false;
}

function pass(password) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/;
  return regex.test(password);
}

function showError(id, message) {
  document.getElementById(id).innerText = message;
}
