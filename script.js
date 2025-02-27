document.addEventListener("DOMContentLoaded", function () {
    const faqContainer = document.getElementById("faq-container");
    const adminSection = document.getElementById("admin-section");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    const ADMIN_PASSWORD = "Budelip25";
    const GITHUB_USERNAME = "nekudova";  // Váš GitHub username
    const REPO_NAME = "faq-edok---app";  // Název repozitáře
    const FILE_PATH = "questions.json";  // Cesta k souboru
    const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    let questions = [];

    function fetchQuestions() {
        fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${FILE_PATH}`)
            .then(response => response.json())
            .then(data => {
                questions = data;
                renderFAQ();
            })
            .catch(error => console.error("Chyba při načítání otázek:", error));
    }

    function saveQuestionsToGitHub() {
        const updatedContent = btoa(JSON.stringify(questions, null, 2));

        fetch(GITHUB_API_URL, {
            method: "PUT",
            headers: {
                "Authorization": "token ghp_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`,  // Sem vložte svůj GitHub token!
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Aktualizace FAQ",
                content: updatedContent,
                sha: localStorage.getItem("github_sha") // SHA kód pro správné přepsání souboru
            })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("github_sha", data.content.sha);  // Uložení SHA kódu pro další aktualizace
            renderFAQ();
        })
        .catch(error => console.error("Chyba při ukládání na GitHub:", error));
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
                        saveQuestionsToGitHub();
                    }
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌ Smazat";
                deleteBtn.classList.add("add-btn");
                deleteBtn.addEventListener("click", function () {
                    if (confirm("Opravdu chcete smazat tuto otázku?")) {
                        questions.splice(index, 1);
                        saveQuestionsToGitHub();
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
            saveQuestionsToGitHub();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        } else {
            alert("Vyplňte obě pole!");
        }
    });

    fetchQuestions();
});
