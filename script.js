document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("faqForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var question = document.getElementById("question").value;
        var status = document.getElementById("status");

        if (!question.trim()) {
            status.innerText = "Zadejte otázku!";
            status.style.color = "red";
            return;
        }

        fetch("https://script.google.com/macros/s/AKfycbzoM0-WpRWvRxFgYG3yGDUUYvfg9K4C_Rm_tiRvt4QkKUg-ceBOJdfM_9moyHpMuUjQ/exec", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                status.innerText = "Otázka byla úspěšně odeslána!";
                status.style.color = "green";
                document.getElementById("faqForm").reset();
            } else {
                status.innerText = "Chyba: " + data.message;
                status.style.color = "red";
            }
        })
        .catch(error => {
            status.innerText = "Chyba při odeslání!";
            status.style.color = "red";
            console.error("Chyba:", error);
        });
    });
});

