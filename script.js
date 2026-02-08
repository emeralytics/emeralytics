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

    fetch("https://script.google.com/macros/s/AKfycbxHPq9aOKWg6Sq9nLsP75mh7x9FmwCJeqTfW6tDs42eCCum65eA2B_3knv6d9pBUEABhg/exec", {
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

var token = e.parameter["g-recaptcha-response"];
var secret = "6Leai2QsAAAAALB-oNJOwt2ksFY1KEHiO-f2WSgm";
var response = UrlFetchApp.fetch(
  "https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + token
);
var result = JSON.parse(response.getContentText());
if(!result.success) return ContentService.createTextOutput("captcha_failed");

