
// ==============================================================

  // ===== Contact Modal Scripts =====
  function openContactModal() {
    document.getElementById("contactModal").style.display = "flex";
  }

  function closeContactModal() {
    document.getElementById("contactModal").style.display = "none";
  }

  window.onclick = function(e) {
    const modal = document.getElementById("contactModal");
    if (e.target === modal) closeContactModal();
  };

  // ===== Alert Modal Scripts =====
  function showAlert(message) {
    document.getElementById("alertMessage").innerText = message;
    document.getElementById("alertModal").style.display = "flex";
  }

  function closeAlertModal() {
    document.getElementById("alertModal").style.display = "none";
  }

  // ===== Form Submission =====
  document.getElementById("emailForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbyvyj9XCad0YI190QPMOLfPiU7PeLaxeHzCPwbplzo0p4rq6Z3drINNisMWbYTNiFATOg/exec", {
      method: "POST",
      body: new URLSearchParams(formData)
    })
    .then(res => res.text())
    .then(response => {
      if (response === "success") {
        showAlert("Thank you! Your email has been submitted.");
        form.reset();
        grecaptcha.reset(); // Reset reCAPTCHA
      } else if (response === "already_submitted") {
        showAlert("You have already submitted your email today.");
      } else if (response === "captcha_failed") {
        showAlert("Captcha verification failed. Please try again.");
        grecaptcha.reset();
      } else {
        showAlert("An error occurred. Please try again later.");
        grecaptcha.reset();
      }
    })
    .catch(err => {
      console.error(err);
      showAlert("An error occurred. Please try again later.");
      grecaptcha.reset();
    });
  });
