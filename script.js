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

    fetch("https://script.google.com/macros/s/AKfycbyIVn_HaZltg_2lfuPI7HG6w2cr-Dtx6gUmh3YpvuHN3AqDXfpuX_FbYbaKRKMUzVCawA/exec", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
    .then(res => res.text())
    .then(response => {
        if(response === "success") {
            showAlert("Thanks! We’ll be in touch soon.");
            this.reset();
            closeContactModal();
        } else if(response === "already_submitted") {
            showAlert("You have already submitted your email today. Please try again tomorrow.");
        } else {
            showAlert("Something went wrong. Please try again.");
        }
    })
    .catch(err => console.error(err));
});

