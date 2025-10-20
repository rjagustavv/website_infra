    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });

    // Smooth cursor animation
    function animateCursor() {
      // Cursor follows mouse directly
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      // Follower has more delay
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect
    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .logo');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    document.addEventListener('mousemove', (e) => {
      const mouseXPercent = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseYPercent = (e.clientY / window.innerHeight - 0.5) * 2;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const x = mouseXPercent * 50 * speed;
        const y = mouseYPercent * 50 * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    // Scroll Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale');
    animatedElements.forEach(el => observer.observe(el));

    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
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

    // Filter buttons animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Add stagger animation to grid items
    const addStaggerAnimation = (selector, delay = 100) => {
      const items = document.querySelectorAll(selector);
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * delay}ms`;
      });
    };

    addStaggerAnimation('.major-card', 150);
    addStaggerAnimation('.project-card', 150);
    addStaggerAnimation('.achievement-card', 150);
    addStaggerAnimation('.branch-card', 100);
    addStaggerAnimation('.logo-box', 50);

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Console log for debugging
    console.log('[v0] Animations initialized successfully');
    console.log('[v0] Parallax elements:', parallaxElements.length);
    console.log('[v0] Animated elements:', animatedElements.length);