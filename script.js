document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.getElementById("faq-container");
    const loginToggle = document.getElementById("login-toggle");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const adminSection = document.getElementById("admin-section");
    const passwordInput = document.getElementById("password");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    let isAdmin = false;
    const adminPassword = "Budelip25";
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

            // ✅ Opraveno: Kliknutí na otázku nyní správně zobrazí odpověď
            questionDiv.querySelector(".faq-question").addEventListener("click", function () {
                let answer = this.nextElementSibling;
                answer.classList.toggle("visible");
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

    loginToggle.addEventListener("click", function () {
        adminSection.style.display = "block";
        loginToggle.style.display = "none";
    });

    loginBtn.addEventListener("click", function () {
        const password = passwordInput.value;
        if (password === adminPassword) {
            isAdmin = true;
            adminSection.style.display = "block";
            logoutBtn.classList.remove("hidden");
            loginBtn.classList.add("hidden");
            passwordInput.classList.add("hidden");
            renderQuestions();
        } else {
            alert("Špatné heslo!");
        }
    });

    logoutBtn.addEventListener("click", function () {
        isAdmin = false;
        adminSection.style.display = "none";
        loginToggle.style.display = "block";
        logoutBtn.classList.add("hidden");
        loginBtn.classList.remove("hidden");
        passwordInput.classList.remove("hidden");
        renderQuestions();
    });

    addQuestionBtn.addEventListener("click", function () {
        const questionText = newQuestionInput.value.trim();
        const answerText = newAnswerInput.value.trim();
        if (questionText && answerText) {
            questions.push({ question: questionText, answer
