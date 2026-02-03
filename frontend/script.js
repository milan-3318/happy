/* ===============================
   CINEMATIC INTRO SCROLL LOCK
================================ */
document.body.style.overflow = "hidden";
setTimeout(() => {
  document.body.style.overflow = "auto";
}, 5000);

/* ===============================
   REVEAL ON SCROLL
================================ */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));

/* ===============================
   MOUSE PARALLAX (UNCHANGED)
================================ */
document.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.clientX) / 60;
  const y = (window.innerHeight / 2 - e.clientY) / 60;

  document.querySelectorAll(".card, .skills span").forEach(el => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
});

/* ===============================
   SUGGESTION FORM (FIXED)
================================ */
const form = document.getElementById("suggestionForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://happy-backend-1guj.onrender.com/api/suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        }
      );

      if (!res.ok) throw new Error("Server error");

      alert("Suggestion sent 🚀");
      form.reset();

    } catch (err) {
      console.error(err);
      alert("Failed to send suggestion");
    }
  });
}
