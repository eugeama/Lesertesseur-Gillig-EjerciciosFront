document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector("[data-mobile-carousel]");
    if (!gallery) {
        return;
    }

    const slides = Array.from(gallery.querySelectorAll("img.twstinicio"));
    if (slides.length === 0) {
        return;
    }

    let currentIndex = 0;

    const controls = document.createElement("div");
    controls.className = "carousel-controls";

    const prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "carousel-btn carousel-prev";
    prevButton.textContent = "‹";
    prevButton.setAttribute("aria-label", "Imagen anterior");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "carousel-btn carousel-next";
    nextButton.textContent = "›";
    nextButton.setAttribute("aria-label", "Imagen siguiente");

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    gallery.appendChild(controls);

    const dots = document.createElement("div");
    dots.className = "carousel-dots";

    const dotButtons = slides.map(function (_, index) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Ir a imagen " + (index + 1));
        dot.addEventListener("click", function () {
            goToSlide(index);
        });
        dots.appendChild(dot);
        return dot;
    });

    gallery.appendChild(dots);

    function isMobile() {
        return window.matchMedia("(max-width: 600px)").matches;
    }

    function updateSlides() {
        const mobile = isMobile();

        slides.forEach(function (slide, index) {
            if (!mobile) {
                slide.style.display = "block";
                slide.classList.remove("is-active");
                return;
            }

            const isActive = index === currentIndex;
            slide.style.display = isActive ? "block" : "none";
            slide.classList.toggle("is-active", isActive);
        });

        dotButtons.forEach(function (dot, index) {
            dot.classList.toggle("is-active", index === currentIndex);
        });

        controls.style.display = mobile ? "flex" : "none";
        dots.style.display = mobile ? "flex" : "none";
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateSlides();
    }

    prevButton.addEventListener("click", function () {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        goToSlide(currentIndex + 1);
    });

    window.addEventListener("resize", updateSlides);
    updateSlides();
});
