document.addEventListener("DOMContentLoaded", async function () {
    const faqContainer = document.getElementById("faq-container");

    // GitHub repo s JSON souborem
    const GITHUB_USERNAME = "nekudova";
    const GITHUB_REPO = "faq-edok---app";
    const GITHUB_FILE_PATH = "questions.json";

    let questions = [];

    // 🔹 Načtení otázek z GitHubu
    async function loadQuestions() {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main/${GITHUB_FILE_PATH}`);
            if (!response.ok) throw new Error("Nepodařilo se načíst otázky.");
            questions = await response.json();
            renderFAQ();
        } catch (error) {
            console.error("Chyba při načítání otázek:", error);
            faqContainer.innerHTML = `<p style="color:red;">❌ Nepodařilo se načíst otázky. Zkontrolujte GitHub repo.</p>`;
        }
    }

    // 🔹 Vykreslení FAQ
    function renderFAQ() {
        faqContainer.innerHTML = "";
        questions.forEach((item, index) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");

            // Otázka
            const questionElement = document.createElement("div");
            questionElement.classList.add("faq-question");
            questionElement.textContent = item.question;

            // Odpověď
            const answerElement = document.createElement("div");
            answerElement.classList.add("faq-answer");
            answerElement.textContent = item.answer;
            answerElement.style.display = "none";

            // Kliknutí na otázku
            questionElement.addEventListener("click", function () {
                const isVisible = answerElement.style.display === "block";
                document.querySelectorAll(".faq-answer").forEach(el => el.style.display = "none");
                answerElement.style.display = isVisible ? "none" : "block";
            });

            faqItem.appendChild(questionElement);
            faqItem.appendChild(answerElement);
            faqContainer.appendChild(faqItem);
        });
    }

    // 🔹 Přihlášení do admin sekce (heslo = admin123)
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const adminSection = document.getElementById("admin-section");

    loginBtn.addEventListener("click", () => {
        const password = prompt("Zadejte heslo pro přístup do admin sekce:");
        if (password === "admin123") {
            adminSection.classList.remove("hidden");
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            alert("❌ Nesprávné heslo!");
        }
    });

    logoutBtn.addEventListener("click", () => {
        adminSection.classList.add("hidden");
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    });

    // 🔹 Přidání nové otázky (lokálně)
    const addQuestionBtn = document.getElementById("add-question-btn");
    addQuestionBtn.addEventListener("click", () => {
        const newQuestion = document.getElementById("new-question").value.trim();
        const newAnswer = document.getElementById("new-answer").value.trim();

        if (newQuestion && newAnswer) {
            questions.push({ question: newQuestion, answer: newAnswer });
            renderFAQ();

            // Vymazání políček
            document.getElementById("new-question").value = "";
            document.getElementById("new-answer").value = "";

            alert("✅ Otázka byla přidána (zatím jen lokálně).");
        } else {
            alert("⚠️ Vyplňte obě pole!");
        }
    });

    loadQuestions();
});
