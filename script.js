document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.getElementById("faq-container");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const adminSection = document.getElementById("admin-section");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const questionInput = document.getElementById("question-input");
    const answerInput = document.getElementById("answer-input");

    const ADMIN_PASSWORD = "Budelip25";
    let isAdmin = false;

    function loadQuestions() {
        const storedQuestions = JSON.parse(localStorage.getItem("faq")) || [];
        faqContainer.innerHTML = "";

        storedQuestions.forEach((item, index) => {
            const questionBox = document.createElement("div");
            questionBox.classList.add("faq-item");

            const questionText = document.createElement("p");
            questionText.classList.add("faq-question");
            questionText.textContent = item.question;
            questionText.addEventListener("click", () => {
                answerBox.classList.toggle("hidden");
            });

            const answerBox = document.createElement("p");
            answerBox.classList.add("faq-answer", "hidden");
            answerBox.textContent = item.answer;

            questionBox.appendChild(questionText);
            questionBox.appendChild(answerBox);

            if (isAdmin) {
                const editBtn = document.createElement("button");
                editBtn.textContent = "✏️ Upravit";
                editBtn.addEventListener("click", () => editQuestion(index));

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌ Smazat";
                deleteBtn.addEventListener("click", () => deleteQuestion(index));

                questionBox.appendChild(editBtn);
                questionBox.appendChild(deleteBtn);
            }

            faqContainer.appendChild(questionBox);
        });
    }

    function saveQuestions(questions) {
        localStorage.setItem("faq", JSON.stringify(questions));
        loadQuestions();
    }

    function addQuestion() {
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();
        if (question && answer) {
            const storedQuestions = JSON.parse(localStorage.getItem("faq")) || [];
            storedQuestions.push({ question, answer });
            saveQuestions(storedQuestions);
            questionInput.value = "";
            answerInput.value = "";
        }
    }

    function editQuestion(index) {
        const storedQuestions = JSON.parse(localStorage.getItem("faq"));
        const newQuestion = prompt("Upravte otázku:", storedQuestions[index].question);
        const newAnswer = prompt("Upravte odpověď:", storedQuestions[index].answer);
        if (newQuestion !== null && newAnswer !== null) {
            storedQuestions[index] = { question: newQuestion, answer: newAnswer };
            saveQuestions(storedQuestions);
        }
    }

    function deleteQuestion(index) {
        const storedQuestions = JSON.parse(localStorage.getItem("faq"));
        storedQuestions.splice(index, 1);
        saveQuestions(storedQuestions);
    }

    loginBtn.addEventListener("click", function () {
        co
