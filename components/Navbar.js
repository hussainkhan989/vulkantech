const navbar = document.getElementById("navbar");

Navbar();
function Navbar() {
  navbar.innerHTML = "";
  navbar.setAttribute("aria-label", "Primary");
  const div = document.createElement("div");
  div.classList.add("container");
  div.classList.add("justify-");
  div.innerHTML = `
    <a class="navbar-brand brand-logo" href="./index.html" aria-label="Vulkantech home">
                <img
              class="img-fluid logo-light"
              src="./images/mylogo.png"
              alt="Vulkantech logo"
              width="155"
              height="40"
                />
                <img
                  class="img-fluid logo-dark"
                  src="./images/mylogowhite.png"
                  alt="Vulkantech logo"
                  width="155"
                  height="40"
                />
          </a>
          <button
            class="navbar-toggler rounded-pill"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" data-nav-link="aboutUs.html" href="./aboutUs.html"
                  >About Us</a
                >
              </li>
              <li class="nav-item ms-md-1">
                <a class="nav-link" data-nav-link="service.html" href="./service.html">Services</a>
              </li>
              <li class="nav-item ms-md-1">
                <a class="nav-link" data-nav-link="portfolio.html" href="./portfolio.html">Portfolio</a>
              </li>
              <li class="nav-item mx-md-1">
                <a class="nav-link" data-nav-link="contact.html" href="./contact.html">Contact</a>
              </li>
              <li class="nav-item mx-md-1">
                <a class="nav-link" data-nav-link="contact.html" href="./careers.html">Careers</a>
              </li>
            </ul>

            <button
              type="button"
              id="themeToggleBtn"
              class="theme-toggle-btn"
              aria-label="Toggle dark mode"
              aria-pressed="false"
            >
              <i class="bi bi-moon-stars-fill" aria-hidden="true"></i>
            </button>
            
          </div>
    `;
  navbar.appendChild(div);

  const themeToggleBtn = navbar.querySelector("#themeToggleBtn");
  const themeIcon = themeToggleBtn.querySelector("i");

  function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    themeToggleBtn.setAttribute("aria-pressed", isDark);
  }
  updateThemeIcon();

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon();
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navbar.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.dataset.navLink === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}
