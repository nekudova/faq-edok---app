document.addEventListener("DOMContentLoaded", function () {
    loadQuestions();
});

// **Uložené heslo pro správce**
const ADMIN_PASSWORD = "tajneheslo";

// **Načíst otázky z localStorage**
function loadQuestions() {
    let faqList = document.getElementById("faq-list");
    faqList.innerHTML = "";

    let questions = JSON.parse(localStorage.getItem("faq")) || [];

    questions.forEach((item, index) => {
        let faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        let question = document.createElement("div");
        question.classList.add("faq-question");
        question.textContent = item.question;
        question.onclick = function () {
            let answer = this.nextElementSibling;
            answer.style.display = (answer.style.display === "block") ? "none" : "block";
        };

        let answer = document.createElement("div");
        answer.classList.add("faq-answer");
        answer.textContent = item.answer;

        // **Tlačítko pro editaci otázky (správce)**
        let editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.classList.add("edit-btn");
        editButton.onclick = function () {
            editQuestion(index);
        };

        // **Tlačítko pro odstranění (správce)**
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {
            deleteQuestion(index);
        };

        faqItem.appendChild(question);
        faqItem.appendChild(answer);

        if (isAdmin()) {
            faqItem.appendChild(editButton);
            faqItem.appendChild(deleteButton);
        }

        faqList.appendChild(faqItem);
    });
}

// **Přidání nové otázky**
function addQuestion() {
    if (!isAdmin()) {
        alert("Nemáte oprávnění přidávat otázky.");
        return;
    }

    let questionInput = document.getElementById("new-question").value.trim();
    let answerInput = document.getElementById("new-answer").value.trim();

    if (!questionInput || !answerInput) {
        alert("Vyplňte otázku i odpověď!");
        return;
    }

    let questions = JSON.parse(localStorage.getItem("faq")) || [];
    questions.push({ question: questionInput, answer: answerInput });

    localStorage.setItem("faq", JSON.stringify(questions));
    document.getElementById("new-question").value = "";
    document.getElementById("new-answer").value = "";

    loadQuestions();
}

// **Mazání otázky**
function deleteQuestion(index) {
    if (!isAdmin()) {
        alert("Nemáte oprávnění mazat otázky.");
        return;
    }

    let questions = JSON.parse(localStorage.getItem("faq")) || [];
    questions.splice(index, 1);

    localStorage.setItem("faq", JSON.stringify(questions));
    loadQuestions();
}

// **Úprava otázky**
function editQuestion(index) {
    if (!isAdmin()) {
        alert("Nemáte oprávnění upravovat otázky.");
        return;
    }

    let questions = JSON.parse(localStorage.getItem("faq")) || [];
    let newQuestion = prompt("Upravte otázku:", questions[index].question);
    let newAnswer = prompt("Upravte odpověď:", questions[index].answer);

    if (newQuestion && newAnswer) {
        questions[index] = { question: newQuestion, answer: newAnswer };
        localStorage.setItem("faq", JSON.stringify(questions));
        loadQuestions();
    }
}

// **Export otázek**
function exportQuestions() {
    let questions = JSON.parse(localStorage.getItem("faq")) || [];
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions));
    let downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "questions.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

// **Import otázek**
function importQuestions(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (e) {
        let importedQuestions = JSON.parse(e.target.result);
        localStorage.setItem("faq", JSON.stringify(importedQuestions));
        loadQuestions();
    };
    reader.readAsText(file);
}

// **Ověření správce (heslo)**
function isAdmin() {
    let storedPassword = localStorage.getItem("adminPass");
    if (storedPassword === ADMIN_PASSWORD) {
        return true;
    } else {
        let userInput = prompt("Zadejte heslo pro správce:");
        if (userInput === ADMIN_PASSWORD) {
            localStorage.setItem("adminPass", ADMIN_PASSWORD);
            return true;
        } else {
            alert("Špatné heslo!");
            return false;
        }
    }
}
