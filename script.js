// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector("#navMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Year + privacy date
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const todayEl = document.getElementById("today");
if (todayEl) {
  const d = new Date();
  const opts = { year: "numeric", month: "long", day: "numeric" };
  todayEl.textContent = d.toLocaleDateString("en-GB", opts);
}

// Formspree AJAX handling
async function postForm(form) {
  const url = form.getAttribute("action");
  const data = new FormData(form);

  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  });

  if (!res.ok) throw new Error("Form submission failed");
  return res.json();
}

function wireAjaxForms() {
  const forms = document.querySelectorAll(".js-ajaxForm");
  forms.forEach(form => {
    const successId = form.dataset.success;
    const errorId = form.dataset.error;
    const success = successId ? document.getElementById(successId) : null;
    const error = errorId ? document.getElementById(errorId) : null;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (success) success.hidden = true;
      if (error) error.hidden = true;

      const btn = form.querySelector("button[type='submit']");
      const oldText = btn ? btn.innerText : "";
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = "0.85";
        btn.innerText = "Sending…";
      }

      try {
        await postForm(form);
        form.reset();
        if (success) success.hidden = false;
      } catch (err) {
        if (error) error.hidden = false;
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.style.opacity = "";
          btn.innerText = oldText;
        }
      }
    });
  });
}

wireAjaxForms();
