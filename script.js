document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            answer.style.display = (answer.style.display === "block") ? "none" : "block";
        });
    });

    document.getElementById("faqForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var question = document.getElementById("question").value;
        var status = document.getElementById("status");

        fetch("https://https://script.google.com/macros/s/AKfycbyObKReQTv0Jyds-e75NJCT3lPVToIxOQ7eOR2Gm5S8jerxZ5OQf7kQoGCHD0wYjQcy/exec", { // Správná URL Apps Scriptu
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Chyba: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            status.innerText = "Otázka byla úspěšně odeslána!";
            document.getElementById("faqForm").reset();
        })
        .catch(error => {
            status.innerText = "Chyba při odeslání!";
            console.error("Chyba:", error);
        });
    });
});

