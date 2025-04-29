document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;

    function updateIndicators() {
        indicatorsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('carousel-indicator');
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicatorsContainer.appendChild(indicator);
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        updateIndicators();
    }

    function goToSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        showSlide(currentIndex);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }

    // initialization
    showSlide(currentIndex);
    updateIndicators();
});
