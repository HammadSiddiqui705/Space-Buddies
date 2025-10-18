document.addEventListener("DOMContentLoaded", function () {
  fetch("/components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const navLinks = document.querySelectorAll(".nav-link");

      navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");

        if (linkHref === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
});
