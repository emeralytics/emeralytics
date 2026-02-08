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

document.getElementById("emailForm").addEventListener("submit", function(e){
    e.preventDefault();
    const formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbyvyj9XCad0YI190QPMOLfPiU7PeLaxeHzCPwbplzo0p4rq6Z3drINNisMWbYTNiFATOg/exec", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
    .then(response => response.text()) // ✅ get text from response
    .then(text => {
        if (text === "success") {
            showAlert("Thanks! We’ll be in touch soon.");
            this.reset();
            closeModal();
        } else if (text === "already_submitted") {
            showAlert("You have already submitted your email today.");
        } else if (text === "captcha_failed") {
            showAlert("Please complete the reCAPTCHA.");
        } else {
            showAlert("Something went wrong. Please try again.");
        }
    })
    .catch(err => console.error(err));
});


// Contact Modal Controls
function openContactModal() {
  document.querySelector(".contact-modal").style.display = "flex";
}

function closeContactModal() {
  document.querySelector(".contact-modal").style.display = "none";
}

window.onclick = function(e) {
  const modal = document.querySelector(".contact-modal");
  if (e.target === modal) closeContactModal();
}
