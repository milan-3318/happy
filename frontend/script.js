/* HERO LOCK */
document.body.style.overflow = "hidden";
setTimeout(() => document.body.style.overflow = "auto", 5000);

/* REVEAL */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("active");
  });
}, { threshold: 0.15 });

reveals.forEach(r => observer.observe(r));

/* CARD TAP SUPPORT */
const cards = document.querySelectorAll(".info-card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c !== card && c.classList.remove("active"));
    card.classList.toggle("active");
  });
});

/* MAGNETIC BUTTON */
document.querySelectorAll(".magnetic-btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

/* SUGGESTION FORM */
const form = document.getElementById("suggestionForm");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    name: form[0].value,
    email: form[1].value,
    message: form[2].value
  };

  try {
    await fetch("https://happy-backend-1guj.onrender.com/api/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Suggestion sent 🚀");
    form.reset();
  } catch {
    alert("Failed to send suggestion");
  }
});
