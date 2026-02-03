const form = document.getElementById("suggestionForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector("input[type='text']").value;
  const email = form.querySelector("input[type='email']").value;
  const message = form.querySelector("textarea").value;

  try {
    const res = await fetch("https://happy-backend-1guj.onrender.com/api/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    alert("Suggestion sent successfully ✅");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Failed to send suggestion ❌");
  }
});
