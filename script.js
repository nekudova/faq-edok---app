document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            answer.style.display = (answer.style.display === "block") ? "none" : "block";
        });
    });
});

document.getElementById("faqForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var question = document.getElementById("question").value;
    var status = document.getElementById("status");

    fetch("https://script.google.com/macros/s/AKfycbyObKReQTv0Jyds-e75NJCT3lPVToIxOQ7eOR2Gm5S8jerxZ5OQf7kQoGCHD0wYjQcy/exec" + encodeURIComponent(question), {
    method: "GET"
})
   
    .then(response => response.text())
    .then(data => {
        status.innerText = data;
        document.getElementById("faqForm").reset();
    })
    .catch(error => {
        status.innerText = "Chyba při odesílání!";
    });
});
