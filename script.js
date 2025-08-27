class SpeakerRental {
    constructor() {
        this.init();
    }

    init() {
        // Simple scroll effects
        this.setupScrollEffects();
        
        // Enhanced hover effects for equipment cards
        this.setupCardHovers();
        
        // Smooth scrolling for any anchor links
        this.setupSmoothScrolling();
        
        // Image lightbox functionality
        this.setupLightbox();
    }

    setupScrollEffects() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset > 50;
            
            if (scrolled) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    setupCardHovers() {
        const equipmentCards = document.querySelectorAll('.equipment-card');
        
        equipmentCards.forEach(card => {
            const img = card.querySelector('.product-img');
            
            card.addEventListener('mouseenter', () => {
                if (img) {
                    img.style.transform = 'scale(1.05)';
                    img.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }

    setupSmoothScrolling() {
        // Enable smooth scrolling for any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupLightbox() {
        // Create lightbox modal HTML
        const lightboxHTML = `
            <div id="lightbox-modal" class="lightbox-modal">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                </div>
            </div>
        `;
        
        // Add lightbox to body if it doesn't exist
        if (!document.getElementById('lightbox-modal')) {
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }
        
        const modal = document.getElementById('lightbox-modal');
        const modalImg = modal.querySelector('.lightbox-image');
        const modalCaption = modal.querySelector('.lightbox-caption');
        const closeBtn = modal.querySelector('.lightbox-close');
        
        // Add click event to all product images
        const productImages = document.querySelectorAll('.product-img');
        productImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modalCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox events
        const closeLightbox = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpeakerRental();
});

// Simple fade-in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements when page loads
window.addEventListener('load', () => {
    const animateElements = document.querySelectorAll('.equipment-card, .reason, .fact');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        fadeInObserver.observe(el);
    });
});