/* ============================================
   ROBERT — AI STUDY COMPANION
   animations.js — All Animation Systems
   ============================================ */

(function () {
  'use strict';

  /* ─── 1. Scroll Progress Bar ─── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ─── 2. Navbar scroll effect ─── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ─── 3. Custom Cursor ─── */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    if (!cursor || !trail) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let tx = mx, ty = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateTrail() {
      tx += (mx - tx) * 0.18;
      ty += (my - ty) * 0.18;
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effects
    const hoverTargets = 'a, button, .feature-card, .testimonial-card, .diff-btn, .btn, [data-tilt]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.add('hovering');
        trail.style.opacity = '0.2';
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursor.classList.remove('hovering');
        trail.style.opacity = '0.5';
      }
    });

    // Hide on leave
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; trail.style.opacity = '0.5'; });
  }

  /* ─── 4. Scroll Reveal ─── */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el) => observer.observe(el));
  }

  /* ─── 5. Card Tilt Effect ─── */
  function initTiltCards() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-6px) scale(1.01) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─── 6. Counter Animations ─── */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;

      if (isDecimal) {
        // e.g. target=49, display as 4.9
        el.textContent = (value / 10).toFixed(1) + suffix;
      } else if (target >= 10000) {
        el.textContent = Math.floor(value / 1000) + suffix;
      } else {
        el.textContent = Math.floor(value) + suffix;
      }

      if (progress < 1) requestAnimationFrame(step);
      else {
        // Set final value
        if (isDecimal) el.textContent = (target / 10).toFixed(1) + suffix;
        else if (target >= 10000) el.textContent = Math.floor(target / 1000) + suffix;
        else el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /* ─── 7. Hero Particles Canvas ─── */
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = [];
    const COUNT = 55;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.4,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.pulse += 0.02;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${alpha})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─── 8. CTA Particles ─── */
  function initCtaParticles() {
    const canvas = document.getElementById('cta-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.3 + 0.05,
        life: Math.random(),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life -= 0.003;
        if (p.life <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.life = 1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity * p.life})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─── 9. Robert Floating Particles ─── */
  function initRobertParticles() {
    const container = document.getElementById('robert-particles');
    if (!container) return;

    const COUNT = 8;
    for (let i = 0; i < COUNT; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 5 + 3;
      const angle = (i / COUNT) * Math.PI * 2;
      const radius = 110 + Math.random() * 40;
      const x = 50 + Math.cos(angle) * radius * 0.25;
      const y = 50 + Math.sin(angle) * radius * 0.25;

      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(124,58,237,${Math.random() * 0.6 + 0.2});
        left: ${x}%;
        top: ${y}%;
        animation: robert-particle-float ${3 + Math.random() * 3}s ease-in-out infinite;
        animation-delay: ${-Math.random() * 4}s;
        filter: blur(${Math.random() > 0.5 ? '1px' : '0px'});
        box-shadow: 0 0 ${size * 2}px rgba(124,58,237,0.5);
      `;
      container.appendChild(dot);
    }

    // Add CSS for particle animation
    if (!document.getElementById('robert-particle-style')) {
      const style = document.createElement('style');
      style.id = 'robert-particle-style';
      style.textContent = `
        @keyframes robert-particle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 15 + 5)}px, -${Math.floor(Math.random() * 15 + 5)}px) scale(1.2); opacity: 1; }
          66% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 10 + 2)}px, ${Math.floor(Math.random() * 10 + 2)}px) scale(0.8); opacity: 0.4; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ─── 10. Loading Particles ─── */
  function initLoadingParticles() {
    const canvas = document.getElementById('loading-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    let animId;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    // Store cancel function
    window._cancelLoadingParticles = () => cancelAnimationFrame(animId);
  }

  /* ─── 11. Mobile Nav ─── */
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileNav = document.getElementById('nav-mobile');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('.nav-mobile-link, .btn').forEach((link) => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  /* ─── 12. Plan Progress Bars ─── */
  function initProgressBars() {
    const bars = document.querySelectorAll('.plan-progress-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.dataset.width || '70';
          el.style.width = target + '%';
        }
      });
    }, { threshold: 0.5 });
    bars.forEach((b) => observer.observe(b));
  }

  /* ─── 13. Parallax on hero glow ─── */
  function initParallax() {
    const glows = document.querySelectorAll('.hero-glow');
    if (!glows.length) return;

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      glows.forEach((g, i) => {
        const speed = 0.05 + i * 0.02;
        g.style.transform = `translateY(${scroll * speed}px)`;
      });
    }, { passive: true });
  }

  /* ─── Init all on DOM ready ─── */
  function init() {
    initScrollProgress();
    initNavbar();
    initCursor();
    initScrollReveal();
    initTiltCards();
    initCounters();
    initHeroParticles();
    initCtaParticles();
    initRobertParticles();
    initLoadingParticles();
    initMobileNav();
    initProgressBars();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for use by other scripts
  window.ANIMATIONS = {
    initProgressBars,
    initScrollReveal,
    initTiltCards,
  };

})();