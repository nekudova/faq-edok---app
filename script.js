document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("faqForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var question = document.getElementById("question").value;
        var status = document.getElementById("status");

        if (!question.trim()) {
            status.innerText = "Zadejte otázku!";
            return;
        }

     fetch("https://script.google.com/macros/s/AKfycbwE3c_jUB9EznJVSC9ZQGgVxcFoe9vZMalivM0PG2wTpf2LzyqCLPbFr-h46iUqlcuW/exec", {  
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
