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

    fetch("https://script.google.com/macros/s/AKfycbyg_YANNiTcmfUMllyLdrbYd3aMxH5kNeHl4F7mfBJVIfGAbHVAL_wKsZFDIEen1GOH/exec", { // Sem vlož svůj Google Apps Script odkaz!
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
