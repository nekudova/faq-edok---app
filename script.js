// Seznam otázek a odpovědí (bude uložen v LocalStorage)
let faqs = JSON.parse(localStorage.getItem("faqs")) || [];

// Funkce pro zobrazení FAQ
function renderFAQs() {
    let faqList = document.getElementById("faq-list");
    faqList.innerHTML = "";

    faqs.forEach((faq, index) => {
        let item = document.createElement("div");
        item.classList.add("faq-item");

        let question = document.createElement("div");
        question.classList.add("faq-question");
        question.innerText = faq.question;
        question.onclick = () => answer.style.display = answer.style.display === "block" ? "none" : "block";

        let answer = document.createElement("div");
        answer.classList.add("faq-answer");
        answer.innerText = faq.answer;

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = () => deleteFAQ(index);

        item.appendChild(question);
        item.appendChild(answer);
        item.appendChild(deleteBtn);
        faqList.appendChild(item);
    });
}

// Přidání nové otázky
function addFAQ() {
    let question = document.getElementById("questionInput").value.trim();
    let answer = document.getElementById("answerInput").value.trim();

    if (question && answer) {
        faqs.push({ question, answer });
        localStorage.setItem("faqs", JSON.stringify(faqs));
        renderFAQs();
        document.getElementById("questionInput").value = "";
        document.getElementById("answerInput").value = "";
    } else {
        alert("Zadejte otázku i odpověď!");
    }
}

// Smazání otázky
function deleteFAQ(index) {
    if (confirm("Opravdu chcete smazat tuto otázku?")) {
        faqs.splice(index, 1);
        localStorage.setItem("faqs", JSON.stringify(faqs));
        renderFAQs();
    }
}

// Export otázek
function exportFAQs() {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(faqs));
    let downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "faq.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

// Import otázek
function importFAQs() {
    let fileInput = document.getElementById("importFile");
    let file = fileInput.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            faqs = JSON.parse(e.target.result);
            localStorage.setItem("faqs", JSON.stringify(faqs));
            renderFAQs();
        };
        reader.readAsText(file);
    }
}

// Přihlášení správce
function checkPassword() {
    let password = document.getElementById("passwordInput").value;
    if (password === "Budelip25") {
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("passwordContainer").style.display = "none";
    } else {
        alert("Špatné heslo!");
    }
}

// Načtení otázek při načtení stránky
document.addEventListener("DOMContentLoaded", renderFAQs);
