/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));
/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.querySelectorAll(".skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}



skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});


/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});


/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
swiper.mousewheel.disable();

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");
const scrollWrapper = document.querySelector(".scroll__snap-wrapper");
const scrollUpBtns = document.querySelectorAll(".scroll-to-top");

function scrollActive() {
  const scrollY = scrollWrapper.scrollTop;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
scrollWrapper.addEventListener("scroll", scrollActive);

scrollUpBtns.forEach((btn) =>
  btn.addEventListener("click", () => (scrollWrapper.scrollTop = 0))
);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const scrollY = scrollWrapper.scrollTop;
  const nav = document.getElementById("header");
  if (scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
scrollWrapper.addEventListener("scroll", scrollHeader);
/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollY = scrollWrapper.scrollTop;
  const scrollUp = document.getElementById("scroll-up");
  if (scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
scrollWrapper.addEventListener("scroll", scrollUp);
/*==================== DARK LIGHT THEME ====================*/
function scrollDown() {
  const height = document.querySelector(".scroll__snap-wrapper").scrollHeight;
  const pos = document.querySelector(".scroll__snap-wrapper").scrollTop;
  const scroller = document.querySelector(".home__scroll");

  if (height - pos < window.innerHeight * 1.2) {
    scroller.classList.add("hide");
  } else {
    scroller.classList.remove("hide");
  }
}

scrollWrapper.addEventListener("scroll", scrollDown);
/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*====================  NAME TOGGLER ====================*/
const nameButton = document.querySelector(".home__name-toggler"),
  namePlaceholders = document.querySelectorAll(".home__name-placeholder");
nameButton.addEventListener("mouseover", () => {
  namePlaceholders.forEach((name) => name.classList.toggle("name-toggled"));
});


/*==================== EXPERIMENTS MODAL ====================*/
const modalViews = document.querySelectorAll(".general__modal"),
  modalBtns = document.querySelectorAll(".modal__button"),
  modalCloses = document.querySelectorAll(".general__modal-close");

let modal = function (modalClick) {
  document.getElementById(modalClick).classList.add("active-modal");
  //modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", (event) => {
    const targetID = event.target.dataset.targetModal;
    modal(targetID);
    console.log('fire')
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

window.addEventListener("click", (event) => {
  if (
    !event.target.matches(".modal__button") &&
    !event.target.parentNode.matches(".modal__button")
  ) {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  }
});