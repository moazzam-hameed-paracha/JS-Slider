class Slider {
  constructor(sliderEl) {
    this.sliderEl = sliderEl;
    this.slides = sliderEl.querySelectorAll('.slide');
    this.prevButton = sliderEl.querySelector('.btn-prev');
    this.nextButton = sliderEl.querySelector('.btn-next');
    this.dotsContainer = sliderEl.querySelector('.slider-dots');
    this.slideIndex = this.getActiveIndex();
    this.maxSlide = this.slides.length - 1;

    this.prevButton.addEventListener('click', this.prevSlide.bind(this));
    this.nextButton.addEventListener('click', this.nextSlide.bind(this));

    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${100 * -this.slideIndex}%)`;
    });

    this.createDots();
    this.setActiveClass(this.slideIndex);
    this.autoPlay();
  }

  prevSlide() {
    if (this.slideIndex === 0) {
      this.slideIndex = this.maxSlide;
    } else {
      this.slideIndex -= 1;
    }

    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${100 * -this.slideIndex}%)`;
    });

    this.setActiveClass(this.slideIndex);
  }

  nextSlide() {
    if (this.slideIndex === this.maxSlide) {
      this.slideIndex = 0;
    } else {
      this.slideIndex += 1;
    }

    // move slide by -100%
    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(${100 * -this.slideIndex}%)`;
    });

    this.setActiveClass(this.slideIndex);
  }

  createDots() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      dot.addEventListener('click', () => {
        this.slideIndex = index;
        this.setActiveClass(this.slideIndex);

        this.slides.forEach((slide) => {
          slide.style.transform = `translateX(${100 * -this.slideIndex}%)`;
        });
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  autoPlay() {
    const flag = this.sliderEl.hasAttribute("data-interval") && this.slides.length > 1;
    if (flag) {
      const interval = Number(this.sliderEl.getAttribute("data-interval"))

      if (interval < 800) {
        this.slides.forEach((slide) => {
          slide.style.transition = `all ${interval / 1000}s ease-in-out`;
        });
      }

      setInterval(() => this.nextSlide(), interval)
    }
  }

  setActiveClass(n) {
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[n].classList.add('active');

    this.slides.forEach(slide => slide.classList.remove('active'));
    this.slides[n].classList.add('active');
  }

  getActiveIndex() {
    let activeIndex = 0;
    this.slides.forEach((slide, index) => {
      if (slide.classList.contains("active")) {
        activeIndex = index;
      }
    })

    return activeIndex;
  }
}

const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => new Slider(slider));
