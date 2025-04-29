const carouselContainer = document.querySelector('.carousel-container');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const dotsContainer = document.querySelector('.carousel-dots');
const images = [
  "images/image1.png",
  "images/image2.png",
  "images/image3.png"
  // আপনার সকল ইমেজের পাথ এখানে দিন
];
const slideCount = images.length;
let currentIndex = 0;
let slideInterval;
const slideDuration = 5000; // প্রতি ৫ সেকেন্ড পর পর স্লাইড হবে

function createSlides() {
  images.forEach(image => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    const img = document.createElement('img');
    img.src = image;
    slide.appendChild(img);
    carouselWrapper.appendChild(slide);
  });
  // প্রথম এবং শেষ ইমেজ ডুপ্লিকেট করে ইনফিনিট লুপ তৈরি করি
  const firstClone = carouselWrapper.children[0].cloneNode(true);
  const lastClone = carouselWrapper.children[slideCount - 1].cloneNode(true);
  carouselWrapper.appendChild(firstClone);
  carouselWrapper.insertBefore(lastClone, carouselWrapper.children[0]);

  // র‍্যাপারের প্রাথমিক প্রস্থ সেট করি
  carouselWrapper.style.width = `${(slideCount + 2) * 100}%`;
  // প্রতিটি স্লাইডের প্রস্থ সেট করি
  const allSlides = document.querySelectorAll('.carousel-slide');
  allSlides.forEach(slide => slide.style.width = `${100 / (slideCount + 2)}%`);

  // ক্যারোসেলটিকে প্রথম আসল ইমেজে পজিশন করি
  carouselWrapper.style.transform = `translateX(-${100 / (slideCount + 2)}%)`;
}

function createDots() {
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
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentIndex) {
      dot.classList.add('active');
    }
  });
}

function nextSlide() {
  currentIndex++;
  carouselWrapper.style.transition = `transform 0.5s ease-in-out`;
  carouselWrapper.style.transform = `translateX(-${(currentIndex + 1) * 100 / (slideCount + 2)}%)`;

  // যখন শেষ ক্লোনড ইমেজে পৌঁছাই, তখন ট্রানজিশন বন্ধ করে দ্রুত প্রথম ইমেজে নিয়ে যাই
  if (currentIndex >= slideCount) {
    setTimeout(() => {
      carouselWrapper.style.transition = 'none';
      currentIndex = 0;
      carouselWrapper.style.transform = `translateX(-${100 / (slideCount + 2)}%)`;
    }, 500); // ট্রানজিশনের সময় পর
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

createSlides();
createDots();
startInterval();