document.addEventListener("DOMContentLoaded", function () {
    loadQuestions(); // Načti otázky při načtení stránky
});

// Načíst otázky z `localStorage`
function loadQuestions() {
    let faqList = document.getElementById("faq-list");
    faqList.innerHTML = "";

    let questions = JSON.parse(localStorage.getItem("faq")) || [];

    questions.forEach((item, index) => {
        let faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        let question = document.createElement("div");
        question.classList.add("faq-question");
        question.textContent = item.question;
        question.onclick = function () {
            let answer = this.nextElementSibling;
            answer.style.display = (answer.style.display === "block") ? "none" : "block";
        };

        let answer = document.createElement("div");
        answer.classList.add("faq-answer");
        answer.textContent = item.answer;

        // Správcovská možnost smazání otázky
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️ Smazat";
        deleteButton.onclick = function () {
            deleteQuestion(index);
        };

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqItem.appendChild(deleteButton);
        faqList.appendChild(faqItem);
    });
}

// Přidat otázku
function addQuestion() {
    let questionInput = document.getElementById("new-question");
    let answerInput = document.getElementById("new-answer");

    let question = questionInput.value.trim();
    let answer = answerInput.value.trim();

    if (!question || !answer) {
        alert("Vyplňte otázku i odpověď!");
        return;
    }

    let questions = JSON.parse(localStorage.getItem("faq")) || [];
    questions.push({ question, answer });

    localStorage.setItem("faq", JSON.stringify(questions));
    questionInput.value = "";
    answerInput.value = "";

    loadQuestions();
}

// Smazání otázky
function deleteQuestion(index) {
    let questions = JSON.parse(localStorage.getItem("faq")) || [];
    questions.splice(index, 1);

    localStorage.setItem("faq", JSON.stringify(questions));
    loadQuestions();
}
