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
    url: "https://www.facebook.com/BrightiqueMotion"
  },
  {
    image: "images/image3.png",
    url: "https://www.facebook.com/"
  }
  // আপনার সকল ইমেজ পাথ এবং URL এখানে অবজেক্ট আকারে দিন
];
const slideCount = slidesData.length;
let currentIndex = 0;
let slideInterval;
const slideDuration = 5000; // প্রতি ৫ সেকেন্ড পর পর স্লাইড হবে

function createSlides() {
  slidesData.forEach(slideData => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    const link = document.createElement('a');
    link.href = slideData.url;
    link.target = '_blank'; // নতুন ট্যাবে খুলতে চাইলে
    const img = document.createElement('img');
    img.src = slideData.image;
    link.appendChild(img);
    slide.appendChild(link);
    carouselWrapper.appendChild(slide);
  });
  // প্রথম এবং শেষ ইমেজ (লিঙ্ক সহ) ডুপ্লিকেট করে ইনফিনিট লুপ তৈরি করি
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

// ডেটা স্ট্রাকচার পরিবর্তন করুন যাতে ইমেজ পাথ এবং URL একসাথে থাকে
const updatedImagesWithUrls = [
  { image: "images/image1.png", url: "https://www.example.com/image1" },
  { image: "images/image2.png", url: "https://www.example.com/image2" },
  { image: "images/image3.png", url: "https://www.example.com/image3" }
  // আপনার সকল ইমেজ পাথ এবং URL এখানে অবজেক্ট আকারে দিন
];

// `images` অ্যারেটিকে `slidesData` দিয়ে প্রতিস্থাপন করুন
const slidesData = updatedImagesWithUrls;

createSlides();
createDots();
startInterval();
