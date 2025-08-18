document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById("faq-container");
  const searchInput = document.getElementById("search");
  const clearBtn = document.getElementById("clear-search");

  // Zdroj dat: 1) lokální soubor questions.json (doporučeno), 2) GitHub raw.
  const USE_GITHUB = true;
  const GITHUB_USERNAME = "nekudova";
  const GITHUB_REPO = "faq-edok---app";
  const GITHUB_FILE_PATH = "questions.json";

  /** @type {{question:string,answer:string,comment?:string}[]} */
  let questions = [];
  let filtered = [];

  async function loadQuestions() {
    try {
      const url = USE_GITHUB
        ? `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main/${GITHUB_FILE_PATH}`
        : "questions.json";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Načtení selhalo");
      questions = await res.json();
      filtered = questions.slice();
      renderFAQ();
    } catch (e) {
      faqContainer.innerHTML =
        `<div class="answer-text">Chyba načítání dat. Zkontrolujte questions.json.</div>`;
      console.error(e);
    }
  }

  function renderFAQ() {
    faqContainer.innerHTML = "";
    filtered.forEach((item, idx) => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";
      faqItem.setAttribute("role", "listitem");

      const qBtn = document.createElement("button");
      qBtn.className = "faq-question";
      qBtn.type = "button";
      qBtn.textContent = item.question || "Bez názvu";
      qBtn.setAttribute("aria-expanded", "false");
      qBtn.setAttribute("aria-controls", `ans-${idx}`);

      const ans = document.createElement("div");
      ans.className = "faq-answer";
      ans.id = `ans-${idx}`;

      const aText = document.createElement("div");
      aText.className = "answer-text";
      aText.textContent = item.answer || "";

      ans.appendChild(aText);

      if (item.comment) {
        const cText = document.createElement("div");
        cText.className = "comment";
        cText.textContent = item.comment;
        ans.appendChild(cText);
      }

      qBtn.addEventListener("click", () => {
        const open = faqItem.classList.toggle("open");
        qBtn.setAttribute("aria-expanded", String(open));
      });

      faqItem.appendChild(qBtn);
      faqItem.appendChild(ans);
      faqContainer.appendChild(faqItem);
    });
  }

  // Vyhledávání
  function applySearch() {
    const q = (searchInput?.value || "").toLowerCase().trim();
    if (!q) {
      filtered = questions.slice();
    } else {
      filtered = questions.filter(
        (it) =>
          (it.question && it.question.toLowerCase().includes(q)) ||
          (it.answer && it.answer.toLowerCase().includes(q)) ||
          (it.comment && it.comment.toLowerCase().includes(q))
      );
    }
    renderFAQ();
  }

  searchInput?.addEventListener("input", applySearch);
  clearBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    applySearch();
    searchInput?.focus();
  });

  // Admin demo (lokální)
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const adminSection = document.getElementById("admin-section");
  const addBtn = document.getElementById("add-question-btn");

  loginBtn?.addEventListener("click", () => {
    const pwd = prompt("Heslo pro administraci:");
    if (pwd === "admin123") {
      adminSection.classList.remove("hidden");
      adminSection.setAttribute("aria-hidden", "false");
      loginBtn.style.display = "none";
    } else {
      alert("Nesprávné heslo.");
    }
  });

  logoutBtn?.addEventListener("click", () => {
    adminSection.classList.add("hidden");
    adminSection.setAttribute("aria-hidden", "true");
    loginBtn.style.display = "block";
  });

  addBtn?.addEventListener("click", () => {
    const q = document.getElementById("new-question").value.trim();
    const a = document.getElementById("new-answer").value.trim();
    const c = document.getElementById("new-comment").value.trim();
    if (!q || !a) { alert("Vyplňte otázku i odpověď."); return; }
    questions.push({ question: q, answer: a, comment: c || undefined });
    filtered = questions.slice();
    renderFAQ();
    document.getElementById("new-question").value = "";
    document.getElementById("new-answer").value = "";
    document.getElementById("new-comment").value = "";
    alert("Otázka přidána (lokálně). Uložení na GitHub řešte pull requestem.");
  });

  loadQuestions();
});
