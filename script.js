/* ==========================================================
   PIZZA REDONDITOS — script.js
   ========================================================== */

/* ---------- CONFIGURACIÓN: editar estos datos ---------- */
const CONFIG = {
    WHATSAPP_NUMBER: "5491124790709",                    // WhatsApp (sin "+")
    WHATSAPP_MSG:    "Hola, quiero hacer un pedido.",
    PHONE_TEL:       "+541124790709",                    // para el botón "Llamar"
    INSTAGRAM_URL:   "https://instagram.com/pizzaredonditos",
};

/* ---------- 1. Header con efecto al hacer scroll ---------- */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

/* ---------- 2. Menú hamburguesa ---------- */
const burger  = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
    navMenu.classList.remove("open");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

burger.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
});
navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

/* ---------- 3. Pestañas del menú ---------- */
const tabs   = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Activar la pestaña clickeada y desactivar las demás
        tabs.forEach(t => {
            t.classList.toggle("active", t === tab);
            t.setAttribute("aria-selected", String(t === tab));
        });
        // Mostrar el panel correspondiente
        panels.forEach(p => {
            p.classList.toggle("active", p.id === `panel-${tab.dataset.tab}`);
        });
    });
});

/* ---------- 4. Animaciones al aparecer (scroll reveal) ---------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- 5. Enlaces dinámicos (WhatsApp / Instagram / Teléfono) ---------- */
const waURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MSG)}`;

document.querySelectorAll("[data-wa]").forEach(el  => { el.href = waURL; });
document.querySelectorAll("[data-ig]").forEach(el  => { el.href = CONFIG.INSTAGRAM_URL; });
document.querySelectorAll("[data-tel]").forEach(el => { el.href = `tel:${CONFIG.PHONE_TEL}`; });

/* ---------- 6. Año automático en el footer ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
