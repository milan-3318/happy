/* Prevent scroll during cinematic intro */
document.body.style.overflow = "hidden";
setTimeout(() => {
  document.body.style.overflow = "auto";
}, 5000);

/* Reveal on scroll */
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

/* Subtle mouse parallax */
document.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.clientX) / 60;
  const y = (window.innerHeight / 2 - e.clientY) / 60;

  document.querySelectorAll(".card, .skills span").forEach(el => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
});

const form = document.getElementById("suggestionForm");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    name: form.children[0].value,
    email: form.children[1].value,
    message: form.children[2].value
  };

  const res = await fetch("http://localhost:5000/api/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Suggestion sent successfully");
    form.reset();
  } else {
    alert("Something went wrong");
  }
});
