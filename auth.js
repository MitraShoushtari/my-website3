// عناصر DOM
const formTitle = document.getElementById("form-title");
const authForm = document.getElementById("auth-form");
const authButton = document.getElementById("auth-button");
const errorMessage = document.getElementById("error-message");
const toggleForm = document.getElementById("toggle-form");
const toggleLink = document.getElementById("toggle-link");

let isRegister = false;

// جابجایی بین ورود و ثبت‌نام
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isRegister = !isRegister;
  formTitle.textContent = isRegister ? "Register" : "Login";
  authButton.textContent = isRegister ? "Register" : "Login";
  toggleForm.innerHTML = isRegister
    ? `Already have an account? <a href="#">Login</a>`
    : `Don't have an account? <a href="#">Register</a>`;
});

// مدیریت ارسال فرم
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (isRegister) {
    if (users[username]) {
      errorMessage.textContent = "Username already exists.";
      return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
    isRegister = false;
    formTitle.textContent = "Login";
    authButton.textContent = "Login";
    toggleForm.innerHTML = `Don't have an account? <a href="#">Register</a>`;
  } else {
    if (users[username] !== password) {
      errorMessage.textContent = "Invalid username or password.";
      return;
    }
    localStorage.setItem("loggedInUser", username);
    window.location.href = "gallery.html"; // انتقال به گالری
  }
});
