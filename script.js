/**
 * MATHEW MAGED | PORTFOLIO — PREMIUM JAVASCRIPT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== 1. PRELOADER ====================
  const loader = document.getElementById('loader');
  const termText = document.getElementById('term-text');
  
  // Set body to loading state
  document.body.classList.add('loading');
  
  if (termText) {
    const loadingSteps = [
      "fetching global styles...",
      "resolving graphic assets...",
      "compiling Javascript modules...",
      "initializing background canvas...",
      "Done! Routing to homepage..."
    ];
    let step = 0;
    
    // Animate the terminal commands
    const interval = setInterval(() => {
      if (step < loadingSteps.length) {
        termText.textContent = `> ${loadingSteps[step]}`;
        step++;
      } else {
        clearInterval(interval);
      }
    }, 450); // fast hacker typing

    setTimeout(() => {
      clearInterval(interval);
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      setTimeout(revealElements, 100);
      animateNumbers();
      initTypist();
    }, 2800);
  } else {
    // Fallback if not found
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      setTimeout(revealElements, 100);
      animateNumbers();
      initTypist();
    }, 2000);
  }

  // ==================== 2. NAVBAR SCROLL & HAMBURGER ====================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  // Navbar blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Simple animation for hamburger icon can be added here
    });
  }

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ==================== 4. TYPEWRITER EFFECT ====================
  function initTypist() {
    const typedSpan = document.getElementById("typed");
    if (!typedSpan) return;
    
    const textArray = ["AI Automation Specialist", "Content Creator", "Web Developer", "UI/UX Designer", "Programmer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; 
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
      }
    }
    
    // Start typing
    setTimeout(type, 1000);
  }

  // ==================== 5. SCROLL REVEAL ANIMATIONS ====================
  const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal-item');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 100; // Offset before revealing
      
      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', revealElements);
  // Also run on resize to ensure elements don't get stuck
  window.addEventListener('resize', revealElements);

  // ==================== 6. NUMBER COUNTER ====================
  function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number[data-target]');
    
    numbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          num.textContent = Math.ceil(current) + "+";
          requestAnimationFrame(updateNumber);
        } else {
          num.textContent = target + "+";
        }
      };
      
      updateNumber();
    });
  }

  // ==================== 7. PARTICLES BACKGROUND (HTML5 CANVAS) ====================
  const canvas = document.getElementById('particles-canvas');
  if (canvas && window.matchMedia("(min-width: 1024px)").matches) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const colors = ['rgba(79, 142, 247, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(16, 185, 129, 0.3)'];
    const elements = ['< />', '{ }', '[ ]', '=>', '0 1', ';', 'px', '⌘', 'div', '#', '✦', '✧'];

    class ElementNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = elements[Math.floor(Math.random() * elements.length)];
        this.fontSize = Math.random() * 16 + 10;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Wrap around smoothly to keep a continuous flow
        if (this.x > canvas.width + 50) this.x = -50;
        else if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        else if (this.y < -50) this.y = canvas.height + 50;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.font = `600 ${this.fontSize}px 'Space Grotesk', monospace`;
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfNodes = (canvas.width * canvas.height) / 25000; // Optimal density for text
      for (let i = 0; i < numberOfNodes; i++) {
        particlesArray.push(new ElementNode());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Handle Resize
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 1024) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    });
  }

  // ==================== 8. CONTACT FORM SUBMISSION ====================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit');
  
  // Initialize intl-tel-input for Phone Field
  const phoneInputField = document.querySelector("#cf-phone");
  let phoneInputInstance = null;
  if (phoneInputField) {
    phoneInputInstance = window.intlTelInput(phoneInputField, {
      preferredCountries: ["eg", "ae", "sa", "us"],
      initialCountry: "eg",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Simple validation check (excluding hidden iframe inputs)
      const inputs = contactForm.querySelectorAll('input:not([type="hidden"]), textarea');
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) isValid = false;
      });

      if (!isValid) {
        e.preventDefault();
        alert("Please fill out all fields.");
        return;
      }
      
      // Update phone input value with the full international number before sending
      if (phoneInputInstance) {
        phoneInputField.value = phoneInputInstance.getNumber();
      }

      // DO NOT call e.preventDefault() here. Allow native HTML form to submit to hiddenCapture!
      
      // UI Sending State
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';

      // Simulate completion since we can't reliably get load event from cross-origin iframe
      setTimeout(() => {
        // Success state UI
        contactForm.reset();
        formSuccess.classList.add('show');
        
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        `;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';

        if (formSuccess.classList.contains('show')) {
          setTimeout(() => {
            formSuccess.classList.remove('show');
          }, 5000);
        }
      }, 1500);
    });
  }
  // ==================== 9. MAKE CARDS CLICKABLE ====================
  const projectCards = document.querySelectorAll('.project-card, .design-item');
  projectCards.forEach(card => {
    // Add pointer cursor indicating it's clickable
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', (e) => {
      // If user clicked exactly on the button/link, don't double trigger
      if (e.target.closest('a')) return;
      
      const link = card.querySelector('a');
      const video = card.querySelector('video');
      const img = card.querySelector('img');
      
      if (link && link.href) {
        window.open(link.href, '_blank', 'noopener');
      } else if (video && video.src) {
        window.open(video.src, '_blank', 'noopener');
      } else if (img && img.src) {
        // For the Photoshop design images
        window.open(img.src, '_blank', 'noopener');
      }
    });
  });
});

// ==================== 10. CERTIFICATE MODAL LIGHTBOX ====================
function openCertModal(imageSrc, titleText) {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');

  if (modal && modalImg) {
    modalImg.src = imageSrc;
    if (modalTitle) modalTitle.textContent = titleText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

