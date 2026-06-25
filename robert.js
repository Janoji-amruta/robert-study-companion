/* ============================================
   ROBERT — AI STUDY COMPANION
   robert.js — Robert Character & Chat Engine
   ============================================ */

(function () {
  'use strict';

  /* ─── Eye Tracking ─── */
  function initEyeTracking() {
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    const leftShine = document.getElementById('left-shine');
    const rightShine = document.getElementById('right-shine');
    const leftIris = document.getElementById('left-iris');
    const rightIris = document.getElementById('right-iris');
    const robertWrap = document.getElementById('robert-wrap');

    if (!leftPupil || !rightPupil || !robertWrap) return;

    // Eye base positions in SVG coords
    const LEFT_EYE = { x: 116, y: 118 };
    const RIGHT_EYE = { x: 164, y: 118 };
    const MAX_OFFSET = 4;
    const IRIS_MAX_OFFSET = 2.5;

    document.addEventListener('mousemove', (e) => {
      const rect = robertWrap.getBoundingClientRect();
      const robertCenterX = rect.left + rect.width / 2;
      const robertCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - robertCenterX;
      const dy = e.clientY - robertCenterY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clampedDist = Math.min(dist, 300);
      const factor = clampedDist / 300;

      const offsetX = Math.cos(angle) * MAX_OFFSET * factor;
      const offsetY = Math.sin(angle) * MAX_OFFSET * factor;
      const irisX = Math.cos(angle) * IRIS_MAX_OFFSET * factor;
      const irisY = Math.sin(angle) * IRIS_MAX_OFFSET * factor;

      // Move pupils
      leftPupil.setAttribute('cx', LEFT_EYE.x + offsetX);
      leftPupil.setAttribute('cy', LEFT_EYE.y + offsetY);
      rightPupil.setAttribute('cx', RIGHT_EYE.x + offsetX);
      rightPupil.setAttribute('cy', RIGHT_EYE.y + offsetY);

      // Move irises slightly
      leftIris.setAttribute('cx', LEFT_EYE.x + irisX);
      leftIris.setAttribute('cy', LEFT_EYE.y + irisY);
      rightIris.setAttribute('cx', RIGHT_EYE.x + irisX);
      rightIris.setAttribute('cy', RIGHT_EYE.y + irisY);

      // Move shines
      leftShine.setAttribute('cx', LEFT_EYE.x + offsetX + 2.5);
      leftShine.setAttribute('cy', LEFT_EYE.y + offsetY - 2.5);
      rightShine.setAttribute('cx', RIGHT_EYE.x + offsetX + 2.5);
      rightShine.setAttribute('cy', RIGHT_EYE.y + offsetY - 2.5);
    });
  }

  /* ─── Blinking ─── */
  function initBlinking() {
    const leftLid = document.getElementById('left-eyelid');
    const rightLid = document.getElementById('right-eyelid');
    if (!leftLid || !rightLid) return;

    function blink() {
      const LID_HEIGHT = 24;
      const BLINK_SPEED = 80;

      // Close
      leftLid.setAttribute('height', LID_HEIGHT);
      rightLid.setAttribute('height', LID_HEIGHT);

      setTimeout(() => {
        leftLid.setAttribute('height', 0);
        rightLid.setAttribute('height', 0);
      }, BLINK_SPEED);

      // Schedule next blink
      const nextBlink = 2500 + Math.random() * 3500;
      setTimeout(blink, nextBlink);
    }

    // Start blinking after a random delay
    setTimeout(blink, 1500 + Math.random() * 2000);
  }

  /* ─── Antenna tip pulse ─── */
  function initAntennaPulse() {
    const tip = document.getElementById('antenna-tip');
    const glow = document.getElementById('antenna-glow');
    if (!tip || !glow) return;

    let growing = true;
    let size = 7;
    let glowSize = 12;

    setInterval(() => {
      if (growing) {
        size = Math.min(size + 0.15, 10);
        glowSize = Math.min(glowSize + 0.3, 18);
      } else {
        size = Math.max(size - 0.15, 6);
        glowSize = Math.max(glowSize - 0.3, 10);
      }
      if (size >= 10) growing = false;
      if (size <= 6) growing = true;

      tip.setAttribute('r', size);
      glow.setAttribute('r', glowSize);
      glow.setAttribute('opacity', 0.1 + (size - 6) / 4 * 0.3);
    }, 30);
  }

  /* ─── Status dot pulse on Robert's screen ─── */
  function initStatusDot() {
    const dot = document.getElementById('status-dot');
    if (!dot) return;

    setInterval(() => {
      const current = parseFloat(dot.getAttribute('opacity') || 0.9);
      dot.setAttribute('opacity', current > 0.5 ? 0.2 : 0.9);
    }, 800);
  }

  /* ─── Idle mouth animation ─── */
  function initMouthAnimation() {
    const mouth = document.getElementById('robert-mouth');
    if (!mouth) return;

    let phase = 0;
    setInterval(() => {
      phase += 0.05;
      const smile = 10 + Math.sin(phase) * 3;
      mouth.setAttribute('d', `M122 158 Q140 ${158 + smile} 158 158`);
    }, 50);
  }

  /* ─── Arm wave on hover ─── */
  function initArmWave() {
    const robertWrap = document.getElementById('robert-wrap');
    const leftArm = document.getElementById('left-arm');
    const rightArm = document.getElementById('right-arm');
    if (!robertWrap || !leftArm || !rightArm) return;

    robertWrap.addEventListener('mouseenter', () => {
      leftArm.style.transform = 'rotate(-20deg)';
      rightArm.style.transform = 'rotate(20deg)';
      leftArm.style.transition = 'transform 0.4s ease';
      rightArm.style.transition = 'transform 0.4s ease';
    });

    robertWrap.addEventListener('mouseleave', () => {
      leftArm.style.transform = '';
      rightArm.style.transform = '';
    });
  }

  /* ─── Get response for subject ─── */
  function getRobertResponse(subject, difficulty) {
    const data = window.ROBERT_DATA;
    if (!data) return `Let's get to work on ${subject}! I've built a plan that will take you from where you are to where you need to be.`;

    const lowerSubject = subject.toLowerCase();

    // Check for subject-specific response
    let responses = null;
    for (const key of Object.keys(data.subjectResponses)) {
      if (lowerSubject.includes(key)) {
        responses = data.subjectResponses[key];
        break;
      }
    }

    // Fallback to generic
    if (!responses) {
      responses = data.genericResponses.map((r) => r.replace(/{subject}/g, subject));
    }

    const opener = responses[Math.floor(Math.random() * responses.length)];
    const diffMsg = data.difficultyMessages[difficulty] || '';
    const tip = data.studyTips[Math.floor(Math.random() * data.studyTips.length)];
    const quote = data.motivationalQuotes[Math.floor(Math.random() * data.motivationalQuotes.length)];

    return {
      opener,
      diffMsg,
      tip,
      quote,
    };
  }

  /* ─── Generate Study Plan Content ─── */
  function generatePlanContent(subject, examDate, hoursPerDay, difficulty) {
    const data = window.ROBERT_DATA;
    const now = new Date();
    const exam = new Date(examDate);
    const daysUntilExam = Math.max(1, Math.round((exam - now) / (1000 * 60 * 60 * 24)));

    const totalHours = daysUntilExam * parseInt(hoursPerDay);
    const weeklyHours = parseInt(hoursPerDay) * 7;

    const dailyTemplate = data.dailyScheduleTemplates[difficulty] || data.dailyScheduleTemplates.medium;
    const weeklyTemplate = data.weeklyPlanTemplates[difficulty] || data.weeklyPlanTemplates.medium;

    const diffLabel = { easy: 'Light & Steady', medium: 'Focused & Structured', hard: 'Intensive & Comprehensive' }[difficulty] || 'Structured';

    return {
      daysUntilExam,
      totalHours,
      weeklyHours,
      diffLabel,
      daily: dailyTemplate,
      weekly: weeklyTemplate,
      tips: [
        data.studyTips[Math.floor(Math.random() * data.studyTips.length)],
        data.studyTips[Math.floor(Math.random() * data.studyTips.length)],
        data.studyTips[Math.floor(Math.random() * data.studyTips.length)],
      ].filter((t, i, arr) => arr.indexOf(t) === i),
    };
  }

  /* ─── Typing animation ─── */
  function showTypingBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble robert-bubble';
    bubble.id = 'typing-bubble';
    bubble.innerHTML = `
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  /* ─── Add a message bubble ─── */
  function addMessage(container, text, isRobert = true, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${isRobert ? 'robert-bubble' : 'user-bubble'}`;
        bubble.textContent = text;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
        resolve();
      }, delay);
    });
  }

  /* ─── Build Plan Cards ─── */
  function buildPlanCards(container, subject, planData) {
    container.innerHTML = '';

    const cards = [
      {
        icon: '📅',
        title: 'Daily Study Schedule',
        sub: `${planData.daysUntilExam} days remaining · ${planData.diffLabel}`,
        content: null,
        list: planData.daily,
        progress: { label: 'Daily target coverage', pct: Math.min(95, 60 + (planData.daysUntilExam > 30 ? 20 : 10)) },
        delay: 0,
      },
      {
        icon: '🗓️',
        title: 'Weekly Study Plan',
        sub: `${planData.weeklyHours} hours per week`,
        content: null,
        list: planData.weekly,
        progress: { label: 'Weekly session coverage', pct: 80 },
        delay: 100,
      },
      {
        icon: '🔁',
        title: 'Revision Strategy',
        sub: 'Spaced repetition approach',
        content: null,
        list: [
          `Week 1–${Math.max(1, Math.floor(planData.daysUntilExam / 7) - 2)}: Learn all core concepts in ${subject}`,
          `Week ${Math.max(2, Math.floor(planData.daysUntilExam / 7) - 1)}: First full revision pass`,
          `Final week: Focus only on weak areas and past papers`,
          `Last 48 hours: Light review only — your brain is ready`,
        ],
        progress: { label: 'Revision readiness', pct: 72 },
        delay: 200,
      },
      {
        icon: '📝',
        title: 'Mock Test Schedule',
        sub: 'Practice under real conditions',
        content: null,
        list: [
          `First mock: ${Math.max(1, planData.daysUntilExam - 21)} days from now`,
          `Second mock: ${Math.max(1, planData.daysUntilExam - 10)} days from now`,
          `Final mock: ${Math.max(1, planData.daysUntilExam - 5)} days from now`,
          'Always review every answer — right and wrong',
        ],
        progress: { label: 'Exam simulation', pct: 65 },
        delay: 300,
      },
      {
        icon: '💡',
        title: 'Robert\'s Tips for You',
        sub: `Personalised for ${subject}`,
        content: null,
        tips: planData.tips,
        delay: 400,
      },
    ];

    cards.forEach((card, idx) => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'plan-card glass-card reveal-up';

        let bodyHTML = '';

        if (card.list) {
          bodyHTML += `<ul class="plan-list">`;
          card.list.forEach((item) => {
            bodyHTML += `<li class="plan-list-item">${item}</li>`;
          });
          bodyHTML += `</ul>`;
        }

        if (card.tips) {
          card.tips.forEach((tip) => {
            bodyHTML += `<div class="plan-tip">${tip}</div>`;
          });
        }

        if (card.progress) {
          bodyHTML += `
            <div class="plan-progress-wrap">
              <div class="plan-progress-label">
                <span>${card.progress.label}</span>
                <span>${card.progress.pct}%</span>
              </div>
              <div class="plan-progress-bar">
                <div class="plan-progress-fill" data-width="${card.progress.pct}" style="width:0%"></div>
              </div>
            </div>
          `;
        }

        el.innerHTML = `
          <div class="plan-card-header">
            <div class="plan-card-icon">${card.icon}</div>
            <div>
              <div class="plan-card-title">${card.title}</div>
              <div class="plan-card-sub">${card.sub}</div>
            </div>
          </div>
          <div class="plan-card-body">${bodyHTML}</div>
        `;

        container.appendChild(el);

        // Trigger reveal
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.classList.add('visible');
          });
        });

        // Animate progress bar
        setTimeout(() => {
          const fill = el.querySelector('.plan-progress-fill');
          if (fill) {
            fill.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
            fill.style.width = (fill.dataset.width || 70) + '%';
          }
        }, 300);

      }, card.delay + idx * 120);
    });
  }

  /* ─── Run chat sequence ─── */
  window.runRobertChat = async function (subject, examDate, hoursPerDay, difficulty) {
    const resultsArea = document.getElementById('results-area');
    const chatMessages = document.getElementById('chat-messages');
    const planGrid = document.getElementById('plan-grid');
    const chatStatus = document.getElementById('chat-status-text');

    if (!resultsArea || !chatMessages || !planGrid) return;

    // Show results area
    resultsArea.style.display = 'flex';
    resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    chatMessages.innerHTML = '';
    planGrid.innerHTML = '';

    // Get response data
    const resp = getRobertResponse(subject, difficulty);
    const planData = generatePlanContent(subject, examDate, hoursPerDay, difficulty);

    // User message first
    await addMessage(chatMessages, `I'm studying ${subject} · Exam in ${planData.daysUntilExam} days · ${hoursPerDay}h/day · ${difficulty} difficulty`, false);

    // Typing animation
    chatStatus.textContent = 'Thinking…';
    const typingBubble = showTypingBubble(chatMessages);

    await new Promise((r) => setTimeout(r, 1400));
    typingBubble.remove();
    chatStatus.textContent = 'Online';

    // Robert's opener
    await addMessage(chatMessages, resp.opener, true);
    await new Promise((r) => setTimeout(r, 600));

    // Difficulty message
    await addMessage(chatMessages, resp.diffMsg, true);
    await new Promise((r) => setTimeout(r, 500));

    // More typing
    const typingBubble2 = showTypingBubble(chatMessages);
    await new Promise((r) => setTimeout(r, 900));
    typingBubble2.remove();

    await addMessage(chatMessages, `I've built you a complete study plan for ${subject}. You have ${planData.daysUntilExam} days — that's ${planData.totalHours} total study hours with your schedule. Here's your full plan:`, true);

    // Build plan cards
    setTimeout(() => {
      buildPlanCards(planGrid, subject, planData);
    }, 400);
  };

  /* ─── Init Robert ─── */
  function initRobert() {
    initEyeTracking();
    initBlinking();
    initAntennaPulse();
    initStatusDot();
    initMouthAnimation();
    initArmWave();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobert);
  } else {
    initRobert();
  }

})();