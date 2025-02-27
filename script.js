document.addEventListener("DOMContentLoaded", function () {
    const faqList = document.getElementById("faq-list");

    // Pevně definované otázky a odpovědi
    const faqData = [
        { question: "Co je tato aplikace?", answer: "Jednoduchá webová aplikace pro zobrazování často kladených otázek." },
        { question: "Jak správně formulovat radu?", answer: "Vždy specifikujte, jak doporučený produkt odpovídá potřebám klienta." },
        { question: "Co je rizikové životní pojištění?", answer: "Pojištění, které poskytuje finanční ochranu v případě úmrtí." },
        { question: "Jaký je správný postup při sjednání pojištění?", answer: "Nejprve analyzujte potřeby klienta a poté vyberte vhodný produkt." }
    ];

    // Vložení do HTML
    faqData.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        const question = document.createElement("div");
        question.classList.add("faq-question");
        question.innerText = item.question;
        
        const answer = document.createElement("div");
        answer.classList.add("faq-answer");
        answer.innerText = item.answer;

        question.addEventListener("click", function () {
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqList.appendChild(faqItem);
    });
});
