function showAlert(message) {
  const alertModal = document.getElementById("alertModal");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.textContent = message;
  alertModal.classList.add("show");

  // Auto close after 3 seconds
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

    fetch("https://script.google.com/macros/s/AKfycbyxOGCvj_-o0SDCy4o3ez5ipjG64TOjTp8XUg3wCWKZjyyh4RSqHbFhDsjc9N1jVzp3UQ/exec", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
        .then(response => {
        if (response === "success") {
            showAlert("Thanks! We’ll be in touch soon.");
            this.reset();
            closeModal();
        } else if (response === "already_submitted") {
            showAlert("You have already submitted your email today.");
        } else if (response === "captcha_failed") {
            showAlert("Please complete the reCAPTCHA.");
        } else {
            showAlert("Something went wrong. Please try again.");
        }
        })
    .catch(err => console.error(err));
});

