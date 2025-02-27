document.addEventListener("DOMContentLoaded", function () {
    fetch("https://script.google.com/macros/s/AKfycbysEcAq0yCtYtzmEQXEDje81MU4lcBnpPOuozG-eda1Ezufi9CLOA6e11O25Cidu2qH/exec")  // Sem vlož správný URL od Apps Script!
    .then(response => response.json())
    .then(data => {
        const faqList = document.querySelector(".faq-container");
        
        // Vyčistit staré otázky
        faqList.innerHTML = "<h1>Často kladené otázky</h1>";

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

            // Kliknutím zobrazit/skrýt odpověď
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
