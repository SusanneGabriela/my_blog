// Minimal JS: theme toggle, active nav, year, post search, reading time.

(function () {
  // Footer year
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  // Active nav link
  const navLinks = document.querySelectorAll("[data-nav]");
  const path = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Theme toggle (persisted)
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  const btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // Search filter on writing page
  const search = document.querySelector("[data-post-search]");
  const list = document.querySelector("[data-post-list]");
  if (search && list) {
    const items = Array.from(list.querySelectorAll(".post-item"));
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      items.forEach((li) => {
        const title = li.querySelector(".post-link")?.textContent?.toLowerCase() || "";
        li.style.display = title.includes(q) ? "" : "none";
      });
    });
  }

  // Reading time on post page
  const reading = document.querySelector("[data-reading-time]");
  const article = document.querySelector("article.prose");
  if (reading && article) {
    const text = article.textContent || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    reading.textContent = `${minutes} min read`;
  }
})();