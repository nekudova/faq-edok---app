// Data – otázky a odpovědi
const questions = [
    {
        question: "Jak zdůvodnit nastavení pojištění podle potřeb klienta?",
        answer: "Doporučený produkt [název produktu, pojistitel] byl zvolen na základě zjištěných potřeb a cílů klienta...",
        comment: "Tip: Pokud klient odmítne krytí, vždy uveďte jeho odůvodnění."
    },
    {
        question: "Jaké dokumenty je nutné přiložit k ZZJ?",
        answer: "Vždy se vyplňuje ZZJ. Základní přílohy: kalkulace, srovnání variant, AML dotazník...",
        comment: "U životního rezervotvorného pojištění také simulace vývoje smlouvy."
    }
    // → můžete přidat další položky
];

// Najdeme kontejner
const faqContainer = document.getElementById("faq");

// Vykreslení FAQ
function renderFAQ() {
    faqContainer.innerHTML = "";
    questions.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        const questionElement = document.createElement("div");
        questionElement.classList.add("faq-question");
        questionElement.textContent = item.question;

        const answerElement = document.createElement("div");
        answerElement.classList.add("faq-answer");
        answerElement.style.display = "none";

        const answerText = document.createElement("p");
        answerText.textContent = item.answer;
        answerElement.appendChild(answerText);

        if (item.comment) {
            const comment = document.createElement("p");
            comment.classList.add("faq-comment");
            comment.textContent = item.comment;
            answerElement.appendChild(comment);
        }

        questionElement.addEventListener("click", function () {
            answerElement.style.display =
                answerElement.style.display === "none" ? "block" : "none";
        });

        faqItem.appendChild(questionElement);
        faqItem.appendChild(answerElement);
        faqContainer.appendChild(faqItem);
    });
}

// Spustíme při načtení
document.addEventListener("DOMContentLoaded", renderFAQ);
