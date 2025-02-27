document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("faqForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var question = document.getElementById("question").value;
        var status = document.getElementById("status");

        if (!question.trim()) {
            status.innerText = "Zadejte otázku!";
            return;
        }

 fetch("https://script.google.com/macros/s/AKfycbxWOdauNi1Zie5whFJmWR5rH7E2ceLo5P8Oef9E5jth0SBVYZLPx4fh1E4RVXWYQTre/exec", {
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
