document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const adminSection = document.getElementById("admin-section");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const faqContainer = document.getElementById("faq-container");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    let isAdmin = false;
    const adminPassword = "Budelip25"; // Heslo pro přístup do administrace
    let questions = JSON.parse(localStorage.getItem("questions")) || [];

    function renderQuestions() {
        faqContainer.innerHTML = "";
        questions.forEach((item, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("faq-item");

            questionDiv.innerHTML = `
                <div class="faq-question">${item.question}</div>
                <div class="faq-answer">${item.answer}</div>
                ${isAdmin ? `
                <button class="edit-btn" data-index="${index}">✏️ Upravit</button>
                <button class="delete-btn" data-index="${index}">❌ Smazat</button>
                ` : ""}
            `;

            questionDiv.querySelector(".faq-question").addEventListener("click", function () {
                this.nextElementSibling.classList.toggle("visible");
            });

            if (isAdmin) {
                questionDiv.querySelector(".edit-btn").addEventListener("click", function () {
                    let newQuestion = prompt("Upravte otázku:", item.question);
                    let newAnswer = prompt("Upravte odpověď:", item.answer);
                    if (newQuestion && newAnswer) {
                        questions[index] = { question: newQuestion, answer: newAnswer };
                        saveQuestions();
                        renderQuestions();
                    }
                });

                questionDiv.querySelector(".delete-btn").addEventListener("click", function () {
                    if (confirm("Opravdu chcete smazat tuto otázku?")) {
                        questions.splice(index, 1);
                        saveQuestions();
                        renderQuestions();
                    }
                });
            }

            faqContainer.appendChild(questionDiv);
        });
    }

    function saveQuestions() {
        localStorage.setItem("questions", JSON.stringify(questions));
    }

    loginBtn.addEventListener("click", function () {
        const password = prompt("Zadejte heslo:");
        if (password === adminPassword) {
            isAdmin = true;
            adminSection.style.display = "block";
            loginBtn.style.display = "none";
            renderQuestions();
        } else {
            alert("Špatné heslo!");
        }
    });

    logoutBtn.addEventListener("click", function () {
        isAdmin = false;
        adminSection.style.display = "none";
        loginBtn.style.display = "block";
        renderQuestions();
    });

    addQuestionBtn.addEventListener("click", function () {
        const questionText = newQuestionInput.value.trim();
        const answerText = newAnswerInput.value.trim();
        if (questionText && answerText) {
            questions.push({ question: questionText, answer: answerText });
            saveQuestions();
            renderQuestions();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        } else {
            alert("Vyplňte otázku i odpověď.");
        }
    });

    renderQuestions();
});
