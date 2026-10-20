(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  var form = document.querySelector("#enquiry-form");
  var status = document.querySelector("#form-status");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (!form || !status) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var product = String(data.get("product") || "").trim();
    var company = String(data.get("company") || "").trim();
    var lines = [
      "Bulk enquiry for Nidhi Farms",
      "",
      "Name: " + String(data.get("name") || "").trim(),
      "Company: " + company,
      "Email: " + String(data.get("email") || "").trim(),
      "Country: " + String(data.get("country") || "").trim(),
      "Product: " + product,
      "Specification: " + (String(data.get("spec") || "").trim() || "—"),
      "Quantity: " + String(data.get("quantity") || "").trim(),
      "Sample requested: " + (data.get("sample") ? "Yes" : "No"),
      "Lab report requested: " + (data.get("report") ? "Yes" : "No"),
      "",
      "Notes:",
      String(data.get("message") || "").trim() || "—"
    ];

    var href =
      "mailto:nidhifarmspvt@gmail.com?subject=" +
      encodeURIComponent("Bulk enquiry: " + product + " — " + company) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    status.textContent =
      "Opening your email app with this enquiry addressed to nidhifarmspvt@gmail.com. If nothing opens, send the same details there directly.";
    window.location.href = href;
  });
})();
