document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.getElementById("faq-container");
    const adminSection = document.getElementById("admin-section");
    const loginSection = document.getElementById("login-section");
    const passwordInput = document.getElementById("password-input");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    const ADMIN_PASSWORD = "Budelip25";
    
    let questions = JSON.parse(localStorage.getItem("questions")) || [
        { question: "Co je tato aplikace?", answer: "Jednoduchá FAQ aplikace." },
        { question: "Jak správně formulovat radu?", answer: "Vždy uveďte konkrétní příklad." }
    ];

    function saveQuestions() {
        localStorage.setItem("questions", JSON.stringify(questions));
    }

    function renderFAQ() {
        faqContainer.innerHTML = "";
        questions.forEach((item, index) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");

            const questionElement = document.createElement("div");
            questionElement.classList.add("faq-question");
            questionElement.textContent = item.question;

            const answerElement = document.createElement("div");
            answerElement.classList.add("faq-answer");
            answerElement.textContent = item.answer;
            answerElement.style.display = "none";

            questionElement.addEventListener("click", function () {
                answerElement.style.display = answerElement.style.display === "none" ? "block" : "none";
            });

            faqItem.appendChild(questionElement);
            faqItem.appendChild(answerElement);

            if (!adminSection.classList.contains("hidden")) {
                const editBtn = document.createElement("button");
                editBtn.textContent = "✏️ Upravit";
                editBtn.classList.add("add-btn");
                editBtn.addEventListener("click", function () {
                    const newQ = prompt("Upravte otázku:", item.question);
                    const newA = prompt("Upravte odpověď:", item.answer);
                    if (newQ !== null && newA !== null && newQ.trim() !== "" && newA.trim() !== "") {
                        questions[index] = { question: newQ, answer: newA };
                        saveQuestions();
                        renderFAQ();
                    } else {
                        alert("Otázka ani odpověď nesmí být prázdná!");
                    }
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌ Smazat";
                deleteBtn.classList.add("add-btn");
                deleteBtn.addEventListener("click", function () {
                    if (confirm("Opravdu chcete smazat tuto otázku?")) {
                        questions.splice(index, 1);
                        saveQuestions();
                        renderFAQ();
                    }
                });

                faqItem.appendChild(editBtn);
                faqItem.appendChild(deleteBtn);
            }

            faqContainer.appendChild(faqItem);
        });
    }

    loginBtn.addEventListener("click", function () {
        const password = passwordInput.value.trim();
        if (password === ADMIN_PASSWORD) {
            adminSection.classList.remove("hidden");
            loginSection.classList.add("hidden");
            passwordInput.value = "";
            renderFAQ();
        } else {
            alert("Nesprávné heslo!");
        }
    });

    logoutBtn.addEventListener("click", function () {
        adminSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
        renderFAQ();
    });

    addQuestionBtn.addEventListener("click", function () {
        const newQ = newQuestionInput.value.trim();
        const newA = newAnswerInput.value.trim();
        if (newQ && newA) {
            questions.push({ question: newQ, answer: newA });
            saveQuestions();
            renderFAQ();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        } else {
            alert("Vyplňte obě pole!");
        }
    });

    renderFAQ();
});
