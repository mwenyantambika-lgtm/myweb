// Contact form: validation and local preview (nothing is sent)
const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

// Finds each field by its type, so it fits the existing form
const nameInput = form.querySelector('input:not([type="email"]):not([type="submit"])');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector("textarea");

// Checks the email looks like something@something.something
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shows (or clears) an error message right after a field
function setError(field, message) {
  let error = field.nextElementSibling;
  if (!error || !error.classList.contains("error")) {
    error = document.createElement("span");
    error.className = "error";
    field.insertAdjacentElement("afterend", error);
  }
  error.textContent = message;
}

// Runs when the form is submitted: validates, then shows a preview
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const nameOk = name !== "";
  const emailOk = isValidEmail(email);
  const messageOk = message !== "";

  setError(nameInput, nameOk ? "" : "Please enter your name.");
  setError(emailInput, emailOk ? "" : "Please enter a valid email address.");
  setError(messageInput, messageOk ? "" : "Please write a message.");

  if (nameOk && emailOk && messageOk) {
    feedback.textContent =
      "Form validated in your browser (not sent). Name: " + name +
      " | Email: " + email + " | Message: " + message;
  } else {
    feedback.textContent = "Please fix the errors above.";
  }
});

// Theme switch: toggles the "dark" class on the page and updates the button
const themeButton = document.getElementById("theme-toggle");

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", isDark);
}

themeButton.addEventListener("click", toggleTheme);

// Mobile navigation: opens and closes the menu on narrow screens
const menuButton = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav");

// Toggles the "open" class and updates the button label and state
function toggleMenu() {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.textContent = isOpen ? "Close" : "Menu";
  menuButton.setAttribute("aria-expanded", isOpen);
}

// Closes the menu after a link is tapped
function closeMenu() {
  navMenu.classList.remove("open");
  menuButton.textContent = "Menu";
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", toggleMenu);

navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Gallery viewer: shows one photo at a time with Previous and Next buttons
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev-photo");
const nextButton = document.getElementById("next-photo");
const photoCounter = document.getElementById("photo-counter");
let currentSlide = 0;

// Shows the chosen photo, hides the others, and updates counter and buttons
function showSlide(index) {
  slides.forEach(function (slide, i) {
    slide.hidden = i !== index;
  });
  currentSlide = index;
  photoCounter.textContent = "Photo " + (index + 1) + " of " + slides.length;
  prevButton.disabled = index === 0;
  nextButton.disabled = index === slides.length - 1;
}

prevButton.addEventListener("click", function () {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
});

nextButton.addEventListener("click", function () {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
});

showSlide(0);