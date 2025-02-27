document.addEventListener("DOMContentLoaded", function () {
    const faqList = document.getElementById("faq-list");
    const adminPanel = document.getElementById("admin-panel");
    const adminContent = document.getElementById("admin-content");
    const loginButton = document.getElementById("login-button");
    const submitPassword = document.getElementById("submit-password");
    const passwordInput = document.getElementById("password");
    const addQuestionBtn = document.getElementById("add-question");
    const newQuestionInput = document.getElementById("new-question");
    const newAnswerInput = document.getElementById("new-answer");
    const exportBtn = document.getElementById("export");
    const importBtn = document.getElementById("import");
    const importFile = document.getElementById("import-file");

    const adminPassword = "Budelip25";
    let faqData = [];

    function renderFAQs() {
        faqList.innerHTML = "";
        faqData.forEach((faq, index) => {
            const item = document.createElement("div");
            item.classList.add("faq-item");
            item.innerHTML = `
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
                ${adminContent.classList.contains("hidden") ? "" : `<button class="delete-btn" data-index="${index}">🗑️</button>`}
            `;
            faqList.appendChild(item);

            item.querySelector(".faq-question").addEventListener("click", function () {
                const answer = this.nextElementSibling;
                answer.style.display = (answer.style.display === "block") ? "none" : "block";
            });

            if (!adminContent.classList.contains("hidden")) {
                item.querySelector(".delete-btn").addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    faqData.splice(index, 1);
                    saveFAQs();
                    renderFAQs();
                });
            }
        });
    }

    function saveFAQs() {
        localStorage.setItem("faqData", JSON.stringify(faqData));
    }

    function loadFAQs() {
        const savedData = localStorage.getItem("faqData");
        if (savedData) {
            faqData = JSON.parse(savedData);
            renderFAQs();
        }
    }

    loginButton.addEventListener("click", function () {
        adminPanel.classList.remove("hidden");
    });

    submitPassword.addEventListener("click", function () {
        if (passwordInput.value === adminPassword) {
            adminContent.classList.remove("hidden");
            passwordInput.value = "";
            renderFAQs();
        } else {
            alert("Špatné heslo!");
        }
    });

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

    exportBtn.addEventListener("click", function () {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(faqData));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "faq_export.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });

    importBtn.addEventListener("click", function () {
        const file = importFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                try {
                    faqData = JSON.parse(event.target.result);
                    saveFAQs();
                    renderFAQs();
                } catch (error) {
                    alert("Chyba při importu souboru!");
                }
            };
            reader.readAsText(file);
        }
    });

    loadFAQs();
});
