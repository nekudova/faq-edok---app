document.addEventListener("DOMContentLoaded", function () {
    // Data – otázky a odpovědi
    const questions = [
        {
            question: "Jak zdůvodnit nastavení pojištění podle potřeb klienta?",
            answer: "Doporučený produkt [název produktu, pojistitel] byl zvolen na základě zjištěných potřeb a cílů klienta. Poradce při výběru vycházel ze zadaných preferencí, finanční situace a požadovaného rozsahu krytí. Pokud klient odmítl určité krytí, je tato skutečnost zaznamenána do ZZJ.",
            comment: "Tip: Pokud klient odmítne doplňkové krytí, vždy uveďte jeho odůvodnění – zabráníte tak výtkám při kontrolách ČNB."
        },
        {
            question: "Jaké dokumenty je nutné přiložit k ZZJ?",
            answer: "Vždy se vyplňuje ZZJ. Základní přílohy zahrnují: kalkulaci, srovnání variant, AML dotazník a další dokumenty dle vnitřních předpisů. U životního rezervotvorného pojištění je nutné připojit i simulaci vývoje smlouvy.",
            comment: "Pamatujte: ČNB vyžaduje, aby ze ZZJ bylo patrné, proč byla doporučena právě daná varianta."
        },
        {
            question: "Jak pracovat se záznamem, pokud klient přišel s jasnou preferencí (např. chce pojišťovnu Kooperativa)?",
            answer: "V ZZJ uveďte, že klient od počátku preferoval produkt konkrétní pojišťovny. Poradce ověřil, že produkt odpovídá jeho potřebám, a zaznamenal tuto skutečnost. Zároveň musí být doloženo, že poradce nabídl srovnání s jinými možnostmi.",
            comment: "Pozor: samotná preference klienta neosvobozuje poradce od povinnosti srovnání."
        }
        // Zde můžete přidávat další otázky
    ];

    // Najdeme kontejner
    const faqContainer = document.getElementById("faq-container");

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
    renderFAQ();
});
