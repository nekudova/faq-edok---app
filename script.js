document.addEventListener("DOMContentLoaded", async function () {
    const faqContainer = document.getElementById("faq-container");
    const adminSection = document.getElementById("admin-section");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    const ADMIN_PASSWORD = "Budelip25"; // Změň na své heslo
    const GITHUB_USERNAME = "nekudova"; // Tvé GitHub uživatelské jméno
    const GITHUB_REPO = "faq-edok---app"; // Název tvého repozitáře
    const GITHUB_FILE_PATH = "questions.json"; // Soubor s otázkami
    const GITHUB_TOKEN = "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"; // Sem vlož svůj token!

    let questions = [];

    async function loadQuestions() {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main/${GITHUB_FILE_PATH}`);
            if (!response.ok) throw new Error("Nepodařilo se načíst otázky.");
            questions = await response.json();
            renderFAQ();
        } catch (error) {
            console.error("Chyba při načítání otázek:", error);
        }
    }

    async function saveQuestionsToGitHub() {
        const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json"
            }
        });

        if (!response.ok) {
            console.error("Nepodařilo se získat informace o souboru:", response.statusText);
            return;
        }

        const fileData = await response.json();
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(questions, null, 2))));
        const sha = fileData.sha; 

        const updateResponse = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json"
            },
            body: JSON.stringify({
                message: "Aktualizace FAQ",
                content: content,
                sha: sha
            })
        });

        if (!updateResponse.ok) {
            console.error("Chyba při ukládání:", updateResponse.statusText);
        }
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
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌ Smazat";
                deleteBtn.classList.add("add-btn");
                deleteBtn.addEventListener("click", async function () {
                    if (confirm("Opravdu chcete smazat tuto otázku?")) {
                        questions.splice(index, 1);
                        await saveQuestionsToGitHub();
                        renderFAQ();
                    }
                });

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

    addQuestionBtn.addEventListener("click", async function () {
        const newQ = newQuestionInput.value.trim();
        const newA = newAnswerInput.value.trim();
        if (newQ && newA) {
            questions.push({ question: newQ, answer: newA });
            await saveQuestionsToGitHub();
            renderFAQ();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        } else {
            alert("Vyplňte obě pole!");
        }
    });

    loadQuestions();
});
