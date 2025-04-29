const carouselContainer = document.querySelector('.carousel-container');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const dotsContainer = document.querySelector('.carousel-dots');
const slidesData = [
  {
    image: "images/image1.png",
    url: "https://www.facebook.com/BrightiqueMotion"
  },
  {
    image: "images/image2.png",
    url: "https://www.facebook.com/FahimWithVideo"
  },
  {
    image: "images/image3.png",
    url: "https://www.facebook.com"
  }
  // আপনার সকল ইমেজ পাথ এবং URL এখানে অবজেক্ট আকারে দিন
];
const slideCount = slidesData.length;
let currentIndex = 0;
let slideInterval;
const slideDuration = 5000; // মিলিসেকেন্ডে স্লাইড পরিবর্তনের সময়

function initializeCarousel() {
  createSlides();
  createDots();
  startInterval();
  const carouselLinks = carouselWrapper.querySelectorAll('.carousel-slide a');
  carouselLinks.forEach(link => {
    link.style.cursor = 'pointer';
  });
}

function createSlides() {
  carouselWrapper.innerHTML = '';
  slidesData.forEach(slideData => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    const link = document.createElement('a');
    link.href = slideData.url; // <- এখানে আপনার দেওয়া URL ব্যবহার হচ্ছে
    link.target = '_blank';
    const img = document.createElement('img');
    img.src = slideData.image;
    img.classList.add('carousel-image');
    link.appendChild(img);
    slide.appendChild(link);
    carouselWrapper.appendChild(slide);
  });
  const firstClone = carouselWrapper.children[0].cloneNode(true);
  const lastClone = carouselWrapper.children[slideCount - 1].cloneNode(true);
  carouselWrapper.appendChild(firstClone);
  carouselWrapper.insertBefore(lastClone, carouselWrapper.children[0]);
  carouselWrapper.style.width = `${(slideCount + 2) * 100}%`;
  const allSlides = document.querySelectorAll('.carousel-slide');
  allSlides.forEach(slide => slide.style.width = `${100 / (slideCount + 2)}%`);
  carouselWrapper.style.transform = `translateX(-${100 / (slideCount + 2)}%)`;
}

function createDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  currentIndex++;
  carouselWrapper.style.transition = `transform 0.5s ease-in-out`;
  carouselWrapper.style.transform = `translateX(-${(currentIndex + 1) * 100 / (slideCount + 2)}%)`;
  if (currentIndex >= slideCount) {
    setTimeout(() => {
      carouselWrapper.style.transition = 'none';
      currentIndex = 0;
      carouselWrapper.style.transform = `translateX(-${100 / (slideCount + 2)}%)`;
    }, 500);
  }
  updateDots();
}

function goToSlide(index) {
  currentIndex = index;
  carouselWrapper.style.transition = `transform 0.5s ease-in-out`;
  carouselWrapper.style.transform = `translateX(-${(currentIndex + 1) * 100 / (slideCount + 2)}%)`;
  updateDots();
  resetInterval();
}

function startInterval() {
  slideInterval = setInterval(nextSlide, slideDuration);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

initializeCarousel();

window.addEventListener('resize', () => {
  // রিসাইজের পরে ক্যারোসেলের আকার বা অবস্থান আপডেট করার জন্য আপনার কোড এখানে
});
