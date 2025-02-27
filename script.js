document.addEventListener("DOMContentLoaded", function () {
    let questions = JSON.parse(localStorage.getItem("faq")) || [];

    function renderQuestions() {
        const faqContainer = document.getElementById("faq-container");
        faqContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");

            const questionElement = document.createElement("div");
            questionElement.classList.add("faq-question");
            questionElement.textContent = q.question;
            questionElement.addEventListener("click", () => {
                answerElement.style.display = answerElement.style.display === "none" ? "block" : "none";
            });

            const answerElement = document.createElement("div");
            answerElement.classList.add("faq-answer");
            answerElement.textContent = q.answer;
            answerElement.style.display = "none";

            const editButton = document.createElement("button");
            editButton.textContent = "Upravit";
            editButton.classList.add("edit-btn");
            editButton.addEventListener("click", () => editQuestion(index));

            faqItem.appendChild(questionElement);
            faqItem.appendChild(answerElement);
            faqItem.appendChild(editButton);
            faqContainer.appendChild(faqItem);
        });
    }

    function editQuestion(index) {
        const newQuestion = prompt("Upravte otázku:", questions[index].question);
        const newAnswer = prompt("Upravte odpověď:", questions[index].answer);

        if (newQuestion && newAnswer) {
            questions[index] = { question: newQuestion, answer: newAnswer };
            localStorage.setItem("faq", JSON.stringify(questions));
            renderQuestions();
        }
    }

    document.getElementById("add-question-btn").addEventListener("click", function () {
        const questionInput = document.getElementById("question-input").value.trim();
        const answerInput = document.getElementById("answer-input").value.trim();

        if (questionInput && answerInput) {
            questions.push({ question: questionInput, answer: answerInput });
            localStorage.setItem("faq", JSON.stringify(questions));
            renderQuestions();
            document.getElementById("question-input").value = "";
            document.getElementById("answer-i
