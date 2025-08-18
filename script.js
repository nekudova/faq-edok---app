document.addEventListener("DOMContentLoaded", async function () {
  const faqContainer = document.getElementById("faq-container");

  const GITHUB_USERNAME = "nekudova";
  const GITHUB_REPO = "faq-edok---app";
  const GITHUB_FILE_PATH = "questions.json";

  /** @type {{question:string, answer:string, comment?:string}[]} */
  let questions = [];

  async function loadQuestions() {
    try {
      const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/main/${GITHUB_FILE_PATH}`;
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Nepodařilo se načíst otázky.");
      questions = await response.json();
      renderFAQ();
    } catch (error) {
      console.error("Chyba při načítání otázek:", error);
      faqContainer.innerHTML = `<div class="faq-error">Chyba načítání dat. Zkuste obnovit stránku.</div>`;
    }
  }

  function renderFAQ() {
    faqContainer.innerHTML = "";

    questions.forEach((item, idx) => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";

      // Otázka (tlačítko)
      const questionEl = document.createElement("button");
      questionEl.className = "faq-question";
      questionEl.type = "button";
      questionEl.setAttribute("aria-expanded", "false");
      questionEl.setAttribute("aria-controls", `answer-${idx}`);
      questionEl.textContent = item.question || "Bez názvu";

      // Odpověď
      const answerWrap = document.createElement("div");
      answerWrap.className = "faq-answer";
      answerWrap.id = `answer-${idx}`;
      answerWrap.hidden = true;

      const answerText = document.createElement("div");
      answerText.className = "answer-text";
      // zachovat nové řádky
      answerText.textContent = item.answer || "";

      const commentText = document.createElement("div");
      commentText.className = "comment";
      commentText.textContent = item.comment || "";

      answerWrap.appendChild(answerText);
      if (item.comment) answerWrap.appendChild(commentText);

      // Toggle
      questionEl.addEventListener("click", () => {
        const isOpen = !answerWrap.hidden;
        answerWrap.hidden = isOpen;
        questionEl.setAttribute("aria-expanded", String(!isOpen));
        faqItem.classList.toggle("open", !isOpen);
      });

      faqItem.appendChild(questionEl);
      faqItem.appendChild(answerWrap);
      faqContainer.appendChild(faqItem);
    });
  }

  loadQuestions();
});
