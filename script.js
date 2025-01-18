// scripts.js

// Detect scroll and adjust opacity of the home page h1 text
window.addEventListener('scroll', () => {
    const homeText = document.querySelector('.home h1');
    const scrollY = window.scrollY;
    const fadePoint = 250  ; // Point at which the fading starts

    // Calculate opacity based on scroll position
    const opacity = Math.max(0, 1 - scrollY / fadePoint);
    homeText.style.opacity = opacity;
});




// scripts.js

// Add scroll detection to highlight the active section's dot
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.home, .about, .certs, .portfolio, .blog, .contact');
    const dots = document.querySelectorAll('.scroll-dots .dot');

    

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
    

        // Check if the section is in the viewport
        if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
            // Mark the corresponding dot as active
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
    });
});


// Add click event listeners to dots for smooth scrolling
document.querySelectorAll('.scroll-dots .dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const sections = document.querySelectorAll('.home, .about, .certs, .portfolio, .blog, .contact');
        sections[index].scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
    });
});

// Add the 'active' class to the first dot when the page loads
window.addEventListener('load', () => {
    const dots = document.querySelectorAll('.scroll-dots .dot');
    dots[0].classList.add('active'); // Make the first dot active
});



// 

let currentCert = 0;

// Show the current certificate
function showCert(index) {
    const certImages = document.querySelectorAll('.cert-box .cert-image');
    certImages.forEach((image, i) => {
        if (i === index) {
            image.classList.add('active'); // Show current image
        } else {
            image.classList.remove('active'); // Hide other images
        }
    });
}

// Move to the next or previous certificate
function moveSlide(direction) {
    const certImages = document.querySelectorAll('.cert-box .cert-image');
    currentCert += direction;

    // Loop back to the first/last certificate
    if (currentCert >= certImages.length) {
        currentCert = 0;
    } else if (currentCert < 0) {
        currentCert = certImages.length - 1;
    }

    showCert(currentCert); // Display the current certificate
}

// Initialize the carousel
window.addEventListener('load', () => {
    showCert(currentCert); // Display the first certificate
});


// Trigger the transition when the page loads
window.addEventListener('load', () => {
    const heading = document.querySelector('.home h1');
    heading.classList.add('load');
});
