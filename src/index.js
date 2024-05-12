function setTheme(theme) {
  console.debug(`Setting theme to ${theme}, page will use configured theme`);
  document.querySelector("html").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function clearTheme() {
  console.debug("Clearing theme, page will use the system theme");
  document.querySelector("html").removeAttribute("data-theme");
  localStorage.removeItem("theme");
}

function toggleTheme() {
  const theme = document.querySelector("html").getAttribute("data-theme");
  const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (systemLight) {
    theme === "dark" ? clearTheme() : setTheme('light');
  } else if (systemDark) {
    theme === "light" ? clearTheme() : setTheme('light');
  } else {
    theme === "dark" ? setTheme("dark") : setTheme('light');
  }
}

function initTheme() {
  console.debug("Configuring theme toggles");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme !== null) {
    document.querySelector("html").setAttribute("data-theme", storedTheme);
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((element) => {
    element.addEventListener("click", toggleTheme);
  });
}

window.onload = () => {
  initTheme();
}
