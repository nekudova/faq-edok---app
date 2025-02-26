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

    fetch("TVŮJ_GOOGLE_SCRIPT_URL", { // Sem vlož svůj Google Apps Script odkaz!
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
