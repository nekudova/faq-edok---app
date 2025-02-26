document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    });
});
document.getElementById("faqForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var question = document.getElementById("question").value;
    var status = document.getElementById("status");

   fetch("https://script.google.com/macros/s/AKfycbw9yHkfHF0uM0eOThpD47W7Bu3ZqIfYqsrUFwgjn41JJcnMY995FHO3lVQP5Ptbw5Dk/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: question })
    }).then(() => {
        status.innerText = "Otázka byla odeslána!";
        document.getElementById("faqForm").reset();
    }).catch(error => {
        status.innerText = "Chyba při odesílání!";
    });
});
