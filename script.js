document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("faqForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var question = document.getElementById("question").value;
        var status = document.getElementById("status");

        if (!question.trim()) {
            status.innerText = "Zadejte otázku!";
            return;
        }

        fetch("https://script.google.com/macros/s/AKfycbyMoNlZ3w_XFwLs71GSwpQQ5PEZnlHqiWoK03zrFDeOKbeyr-H7rdEVboHSX9GrciJi/exec", {  
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
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                status.innerText = "Otázka byla úspěšně odeslána!";
                document.getElementById("faqForm").reset();
            } else {
                status.innerText = "Chyba: " + data.message;
            }
        })
        .catch(error => {
            status.innerText = "Chyba při odeslání!";
            console.error("Chyba:", error);
        });
    });
});
