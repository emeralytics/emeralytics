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

    fetch("https://script.google.com/macros/s/AKfycbzPqXoKouTYKfsy5D_YZ07EzKw9mSkVp4t-DIESpnf0S4kWvT5cSSEopWyehtv255TPUg/exec", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())  // ✅ Convert response to text
    .then(text => {
        if (text === "success") {
            showAlert("Thanks! We’ll be in touch soon.");
            this.reset();
            closeContactModal();
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

