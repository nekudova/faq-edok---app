function renderFAQ() {
    faqContainer.innerHTML = "";
    questions.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        // Otázka jako <button>
        const questionElement = document.createElement("button");
        questionElement.className = "faq-question";
        questionElement.type = "button";
        questionElement.textContent = item.question;

        // Kontejner odpovědi
        const answerElement = document.createElement("div");
        answerElement.className = "faq-answer";

        // Text odpovědi
        const answerText = document.createElement("div");
        answerText.className = "answer-text";
        answerText.textContent = item.answer || "";

        // Komentář (pokud existuje)
        if (item.comment) {
            const commentText = document.createElement("div");
            commentText.className = "comment";
            commentText.textContent = item.comment;
            answerElement.appendChild(answerText);
            answerElement.appendChild(commentText);
        } else {
            answerElement.appendChild(answerText);
        }

        // Kliknutí na otázku – otevře/zavře jen tu jednu
        questionElement.addEventListener("click", function () {
            faqItem.classList.toggle("open");
        });

        // Složení prvků
        faqItem.appendChild(questionElement);
        faqItem.appendChild(answerElement);
        faqContainer.appendChild(faqItem);
    });
}
