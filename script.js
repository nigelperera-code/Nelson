// Mobile menu
const btn = document.querySelector(".menu");
const panel = document.getElementById("menuPanel");

if (btn && panel) {
  btn.addEventListener("click", () => {
    const isOpen = panel.hasAttribute("hidden") === false;
    if (isOpen) {
      panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    } else {
      panel.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  panel.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Formspree AJAX
document.querySelectorAll(".js-form").forEach((form) => {
  const okId = form.getAttribute("data-success");
  const errId = form.getAttribute("data-error");
  const ok = okId ? document.getElementById(okId) : null;
  const err = errId ? document.getElementById(errId) : null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (ok) ok.hidden = true;
    if (err) err.hidden = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();
        if (ok) ok.hidden = false;
      } else {
        if (err) err.hidden = false;
      }
    } catch (ex) {
      if (err) err.hidden = false;
    }
  });
});
