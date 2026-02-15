// slogans.js
// Controls: tile rendering, modal open/close, tab switching.
// Edit/add slogans in the `SLOGANS` array anytime.

const SLOGANS = [
  {
    slogan: "My body, my choice",
    subtitle: "An autonomy claim that often assumes a crucial premise.",
    fallacy:
      "Equivocation / Begging the question: it assumes the unborn child is simply part of 'my body' rather than a distinct human life. The real question is whether another human being is involved—and what moral duties follow if so.",
    respondText:
      "Surface the hidden premise gently. If there are two humans involved, autonomy-language alone can’t do all the moral work.",
    respondQuote:
      "Can I ask a clarifying question—are we assuming the unborn is part of the mother’s body, or a distinct human life? Because that changes what ‘choice’ means."
  },
  {
    slogan: "Love is love",
    subtitle: "A phrase that can blur important moral categories.",
    fallacy:
      "Category error: it treats all forms of 'love' as morally identical. But 'love' is a broad term (friendship, parental, romantic, sacrificial), and moral reasoning depends on the type of relationship and its boundaries.",
    respondText:
      "Affirm love’s importance, then ask what kind of love is meant and what boundaries apply—so the conversation isn’t won by vagueness.",
    respondQuote:
      "I agree love matters. When we say ‘love,’ do we mean any affection, or a specific kind of relationship with specific boundaries?"
  },
  {
    slogan: "No uterus, no opinion",
    subtitle: "A way of disqualifying arguments based on identity.",
    fallacy:
      "Ad hominem / Genetic fallacy: it dismisses reasoning based on who is speaking rather than what is said. Moral questions aren’t settled by biology; they’re settled by truth and reasons.",
    respondText:
      "Acknowledge lived experience while insisting arguments still need to be evaluated on their merits.",
    respondQuote:
      "Experience matters, but can we still weigh the reasons? If an argument is true, it should stand regardless of who says it."
  },
  {
    slogan: "Abortion is healthcare",
    subtitle: "A moral conclusion packaged as a positive label.",
    fallacy:
      "Loaded language: using a strongly positive term can smuggle in a moral conclusion. It can also blur the difference between treating illness and intentionally ending a developing human life.",
    respondText:
      "Ask what condition is being treated and what the act is doing. Keep it factual and calm.",
    respondQuote:
      "When we say ‘healthcare,’ what condition is being treated here—and how are we defining the unborn in that framework?"
  },
  {
    slogan: "Follow the science",
    subtitle: "Good advice—until it replaces moral reasoning.",
    fallacy:
      "Oversimplification: science provides data and models, but policy and ethics include value judgments. Facts help, but they don’t automatically tell us what we ought to do.",
    respondText:
      "Agree science matters, then ask which values are being applied to the data.",
    respondQuote:
      "I’m all for good science. After we have the data, what values are we using to decide what we should do?"
  },
  {
    slogan: "Science is settled",
    subtitle: "A conversation-stopper disguised as certainty.",
    fallacy:
      "Appeal to authority / Appeal to finality: it suggests disagreement is illegitimate because experts exist. Even strong consensus doesn’t settle philosophical questions, and science itself remains open to revision.",
    respondText:
      "Ask what specific claim is settled and what part is actually moral or philosophical.",
    respondQuote:
      "Which specific scientific claim is settled here—and which part of this is a moral or philosophical conclusion?"
  },
  {
    slogan: "You can’t legislate morality",
    subtitle: "A claim that accidentally undermines law itself.",
    fallacy:
      "Self-contradiction: every law reflects moral judgments about harm, rights, and justice. The real debate is which morals and what definition of harm will guide us.",
    respondText:
      "Show that laws necessarily enforce some moral vision, then ask which vision best protects human dignity.",
    respondQuote:
      "All laws legislate morality somehow—against theft, assault, fraud. The question is: which moral framework best protects human dignity?"
  },
  {
    slogan: "Trans women are women",
    subtitle: "A claim that can shift definitions without stating them.",
    fallacy:
      "Redefinition / Equivocation: it can move between biological sex, gender identity, and social role without acknowledging the switch. Clear thinking requires stating which definition is being used and why.",
    respondText:
      "Aim for clarity and respect. Ask what sense of ‘woman’ is meant in this context (biological, identity, legal/social), because different contexts use different criteria.",
    respondQuote:
      "To understand you properly—are we using ‘woman’ in a biological sense, an identity sense, or a legal/social sense? The answer changes what follows."
  }
];

// -------- Helpers --------
function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element with id="${id}"`);
  return el;
}

function setAriaSelected(button, selected) {
  button.setAttribute("aria-selected", selected ? "true" : "false");
}

// -------- Modal / UI wiring --------
const grid = $("sloganGrid");
const modal = $("modal");
const modalTitle = $("modalTitle");
const modalSubtitle = $("modalSubtitle");
const fallacyText = $("fallacyText");
const respondText = $("respondText");
const respondQuote = $("respondQuote");

function setTab(name) {
  document.querySelectorAll(".tab").forEach(btn => {
    const active = btn.dataset.tab === name;
    btn.classList.toggle("active", active);
    setAriaSelected(btn, active);
  });

  $("pane-fallacy").classList.toggle("active", name === "fallacy");
  $("pane-respond").classList.toggle("active", name === "respond");
}

function openModal(item) {
  modalTitle.textContent = item.slogan;
  modalSubtitle.textContent = item.subtitle;
  fallacyText.textContent = item.fallacy;
  respondText.textContent = item.respondText;
  respondQuote.textContent = item.respondQuote;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  setTab("fallacy");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

// -------- Render tiles --------
function renderTiles(items) {
  grid.innerHTML = "";
  items.forEach((item, idx) => {
    const tile = document.createElement("button");
    tile.className = "tile";
    tile.type = "button";
    tile.innerHTML = `
      <span class="tile__num">${idx + 1}</span>
      <span class="tile__title">${item.slogan}</span>
      <span class="tile__hint">Click to unpack</span>
    `;
    tile.addEventListener("click", () => openModal(item));
    grid.appendChild(tile);
  });
}

renderTiles(SLOGANS);

// -------- Event listeners --------

// Close when clicking overlay or X button (both have data-close="true")
modal.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.dataset && target.dataset.close === "true") {
    closeModal();
  }
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

// Tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});
