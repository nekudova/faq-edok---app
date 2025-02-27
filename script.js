document.addEventListener("DOMContentLoaded", async function () {
    const faqContainer = document.getElementById("faq-container");

    const GITHUB_USERNAME = "nekudova"; 
    const GITHUB_REPO = "faq-edok---app"; 
    const GITHUB_FILE_PATH = "questions.json"; 

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

    function renderFAQ() {
        faqContainer.innerHTML = "";
        questions.forEach((item) => {
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
            faqContainer.appendChild(faqItem);
        });
    }

    loadQuestions();
});
