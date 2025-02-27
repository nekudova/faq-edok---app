document.addEventListener("DOMContentLoaded", function () {
    fetch("PASTE_GOOGLE_SCRIPT_URL_HERE")
    .then(response => response.json())
    .then(data => {
        const faqList = document.getElementById("faq-list");
        faqList.innerHTML = "";

        data.forEach(entry => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");

            const question = document.createElement("div");
            question.classList.add("faq-question");
            question.innerText = entry.question;
            faqItem.appendChild(question);

            const answer = document.createElement("div");
            answer.classList.add("faq-answer");
            answer.innerText = entry.answer;
            faqItem.appendChild(answer);

            question.addEventListener("click", () => {
                answer.style.display = answer.style.display === "block" ? "none" : "block";
            });

            faqList.appendChild(faqItem);
        });
    })
    .catch(error => {
        console.error("Chyba při načítání FAQ:", error);
    });
});
