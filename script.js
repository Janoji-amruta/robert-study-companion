/* ============================================
   ROBERT — AI STUDY COMPANION
   script.js — Main Controller
   ============================================ */

(function () {
  'use strict';

  /* ─── 1. Loading Screen ─── */
  function initLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    const fill = document.getElementById('loading-bar-fill');
    const percent = document.getElementById('loading-percent');
    if (!screen || !fill || !percent) return;

    document.body.classList.add('loading-active');

    let progress = 0;
    const steps = [
      { target: 20, delay: 100 },
      { target: 45, delay: 300 },
      { target: 65, delay: 500 },
      { target: 80, delay: 700 },
      { target: 92, delay: 900 },
      { target: 100, delay: 1200 },
    ];

    function setProgress(val) {
      progress = val;
      fill.style.width = val + '%';
      percent.textContent = val + '%';
    }

    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay);
    });

    setTimeout(() => {
      screen.classList.add('done');
      document.body.classList.remove('loading-active');
      if (window._cancelLoadingParticles) window._cancelLoadingParticles();

      // Trigger hero entrance animations
      setTimeout(() => {
        document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80);
        });
      }, 200);
    }, 1600);
  }

  /* ─── 2. Difficulty Selector ─── */
  function initDifficultySelector() {
    const btns = document.querySelectorAll('.diff-btn');
    let selected = 'easy';

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selected = btn.dataset.diff;
      });
    });

    // Return getter
    return () => selected;
  }

  /* ─── 3. Form Submission ─── */
  function initPlannerForm(getDifficulty) {
    const form = document.getElementById('planner-form');
    const btn = document.getElementById('generate-btn');
    if (!form || !btn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const subject = document.getElementById('subject-input').value.trim();
      const examDate = document.getElementById('exam-date-input').value;
      const hours = document.getElementById('hours-input').value;
      const difficulty = getDifficulty();

      if (!subject || !examDate || !hours) {
        shakeElement(btn);
        return;
      }

      // Validate exam date is in the future
      const exam = new Date(examDate);
      const now = new Date();
      if (exam <= now) {
        shakeElement(document.getElementById('exam-date-input'));
        showToast('Please pick a future exam date!');
        return;
      }

      // Animate button
      btn.disabled = true;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin-slow 1s linear infinite"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2"/><path d="M21 12c0-4.97-4.03-9-9-9"/></svg>
        Building your plan…
      `;

      // Add spin keyframe if not present
      ensureSpinStyle();

      // Small delay for UX
      await new Promise((r) => setTimeout(r, 600));

      // Run Robert chat
      if (window.runRobertChat) {
        await window.runRobertChat(subject, examDate, hours, difficulty);
      }

      // Reset button
      btn.disabled = false;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>
        Generate Another Plan
      `;
    });
  }

  /* ─── 4. Modal (Demo) ─── */
  function initModal() {
    const demoBtn = document.getElementById('watch-demo-btn');
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalCta = document.getElementById('modal-cta');
    if (!demoBtn || !modal) return;

    demoBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalCta) modalCta.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ─── 5. Smooth scroll for anchor links ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ─── 6. Toast notification ─── */
  function showToast(message) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
      background: rgba(124,58,237,0.95); color: white;
      padding: 0.75rem 1.5rem; border-radius: 12px;
      font-size: 0.88rem; font-weight: 500;
      z-index: 10000; animation: slide-up-bubble 0.3s ease;
      backdrop-filter: blur(10px); border: 1px solid rgba(167,139,250,0.3);
      box-shadow: 0 8px 24px rgba(124,58,237,0.4);
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  /* ─── 7. Shake animation for invalid fields ─── */
  function shakeElement(el) {
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
    if (!document.getElementById('shake-style')) {
      const style = document.createElement('style');
      style.id = 'shake-style';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(style);
    }
    setTimeout(() => { el.style.animation = ''; }, 500);
  }

  /* ─── 8. Ensure spin keyframe ─── */
  function ensureSpinStyle() {
    if (!document.getElementById('spin-style')) {
      const style = document.createElement('style');
      style.id = 'spin-style';
      style.textContent = `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ─── 9. Set min date on exam date input to tomorrow ─── */
  function initDateInput() {
    const dateInput = document.getElementById('exam-date-input');
    if (!dateInput) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  /* ─── 10. CTA hover glow follow mouse ─── */
  function initCtaGlow() {
    const cta = document.querySelector('.cta-section');
    if (!cta) return;

    cta.addEventListener('mousemove', (e) => {
      const rect = cta.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cta.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(124,58,237,0.12) 0%, transparent 60%), linear-gradient(180deg, var(--bg-0), var(--bg-1), var(--bg-0))`;
    });
    cta.addEventListener('mouseleave', () => {
      cta.style.background = '';
    });
  }

  /* ─── 11. Feature cards — staggered reveal ─── */
  function initFeatureReveal() {
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80 * [...cards].indexOf(entry.target));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c) => observer.observe(c));
  }

  /* ─── 12. Mini Roberts on the planner ─── */
  function initMiniRoberts() {
    document.querySelectorAll('.robert-mini').forEach((mini) => {
      const eyes = mini.querySelectorAll('.mini-eye');
      setInterval(() => {
        eyes.forEach((eye) => {
          eye.style.transform = 'scaleY(0.1)';
          setTimeout(() => { eye.style.transform = ''; }, 80);
        });
      }, 3000 + Math.random() * 2000);
    });
  }

  /* ─── 13. Number input — only positive values ─── */
  function initHoursInput() {
    const input = document.getElementById('hours-input');
    if (!input) return;
    input.addEventListener('input', () => {
      const val = parseInt(input.value);
      if (val < 1) input.value = 1;
      if (val > 12) input.value = 12;
    });
  }

  /* ─── 14. Hero title glitch effect on hover ─── */
  function initHeroGlitch() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    title.addEventListener('mouseenter', () => {
      title.style.filter = 'drop-shadow(0 0 20px rgba(124,58,237,0.6))';
      title.style.transition = 'filter 0.3s ease';
    });
    title.addEventListener('mouseleave', () => {
      title.style.filter = '';
    });
  }

  /* ─── Main Init ─── */
  function init() {
    initLoadingScreen();
    initDateInput();
    initHoursInput();
    initHeroGlitch();

    const getDifficulty = initDifficultySelector();
    initPlannerForm(getDifficulty);
    initModal();
    initSmoothScroll();
    initCtaGlow();
    initFeatureReveal();
    initMiniRoberts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();