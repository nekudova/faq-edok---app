document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.getElementById("faq-container");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const adminSection = document.getElementById("admin-section");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    let isAdmin = false;
    const adminPassword = "Budelip25";

    const questions = [
        { question: "Co je tato aplikace?", answer: "Jednoduchá webová aplikace pro zobrazování často kladených otázek." },
        { question: "Jak správně formulovat radu?", answer: "Vždy specifikujte, jak doporučený produkt odpovídá potřebám klienta." }
    ];

    function renderQuestions() {
        faqContainer.innerHTML = "";
        questions.forEach((item, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("faq-item");
            questionElement.innerHTML = `<div class="faq-question">${item.question}</div><div class="faq-answer">${item.answer}</div>`;
            
            questionElement.querySelector(".faq-question").addEventListener("click", function () {
                this.nextElementSibling.classList.toggle("visible");
            });

            if (isAdmin) {
                const editBtn = document.createElement("button");
                editBtn.textContent = "✏ Upravit";
                editBtn.classList.add("edit-btn");
                editBtn.onclick = function () {
                    const newQ = prompt("Upravte otázku:", item.question);
                    const newA = prompt("Upravte odpověď:", item.answer);
                    if (newQ && newA) {
                        questions[index] = { question: newQ, answer: newA };
                        renderQuestions();
                    }
                };

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌ Smazat";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = function () {
                    questions.splice(index, 1);
                    renderQuestions();
                };

                questionElement.appendChild(editBtn);
                questionElement.appendChild(deleteBtn);
            }

            faqContainer.appendChild(questionElement);
        });
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
        const newQ = newQuestionInput.value.trim();
        const newA = newAnswerInput.value.trim();
        if (newQ && newA) {
            questions.push({ question: newQ, answer: newA });
            newQuestionInput.value = "";
            newAnswerInput.value = "";
            renderQuestions();
        } else {
            alert("Zadejte platnou otázku a odpověď!");
        }
    });

    renderQuestions();
});

