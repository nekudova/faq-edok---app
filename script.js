document.addEventListener("DOMContentLoaded", function () {
    const adminPanel = document.getElementById("admin-panel");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addQuestionBtn = document.getElementById("add-question");
    const faqList = document.getElementById("faq-list");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");

    // Ukládání do Local Storage
    function loadQuestions() {
        const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        faqList.innerHTML = "";
        savedQuestions.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("faq-item");
            div.innerHTML = `<div>${item.question}</div><div class="faq-answer">${item.answer}</div>`;
            faqList.appendChild(div);
        });
    }

    // Přihlášení
    loginBtn.addEventListener("click", function () {
        const password = prompt("Zadejte heslo pro administraci:");
        if (password === "Budelip25") {
            adminPanel.classList.remove("hidden");
            adminPanel.style.opacity = "1";
            adminPanel.style.transform = "translateY(0)";
        } else {
            alert("Špatné heslo!");
        }
    });

    // Odhlášení
    logoutBtn.addEventListener("click", function () {
        adminPanel.classList.add("hidden");
        adminPanel.style.opacity = "0";
        adminPanel.style.transform = "translateY(-20px)";
    });

    // Přidání otázky
    addQuestionBtn.addEventListener("click", function () {
        const question = newQuestionInput.value.trim();
        const answer = newAnswerInput.value.trim();
        if (question && answer) {
            const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
            savedQuestions.push({ question, answer });
            localStorage.setItem("questions", JSON.stringify(savedQuestions));
            loadQuestions();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        } else {
            alert("Vyplňte obě pole!");
        }
    });

    // Export otázek
    document.getElementById("export-btn").addEventListener("click", function () {
        const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        const blob = new Blob([JSON.stringify(savedQuestions)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "questions.json";
        link.click();
    });

    // Import otázek
    document.getElementById("import-btn").addEventListener("click", function () {
        const fileInput = document.getElementById("import-file");
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const importedQuestions = JSON.parse(event.target.result);
                localStorage.setItem("questions", JSON.stringify(importedQuestions));
                loadQuestions();
            };
            reader.readAsText(file);
        } else {
            alert("Vyberte soubor k importu!");
        }
    });

    loadQuestions();
});
