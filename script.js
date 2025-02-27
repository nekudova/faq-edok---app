document.addEventListener("DOMContentLoaded", function () {
    const faqList = document.getElementById("faq-list");
    const addQuestionForm = document.getElementById("add-question-form");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    let faqData = [
        { question: "Co je tato aplikace?", answer: "Jednoduchá webová aplikace pro zobrazování často kladených otázek." },
        { question: "Jak správně formulovat radu?", answer: "Vždy specifikujte, jak doporučený produkt odpovídá potřebám klienta." }
    ];

    function renderFAQ() {
        faqList.innerHTML = "";
        faqData.forEach((item, index) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");

            const question = document.createElement("div");
            question.classList.add("faq-question");
            question.innerText = item.question;

            const answer = document.createElement("div");
            answer.classList.add("faq-answer");
            answer.innerText = item.answer;
            answer.style.display = "none";

            question.addEventListener("click", function () {
                answer.style.display = answer.style.display === "none" ? "block" : "none";
            });

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "❌";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = function () {
                faqData.splice(index, 1);
                renderFAQ();
            };

            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqItem.appendChild(deleteButton);
            faqList.appendChild(faqItem);
        });
    }

    addQuestionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newQuestion = newQuestionInput.value.trim();
        const newAnswer = newAnswerInput.value.trim();

        if (newQuestion && newAnswer) {
            faqData.push({ question: newQuestion, answer: newAnswer });
            renderFAQ();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        }
    });

    renderFAQ();
});
