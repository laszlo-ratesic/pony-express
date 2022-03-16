const form = document.getElementById("contact-form");
const alertEl = document.getElementById("alert-el");
const alertBtn = document.getElementById("alert-btn");

const sendMail = (mail) => {
  fetch("/api/send", {
    method: "POST",
    body: mail,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 's-max-age=1, stale-while-revalidate'
    }
  }).then((response) => {
    return response.json;
  });
};

const emailSent = () => {
  var alert = new bootstrap.Alert(alertEl);
  alertBtn.addEventListener("click", function() {
    alert.close();
  })
}

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  let mail = new FormData(form);
  sendMail(mail);

  form.reset();
  alertEl.classList.remove("invisible");
  emailSent();
});

