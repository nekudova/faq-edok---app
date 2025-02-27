document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.getElementById("faq-container");
    const adminSection = document.getElementById("admin-section");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    const ADMIN_PASSWORD = "Budelip25";

    let questions = [];

    // Funkce pro načtení otázek z GitHub JSON souboru
    function loadQuestions() {
        fetch("https://raw.githubusercontent.com/nekudova/faq-edok---app/refs/heads/main/questions.json")
            .then(response => response.json())
            .then(data => {
                questions = data;
                renderFAQ();
            })
            .catch(error => console.error("Chyba při načítání otázek:", error));
    }

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
                    if (newQ && newA) {
                        questions[index] = { question: newQ, answer: newA };
                        saveQuestions();
                        renderFAQ();
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
        const password = prompt("Zadejte heslo pro administraci:");
        if (password === ADMIN_PASSWORD) {
            adminSection.classList.remove("hidden");
            loginBtn.classList.add("hidden");
            renderFAQ();
        } else {
            alert("Nesprávné heslo!");
        }
    });

    logoutBtn.addEventListener("click", function () {
        adminSection.classList.add("hidden");
        loginBtn.classList.remove("hidden");
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

    // Načíst otázky při startu
    loadQuestions();
});
