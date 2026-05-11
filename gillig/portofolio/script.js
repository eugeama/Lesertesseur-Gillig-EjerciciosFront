var track = document.getElementById('carouselTrack');
var btnPrev = document.getElementById('btnPrev');
var btnNext = document.getElementById('btnNext');
var visibleCount = 3;

function updateVisibleCount() {
    if (window.innerWidth <= 600) {
        visibleCount = 1;
    } else {
        visibleCount = 3;
    }
}

window.addEventListener('resize', function() {
    updateVisibleCount();
    updateCarousel();
});

updateVisibleCount();
var currentIndex = 0;

function getCardStep() {
    var card = track.querySelector('.habilidad-card');
    var gap = parseInt(window.getComputedStyle(track).gap) || 24;
    return card.offsetWidth + gap;
}

function updateCarousel() {
    var totalCards = track.querySelectorAll('.habilidad-card').length;
    track.style.transform = 'translateX(-' + (currentIndex * getCardStep()) + 'px)';
    btnPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    btnNext.style.visibility = currentIndex + visibleCount >= totalCards ? 'hidden' : 'visible';
}

btnNext.addEventListener('click', function() {
    var totalCards = track.querySelectorAll('.habilidad-card').length;
    if (currentIndex + visibleCount < totalCards) {
        currentIndex = Math.min(currentIndex + visibleCount, totalCards - visibleCount);
        updateCarousel();
    }
});

btnPrev.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex = Math.max(currentIndex - visibleCount, 0);
        updateCarousel();
    }
});

updateCarousel();
