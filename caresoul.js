class Carousel {
    constructor(selector, options) {
        this.carousel = document.querySelector(selector);
        this.interval = options.interval || 5000; // Default interval
        this.pauseOnHover = options.pauseOnHover || false;
        this.wrap = options.wrap || false;
        this.animation = options.animation || 'slide'; // Default animation
        
        // Initialize carousel
        this.currentIndex = 0;
        this.slides = Array.from(this.carousel.querySelectorAll('.carousel-item'));
        this.slides[this.currentIndex].classList.add('active');
        
        // Apply initial animation class
        this.carousel.classList.add(`carousel-${this.animation}`);
        
        // Start autoplay
        this.start();
        
        // Add event listeners
        this.carousel.addEventListener('mouseover', () => {
            if (this.pauseOnHover) {
                this.pause();
            }
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            if (this.pauseOnHover) {
                this.start();
            }
        });
        
        this.carousel.querySelector('.carousel-control-prev').addEventListener('click', () => {
            this.prev();
        });
        
        this.carousel.querySelector('.carousel-control-next').addEventListener('click', () => {
            this.next();
        });
    }
    
    start() {
        this.intervalId = setInterval(() => {
            this.next();
        }, this.interval);
    }
    
    pause() {
        clearInterval(this.intervalId);
    }
    
    prev() {
        this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
        this.showSlide(this.currentIndex);
    }
    
    next() {
        this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : this.currentIndex + 1;
        this.showSlide(this.currentIndex);
    }
    
    showSlide(index) {
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];
        
        // Apply animation classes
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active', 'next');
        setTimeout(() => {
            nextSlide.classList.remove('next');
        }, 500); // Animation duration
        
        // Reset carousel animation to trigger animation on next slide
        this.carousel.classList.remove(`carousel-${this.animation}`);
        void this.carousel.offsetWidth; // Trigger reflow
        this.carousel.classList.add(`carousel-${this.animation}`);
    }
}
