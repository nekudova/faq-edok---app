document.addEventListener("DOMContentLoaded", function () {
    const faqList = document.getElementById("faq-list");
    const loginBtn = document.getElementById("login-btn");
    const loginForm = document.getElementById("login-form");
    const submitPassword = document.getElementById("submit-password");
    const passwordInput = document.getElementById("password");
    const adminPanel = document.getElementById("admin-panel");
    const logoutBtn = document.getElementById("logout-btn");
    const addQuestionBtn = document.getElementById("add-question");
    const newQuestion = document.getElementById("new-question");
    const newAnswer = document.getElementById("new-answer");
    const correctPassword = "Budelip25";

    let questions = [
        { question: "PS sepsaná dle požadavků a potřeb klientky.", answer: "Detailní odpověď na otázku." },
        { question: "Vybraný produkt, nastavení a zvolená pojišťovna plně vyhovuje požadavkům klienta.", answer: "Více informací o tomto tématu." }
    ];

    function renderQuestions() {
        faqList.innerHTML = "";
        questions.forEach((item, index) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq-item");
            faqItem.innerHTML = `<div class='faq-question'>${item.question}</div>
                                <div class='faq-answer'>${item.answer}</div>`;
            faqItem.addEventListener("click", function () {
                const answer = this.querySelector(".faq-answer");
                answer.style.display = answer.style.display === "block" ? "none" : "block";
            });
            faqList.appendChild(faqItem);
        });
    }

    loginBtn.addEventListener("click", function () {
        loginForm.classList.toggle("hidden");
    });

    submitPassword.addEventListener("click", function () {
        if (passwordInput.value === correctPassword) {
            adminPanel.classList.remove("hidden");
            loginForm.classList.add("hidden");
        } else {
            alert("Nesprávné heslo!");
        }
    });

    logoutBtn.addEventListener("click", function () {
        adminPanel.classList.add("hidden");
        passwordInput.value = "";
    });

    addQuestionBtn.addEventListener("click", function () {
        if (newQuestion.value.trim() && newAnswer.value.trim()) {
            questions.push({ question: newQuestion.value, answer: newAnswer.value });
            newQuestion.value = "";
            newAnswer.value = "";
            renderQuestions();
        }
    });

    renderQuestions();
});
