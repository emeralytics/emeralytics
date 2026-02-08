function showAlert(message) {
  const alertModal = document.getElementById("alertModal");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.textContent = message;
  alertModal.classList.add("show");

  setTimeout(() => {
    alertModal.classList.remove("show");
  }, 3000);
}

function closeAlertModal() {
  document.getElementById("alertModal").classList.remove("show");
}

// ✅ SAFE modal close (no name conflicts)
function closeContactModal() {
  const modal = document.querySelector(".contact-modal");
  if (modal) modal.style.display = "none";
}

// ✅ WAIT until DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("emailForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbyxOGCvj_-o0SDCy4o3ez5ipjG64TOjTp8XUg3wCWKZjyyh4RSqHbFhDsjc9N1jVzp3UQ/exec", {
      method: "POST",
      body: new URLSearchParams(formData)
    })
      .then(res => res.text()) // ✅ THIS WAS MISSING
      .then(response => {
        if (response === "success") {
          showAlert("Thanks! We’ll be in touch soon.");
          form.reset();
          closeContactModal();
        } else if (response === "already_submitted") {
          showAlert("You have already submitted your email today.");
        } else if (response === "captcha_failed") {
          showAlert("Please complete the reCAPTCHA.");
        } else {
          showAlert("Something went wrong. Please try again.");
        }
      })
      .catch(err => {
        console.error(err);
        showAlert("Network error. Please try again.");
      });
  });
});
