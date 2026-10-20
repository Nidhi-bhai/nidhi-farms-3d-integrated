(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  var form = document.querySelector("#enquiry-form");
  var whatsapp = document.querySelector("#whatsapp-enquiry");
  var mail = document.querySelector("#mailto-fallback");

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

  function valueOf(name) {
    if (!form || !form.elements[name]) return "";
    return String(form.elements[name].value || "").trim();
  }

  function enquiryLines() {
    return [
      "Name: " + valueOf("name"),
      "Company: " + valueOf("company"),
      "Country: " + valueOf("country"),
      "Product: " + valueOf("products"),
      "Quantity: " + valueOf("quantity"),
      "Message: " + (valueOf("message") || "—")
    ];
  }

  if (whatsapp && form) {
    whatsapp.addEventListener("click", function () {
      if (!form.reportValidity()) return;
      var url = "https://wa.me/917013468981?text=" + encodeURIComponent(enquiryLines().join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  if (mail && form) {
    mail.addEventListener("click", function () {
      var body = [
        "Email: " + (valueOf("email") || "—"),
        "Phone: " + (valueOf("phone") || "—"),
        ""
      ].concat(enquiryLines()).join("\n");
      mail.href =
        "mailto:nidhifarmspvt@gmail.com?subject=" +
        encodeURIComponent("New B2B enquiry - Nidhi Farms website") +
        "&body=" +
        encodeURIComponent(body);
    });
  }
})();
