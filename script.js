document.addEventListener("DOMContentLoaded", function () {
    const faqList = document.getElementById("faq-list");
    const adminPanel = document.getElementById("admin-panel");
    const adminLogin = document.getElementById("admin-login");
    const submitPassword = document.getElementById("submit-password");
    const passwordInput = document.getElementById("password");
    const addQuestionBtn = document.getElementById("add-question");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");
    const showAdminBtn = document.getElementById("show-admin");
    const logoutBtn = document.getElementById("logout");

    const adminPassword = "Budelip25";
    let faqData = [];

    // Funkce pro vykreslení otázek
    function renderFAQs() {
        faqList.innerHTML = "";
        faqData.forEach((faq, index) => {
            const item = document.createElement("div");
            item.classList.add("faq-item");
            item.innerHTML = `
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
            `;
            faqList.appendChild(item);

            item.querySelector(".faq-question").addEventListener("click", function () {
                const answer = this.nextElementSibling;
                answer.style.display = (answer.style.display === "block") ? "none" : "block";
            });
        });
    }

    // Funkce pro uložení do localStorage
    function saveFAQs() {
        localStorage.setItem("faqData", JSON.stringify(faqData));
    }

    // Funkce pro načtení otázek
    function loadFAQs() {
        const savedData = localStorage.getItem("faqData");
        if (savedData) {
            faqData = JSON.parse(savedData);
            renderFAQs();
        }
    }

    // Kliknutí na tlačítko "Přihlásit"
    showAdminBtn.addEventListener("click", function () {
        adminLogin.classList.remove("hidden");
        showAdminBtn.classList.add("hidden");
    });

    // Ověření hesla a zobrazení administrace
    submitPassword.addEventListener("click", function () {
        if (passwordInput.value === adminPassword) {
            adminLogin.classList.add("hidden");
            adminPanel.classList.remove("hidden");
            passwordInput.value = "";
        } else {
            alert("Špatné heslo!");
        }
    });

    // Tlačítko odhlášení
    logoutBtn.addEventListener("click", function () {
        adminPanel.classList.add("hidden");
        showAdminBtn.classList.remove("hidden");
    });

    // Přidání nové otázky
    addQuestionBtn.addEventListener("click", function () {
        const question = newQuestionInput.value.trim();
        const answer = newAnswerInput.value.trim();
        if (question && answer) {
            faqData.push({ question, answer });
            saveFAQs();
            renderFAQs();
            newQuestionInput.value = "";
            newAnswerInput.value = "";
        }
    });

    // Načíst otázky při startu
    loadFAQs();
});
