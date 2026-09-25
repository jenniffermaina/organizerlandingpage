/* ========================================
   MADFUN FOR ORGANIZERS
======================================== */


/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuButton =
  document.querySelector(".menu-button");

const mobileNavigation =
  document.querySelector(".mobile-nav");


function closeNavigation() {
  if (!menuButton || !mobileNavigation) {
    return;
  }

  menuButton.classList.remove("open");
  mobileNavigation.classList.remove("open");
  document.body.classList.remove("locked");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open navigation"
  );
}


if (menuButton && mobileNavigation) {
  menuButton.addEventListener(
    "click",
    function () {
      const navigationIsOpen =
        mobileNavigation.classList.toggle("open");

      menuButton.classList.toggle(
        "open",
        navigationIsOpen
      );

      document.body.classList.toggle(
        "locked",
        navigationIsOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(navigationIsOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        navigationIsOpen
          ? "Close navigation"
          : "Open navigation"
      );
    }
  );


  mobileNavigation
    .querySelectorAll("a")
    .forEach(function (link) {
      link.addEventListener(
        "click",
        closeNavigation
      );
    });


  window.addEventListener(
    "resize",
    function () {
      if (window.innerWidth > 1100) {
        closeNavigation();
      }
    }
  );
}


/* ========================================
   SECTION REVEAL ANIMATION
======================================== */

const revealItems =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {
  const revealObserver =
    new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px"
      }
    );


  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}


/* ========================================
   NUMBER COUNTING EFFECT
======================================== */

const counters =
  document.querySelectorAll("[data-count]");


function displayCounterValue(
  element,
  value
) {
  const decimalPlaces =
    Number(element.dataset.decimals || 0);

  const prefix =
    element.dataset.prefix || "";

  const suffix =
    element.dataset.suffix || "";


  const formattedValue =
    new Intl.NumberFormat(
      "en",
      {
        minimumFractionDigits:
          decimalPlaces,

        maximumFractionDigits:
          decimalPlaces
      }
    ).format(value);


  element.textContent =
    `${prefix}${formattedValue}${suffix}`;
}


function animateCounter(element) {
  const targetValue =
    Number(element.dataset.count || 0);

  const decimalPlaces =
    Number(element.dataset.decimals || 0);

  const decimalFactor =
    Math.pow(10, decimalPlaces);

  const animationDuration = 1400;
  const startingTime = performance.now();


  function updateCounter(currentTime) {
    const elapsedTime =
      currentTime - startingTime;

    const progress =
      Math.min(
        elapsedTime / animationDuration,
        1
      );


    /*
      Easing slows the number down as it
      approaches its final value.
    */

    const easedProgress =
      1 - Math.pow(1 - progress, 3);


    const currentValue =
      Math.round(
        targetValue *
        easedProgress *
        decimalFactor
      ) / decimalFactor;


    displayCounterValue(
      element,
      currentValue
    );


    if (progress < 1) {
      requestAnimationFrame(
        updateCounter
      );
    } else {
      displayCounterValue(
        element,
        targetValue
      );
    }
  }


  requestAnimationFrame(
    updateCounter
  );
}


if ("IntersectionObserver" in window) {
  const counterObserver =
    new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -30px"
      }
    );


  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
} else {
  counters.forEach(function (counter) {
    const targetValue =
      Number(counter.dataset.count || 0);

    displayCounterValue(
      counter,
      targetValue
    );
  });
}


/* ========================================
   FAQ ACCORDION
======================================== */

const faqItems =
  document.querySelectorAll(".faq details");


faqItems.forEach(function (item) {
  item.addEventListener(
    "toggle",
    function () {
      if (!item.open) {
        return;
      }

      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  );
});


/* ========================================
   FLOATING ACTION MENU
======================================== */

const actionDock =
  document.querySelector(".action-dock");

const actionDockButton =
  actionDock
    ? actionDock.querySelector("button")
    : null;


function closeActionDock() {
  if (!actionDock || !actionDockButton) {
    return;
  }

  actionDock.classList.remove("open");

  actionDockButton.setAttribute(
    "aria-expanded",
    "false"
  );
}


if (actionDock && actionDockButton) {
  actionDockButton.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();

      const menuIsOpen =
        actionDock.classList.toggle("open");

      actionDockButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );
    }
  );


  actionDock
    .querySelectorAll("a")
    .forEach(function (link) {
      link.addEventListener(
        "click",
        closeActionDock
      );
    });


  document.addEventListener(
    "click",
    function (event) {
      if (!actionDock.contains(event.target)) {
        closeActionDock();
      }
    }
  );


  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        closeActionDock();
        closeNavigation();
      }
    }
  );
}


/* ========================================
   CURRENT YEAR
======================================== */

const yearElement =
  document.querySelector("#year");


if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}