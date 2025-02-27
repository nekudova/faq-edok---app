document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("faqForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var question = document.getElementById("question").value;
        var status = document.getElementById("status");

        fetch("https://script.google.com/macros/s/AKfycbyObKReQTv0Jyds-e75NJCT3lPVToIxOQ7eOR2Gm5S8jerxZ5OQf7kQoGCHD0wYjQcy/exec", {  
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
