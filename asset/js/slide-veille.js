document.addEventListener('DOMContentLoaded', () => {
    // 1. SÉLECTION DES ÉLÉMENTS
    const viewport = document.getElementById('carouselViewport');
    const wrapper = document.getElementById('carouselWrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    // Sécurité : Si les éléments n'existent pas sur la page, on arrête
    if (!wrapper || slides.length === 0) return;

    // 2. ÉTAT INITIAL
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    // 3. INITIALISATION TECHNIQUE
    // Création dynamique des points de pagination (dots)
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.carousel-dot');

    // 4. FONCTION CŒUR : MISE À JOUR VISUELLE
    function updateCarousel(index, smooth = true) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        currentIndex = index;

        wrapper.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        // Décalage simple et efficace : -100% par carte
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    // 5. GESTIONNAIRES D'ÉVÉNEMENTS
    nextBtn.addEventListener('click', () => {
        resetAutoplay();
        updateCarousel(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        resetAutoplay();
        updateCarousel(currentIndex - 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            resetAutoplay();
            const targetIndex = parseInt(dot.dataset.index);
            updateCarousel(targetIndex);
        });
    });

    // 6. DÉFILEMENT AUTOMATIQUE
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // 7. REDIMENSIONNEMENT
    window.addEventListener('resize', () => {
        updateCarousel(currentIndex, false);
    });

    // 8. DÉMARRAGE
    startAutoplay();
});