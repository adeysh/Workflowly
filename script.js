const body = document.querySelector("body");
const main = document.querySelector("main");
const btnOpen = document.getElementById("nav-button-open");
const btnClose = document.getElementById("nav-button-close");
const navContent = document.querySelector(".nav__content");
const navOverlay = document.querySelector(".nav__overlay");
const media = window.matchMedia('( width < 64rem )');
const media4K = window.matchMedia('( width > 90rem )');
const testimonialContactForm =
    document.getElementById("testimonials-contact-form-section");

function openMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "true");
    body.classList.add("no-scroll");
    navContent.removeAttribute("inert");
    main.setAttribute("inert", "");
    btnClose.focus();
}

function closeMobileMenu() {
    btnOpen.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");
    navContent.setAttribute("inert", "");
    main.removeAttribute("inert");
    btnOpen.focus();
}

function handleOutsideMenuClick(e) {
    const isMenuOpen = navContent.style.display === "flex";
    const isClickInsideMenu = navContent.contains(e.target);
    const isClickOnOpenBtn = e.target.closest("#nav-button-open");

    if (isMenuOpen && !isClickInsideMenu && !isClickOnOpenBtn) {
        closeMobileMenu();
    }
}

function setupNav(e) {
    if (e.matches) {
        navContent.setAttribute("inert", "");
        setTimeout(() => {
            navContent.style.display = "flex";
            navOverlay.style.display = "block";
        }, 500);
    } else {
        navContent.removeAttribute("inert");
        navContent.style.display = "";
        main.removeAttribute("inert");
    }
}
setupNav(media);
media.addEventListener("change", setupNav);

function checkForDesktop4K(e) {
    if (e.matches) {
        console.log("is 4k");
        testimonialContactForm.classList.remove("full-bleed");
        testimonialContactForm.classList.add("wrapper");
    } else {
        console.log("is not 4k")
        testimonialContactForm.classList.remove("wrapper");
        testimonialContactForm.classList.add("full-bleed");
    }
}
checkForDesktop4K(media4K);
media4K.addEventListener("change", checkForDesktop4K);

btnOpen.addEventListener("click", openMobileMenu);

btnClose.addEventListener("click", closeMobileMenu);

document.addEventListener("click", handleOutsideMenuClick);