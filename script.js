/* ═══════════════════════════════════════════
   Talha Mirza — Portfolio
   All interactivity: terminal, dark mode, 
   scroll reveal (bidirectional), parallax layers,
   scroll-driven opacity, marquee speed, tilt cards,
   magnetic buttons, cursor trail, nav indicator,
   mobile hamburger menu
   ═══════════════════════════════════════════ */

(function initAll() {
  'use strict';

  /* ─── 1. Scroll Progress Bar ─── */
  (function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scrollProgress';
    document.body.prepend(bar);
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          bar.style.width = pct + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  })();

  /* ─── 2. Navbar scroll state + active link ─── */
  (function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  })();

  /* ─── 3. Dark Mode Toggle ─── */
  (function initDarkMode() {
    const toggle = document.getElementById('darkToggle');
    if (!toggle) return;
    const saved = localStorage.getItem('theme');
    if (saved) {
      if (saved === 'dark') document.body.classList.add('dark');
    } else {
      // No saved preference — respect system setting
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
      }
    }
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  })();

  /* ─── 4. Mobile Hamburger Menu ─── */
  (function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  })();

  /* ─── 5. Nav Active Indicator (IntersectionObserver) ─── */
  (function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;
    const sections = [];
    navLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        const section = document.querySelector(id);
        if (section) sections.push({ link, section });
      }
    });
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const match = sections.find(s => s.section === entry.target);
          if (match) match.link.classList.add('active');
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
    sections.forEach(s => observer.observe(s.section));
  })();

  /* ─── 6. Morphing Status Badge ─── */
  (function initStatusBadge() {
    const el = document.getElementById('statusProject');
    if (!el) return;
    const statuses = ['AI Workflows', 'API Orchestrators', 'Automation Pipelines', 'Intelligent Agents'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % statuses.length;
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = statuses[idx];
        el.style.opacity = '1';
      }, 200);
    }, 4000);
    el.style.transition = 'opacity 0.2s ease';
  })();

  /* ─── 7. Cycling Terminal ─── */
  (function initTerminal() {
    const body = document.getElementById('terminalBody');
    if (!body) return;

    const sessions = [
      [
        { text: 'whoami && hostname', cmd: true },
        { text: 'talha_mirza / ai-automation.engineer', cmd: false },
        { text: 'systemctl status expertise', cmd: true },
        { text: '● ai-workflows.service — loaded (enabled) since 2023', cmd: false },
      ],
      [
        { text: 'cat /etc/skills', cmd: true },
        { text: 'Python · n8n · AI Agents · LLM APIs · Docker · Network Security', cmd: false },
        { text: 'which automation', cmd: true },
        { text: '/usr/local/bin/everything', cmd: false },
      ],
      [
        { text: 'ls ~/projects/', cmd: true },
        { text: 'e-commerce-agent/   netscan/   maps-scraper/', cmd: false },
        { text: 'du -sh ~/projects/*', cmd: true },
        { text: '48M    always-building', cmd: false },
      ],
      [
        { text: 'neofetch', cmd: true },
        { text: 'OS: Human v1.0 · Shell: AI Workflows', cmd: false },
        { text: 'uptime', cmd: true },
        { text: 'always learning · always shipping', cmd: false },
      ],
      [
        { text: 'ping creativity.local', cmd: true },
        { text: 'PING creativity.local (64 bytes from imagination)', cmd: false },
        { text: '64 bytes from 0.0.0.0: ttl=∞ time=💡 ms', cmd: false },
        { text: '--- ping statistics ---', cmd: false },
        { text: '0% packet loss — always online', cmd: false },
      ],
    ];

    let currentSession = 0;
    let lineIdx = 0;
    let charIdx = 0;
    let timer = null;

    function typeChar(el, text) {
      if (charIdx < text.length) {
        el.textContent += text[charIdx];
        charIdx++;
        timer = setTimeout(() => typeChar(el, text), 20 + Math.random() * 15);
      } else {
        lineIdx++;
        timer = setTimeout(typeNextLine, 400);
      }
    }

    function addLine(lineData) {
      const div = document.createElement('div');
      div.className = 'tb-line';

      if (lineData.cmd) {
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '$';
        div.appendChild(prompt);
        const cmd = document.createElement('span');
        cmd.className = 'cmd';
        div.appendChild(cmd);
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        charIdx = 0;
        typeChar(cmd, lineData.text);
      } else {
        const out = document.createElement('span');
        out.className = 'output';
        out.textContent = lineData.text;
        div.appendChild(out);
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        lineIdx++;
        timer = setTimeout(typeNextLine, 500);
      }
    }

    function clearTerminal(nextSession) {
      body.style.opacity = '0';
      setTimeout(() => {
        body.innerHTML = '';
        body.style.opacity = '1';
        currentSession = nextSession;
        lineIdx = 0;
        typeNextLine();
      }, 300);
    }

    function typeNextLine() {
      if (lineIdx >= sessions[currentSession].length) {
        timer = setTimeout(() => clearTerminal((currentSession + 1) % sessions.length), 3000);
        return;
      }
      addLine(sessions[currentSession][lineIdx]);
    }

    // Start
    typeNextLine();
  })();

  /* ─── 8. Terminal Button Clicks ─── */
  (function initTerminalButtons() {
    const body = document.getElementById('terminalBody');
    if (!body) return;
    const responses = {
      'td-r': [
        '⚠️  SIGTERM received. Graceful shutdown...',
        '⏎  Just kidding — this terminal is unkillable.',
        '☕  Tried to close. Needed coffee instead.',
      ],
      'td-y': [
        '📦  Minimizing to tray... Brain still running.',
        '⏳  Loading background processes...',
        '🧠  Background thread: thinking about automation.',
      ],
      'td-g': [
        '🔄  Restarting creative stack... All systems nominal.',
        '✨  Maximizing potential. Literally.',
        '🚀  Full throttle. Let\'s build something.',
      ],
    };
    document.querySelectorAll('.td').forEach(btn => {
      btn.addEventListener('click', () => {
        const msgs = responses[btn.className.split(' ').find(c => c.startsWith('td-'))] || ['⚡  Processing...'];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        const line = document.createElement('div');
        line.className = 'tb-line';
        const out = document.createElement('span');
        out.className = 'output';
        out.textContent = msg;
        line.appendChild(out);
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
      });
    });
  })();

  /* ─── 9. Cursor Trail Circle (Desktop Only) ─── */
  (function initCursorTrail() {
    if (!(window.innerWidth > 1024 && !('ontouchstart' in window))) return;

    const trail = document.createElement('div');
    function getBorderColor() {
      return document.body.classList.contains('dark')
        ? '1.5px solid rgba(232,232,232,0.15)'
        : '1.5px solid rgba(32,32,32,0.08)';
    }
    trail.style.cssText = [
      'position: fixed', 'width: 28px', 'height: 28px',
      'border: ' + getBorderColor(),
      'border-radius: 50%', 'pointer-events: none', 'z-index: 9999',
      'transform: translate(-50%, -50%)', 'opacity: 0',
      'transition: transform 0.15s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease'
    ].join(';');
    document.body.appendChild(trail);

    // Update border on dark mode toggle
    const toggle = document.getElementById('darkToggle');
    if (toggle) {
      toggle.addEventListener('click', function updateBorder() {
        trail.style.border = getBorderColor();
      });
    }

    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      trail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      trail.style.opacity = '0';
    });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    document.querySelectorAll('a, button, .work-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        trail.style.width = '48px';
        trail.style.height = '48px';
      });
      el.addEventListener('mouseleave', () => {
        trail.style.width = '28px';
        trail.style.height = '28px';
      });
    });
  })();

  /* ─── 10. 3D Card Tilt ─── */
  (function initCardTilt() {
    const selectors = ['.project-card', '.skill-group'];
    let allCards = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => allCards.push(el));
    });
    allCards.forEach(card => {
      card.classList.add('tilt-card');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  })();

  /* ─── 11. Magnetic Buttons ─── */
  (function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    buttons.forEach(btn => {
      btn.classList.add('magnetic-btn');
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        if (dist > 80) { btn.style.transform = 'translate(0, 0)'; return; }
        btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  })();

  /* ─── 12. Gradient Animated Borders on cards ─── */
  (function initBorderGlow() {
    const selectors = ['.project-card', '.skill-group'];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('border-glow'));
    });
  })();

  /* ─── 13. Project Card Modal ─── */
  (function initProjectModal() {
    const overlay = document.getElementById('projectModal');
    if (!overlay) return;
    const closeBtn = document.getElementById('modalClose');
    const iconEl = document.getElementById('modalIcon');
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDesc');
    const tagsEl = document.getElementById('modalTags');

    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.project-title').textContent;
        const desc = card.querySelector('.project-desc').textContent;
        const iconHTML = card.querySelector('.project-icon').innerHTML;

        iconEl.innerHTML = iconHTML;
        titleEl.textContent = title;
        descEl.textContent = desc;

        tagsEl.innerHTML = '';
        card.querySelectorAll('.tag').forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tag.textContent;
          tagsEl.appendChild(span);
        });

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  })();

  /* ─── 14. Hero Scroll Fade — fixed hero fades as content scrolls under ─── */
  (function initHeroFade() {
    const content = document.querySelector('.hero-inner');
    const scrollInd = document.querySelector('.hero-scroll-indicator');
    if (!content) return;

    content.style.willChange = 'opacity';
    if (scrollInd) scrollInd.style.willChange = 'opacity';

    let ticking = false;

    function update() {
      const vh = window.innerHeight;
      const scrolled = window.scrollY;
      // fade range = one viewport height
      const progress = Math.min(1, scrolled / vh);
      const opacity = 1 - progress;
      content.style.opacity = opacity;
      if (scrollInd) scrollInd.style.opacity = Math.max(0, opacity - 0.15);
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    });

    update();
  })();

  /* ─── 16. Scroll Entrance Observer (supports data-reveal + data-reveal-blur) ─── */
  (function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal], [data-reveal-blur]').forEach(el => {
        el.style.opacity = '1';
        el.style.filter = 'none';
        el.setAttribute('data-entered', '');
      });
      return;
    }
    const els = document.querySelectorAll('[data-reveal], [data-reveal-blur]');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-entered', '');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
  })();

  /* ─── 16b. Counter Animation — about stats ─── */
  (function initCounter() {
    const counters = document.querySelectorAll('.stat .stat-number');
    if (!counters.length) return;

    function parseNum(str) {
      const cleaned = str.replace(/[^0-9.]/g, '');
      return parseFloat(cleaned) || 0;
    }

    function animate(el, target, suffix) {
      const duration = 1200;
      const start = performance.now();
      const isFloat = target % 1 !== 0;

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = eased * target;
        el.textContent = isFloat ? current.toFixed(1) : Math.round(current) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target + suffix;
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const suffix = text.includes('+') ? '+' : '';
          const target = parseNum(text);
          if (target > 0) {
            el.textContent = '0' + suffix;
            setTimeout(() => animate(el, target, suffix), 300);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  })();

  /* ─── 17. Journey Detail Modal ─── */
  (function initJourneyModal() {
    const overlay = document.getElementById('journeyModal');
    if (!overlay) return;
    const closeBtn = document.getElementById('journeyModalClose');
    const titleEl = document.getElementById('journeyModalTitle');
    const subEl = document.getElementById('journeyModalSub');
    const descEl = document.getElementById('journeyModalDesc');

    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    document.querySelectorAll('.journey-clickable').forEach(item => {
      item.addEventListener('click', () => {
        const title = item.getAttribute('data-title') || '';
        const sub = item.getAttribute('data-sub') || '';
        const detail = item.getAttribute('data-detail') || '';

        titleEl.textContent = title;
        subEl.textContent = sub;
        descEl.textContent = detail;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  })();

})();
