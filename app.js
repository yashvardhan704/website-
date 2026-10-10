// Growing Up Passport — app.js
// Clean, no forms, no fake data, no toasts, no counters.

// ─── Mission Data ────────────────────────────────────────────────────────────
const MISSIONS_DATA = {
  1: {
    day: "Day 01", pillar: "Financial Literacy", icon: "💰",
    title: "Needs vs. Wants Audit",
    teenPrompt: "Look at your last 5 personal expenses (snacks, mobile recharge, stationery, in-game items, clothes). Categorize each as a 'Core Need' (essential for function) or a 'Convenience Want' (emotional or social pressure). Be completely honest — no category is wrong.",
    reflection: "Which of your 'wants' was triggered by seeing a friend or influencer have it? How would you feel if you delayed buying it by 7 days?",
    parentCue: "Ask: 'Which item was the hardest to categorize?' Do not criticize any past purchase. Simply acknowledge their self-awareness."
  },
  2: {
    day: "Day 02", pillar: "Communication & Empathy", icon: "🗣️",
    title: "Active Listening & Mirroring",
    teenPrompt: "Have a 5-minute conversation with a parent or sibling about their day. Before responding or offering your own opinion, practice 'Mirroring': repeat back the core idea in your own words, starting with 'So what you're saying is…'",
    reflection: "Did you feel the impulse to interrupt or defend yourself? How did the other person react when they felt genuinely heard?",
    parentCue: "Notice whether your teen listened without looking at a screen. Praise the pause before they responded."
  },
  3: {
    day: "Day 03", pillar: "Critical Thinking & Media", icon: "🔍",
    title: "Fact vs. Ad Check",
    teenPrompt: "Pick one sponsored reel or advertisement that appeared in your feed today. Answer 3 questions: 1) What emotion is this ad trying to trigger (fear, insecurity, popularity)? 2) What is the actual hidden cost? 3) Would you buy this if nobody else knew you had it?",
    reflection: "What subtle technique made this product look more desirable than it actually is?",
    parentCue: "Discuss how marketing algorithms target teen emotions specifically. Emphasize that spotting manipulation is a real superpower."
  },
  4: {
    day: "Day 04", pillar: "Emotional Regulation", icon: "🧘",
    title: "The 2-Minute Cooling Off Rule",
    teenPrompt: "When you feel frustration rising today (sibling conflict, exam stress, interrupted plans), invoke the '2-Minute Protocol': Take 4 slow breaths (4s in, 6s out) and walk to fetch a glass of water before replying.",
    reflection: "What physical sensation in your body told you that anger or stress was rising — tight shoulders, jaw, racing heartbeat?",
    parentCue: "If your teen used the cooling-off rule during a disagreement today, say: 'I noticed you took a breath before answering. That shows real maturity.'"
  },
  5: {
    day: "Day 05", pillar: "Digital Safety & Privacy", icon: "🔒",
    title: "Digital Footprint Audit",
    teenPrompt: "Audit 3 active apps on your smartphone: 1) Check permissions — does a calculator need your microphone? 2) Verify two-factor authentication on your primary email. 3) Search your full name in Google in incognito mode and see what appears.",
    reflection: "What information about you is currently publicly visible to complete strangers? What would you want a future interviewer to find 5 years from now?",
    parentCue: "Review privacy settings together as a collaborative activity, not an interrogation."
  },
  6: {
    day: "Days 06 & 07", pillar: "Life Independence & Reflection", icon: "🍳",
    title: "Independent Breakfast & Growth Review",
    teenPrompt: "Plan, prepare, and clean up a complete healthy breakfast on your own (eggs & toast, poha, upma, or a smoothie bowl) without asking a parent to clean the dishes. Then complete the 7-Day Sampler growth reflection worksheet inside the PDF.",
    reflection: "Out of the 7 days, which mission felt most challenging? Which one gave you a quiet sense of genuine confidence?",
    parentCue: "Celebrate the completed week. This is a real milestone in building practical independence."
  }
};

// ─── Independence Scale Data ──────────────────────────────────────────────────
const SCALE_DATA = {
  1: {
    level: "Level 1 • Guidance Needed",
    title: "Teen Needed a Step-by-Step Walkthrough",
    desc: '"I had never done this before, so my parent demonstrated or walked me through the first try."',
    cue: '"Thank you for being completely honest. Every skill starts here. Tomorrow we\'ll see if you can do step one on your own."'
  },
  2: {
    level: "Level 2 • Prompted Execution",
    title: "Teen Did It With Gentle Reminders",
    desc: '"I knew the basic idea, but needed a nudge or hint to finish without giving up halfway."',
    cue: '"Great effort. You carried most of the weight today. Next time let\'s see if you can start without the nudge."'
  },
  3: {
    level: "Level 3 • Independent Action",
    title: "Completed Autonomously Without Reminders",
    desc: '"I read the prompt, took responsibility, finished the task, and came to the review without being told twice."',
    cue: '"This is real independence. You took ownership from start to finish without anyone chasing you. Solid work."'
  },
  4: {
    level: "Level 4 • Mastery",
    title: "Understood Deeply & Could Teach It",
    desc: '"I didn\'t just do it — I understood the underlying principle and could apply it to another situation."',
    cue: '"You\'ve mastered this. You\'re ready to teach this concept to someone else or take on greater responsibility."'
  }
};

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFaqAccordion();
  initModalClosers();
});

// ─── Navbar scroll effect & mobile toggle ────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function initFaqAccordion() {
  document.querySelectorAll(".accordion-item").forEach(item => {
    item.querySelector(".accordion-header").addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".accordion-item").forEach(i => {
        i.classList.remove("active");
        i.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        item.querySelector(".accordion-header").setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ─── Independence Scale ───────────────────────────────────────────────────────
window.switchScale = function (level) {
  document.querySelectorAll(".scale-tab").forEach(tab => {
    tab.classList.toggle("active", parseInt(tab.dataset.level) === level);
  });
  const d = SCALE_DATA[level];
  if (!d) return;
  document.getElementById("scaleBadge").textContent = d.level;
  document.getElementById("scaleTitle").textContent = d.title;
  document.getElementById("scaleDesc").textContent = d.desc;
  document.getElementById("scaleCue").textContent = d.cue;
};

// ─── Mission Preview Modal ───────────────────────────────────────────────────
window.openMissionPreview = function (dayNumber) {
  const m = MISSIONS_DATA[dayNumber];
  if (!m) return;

  const content = document.getElementById("missionModalContent");
  content.innerHTML = `
    <div class="pdf-header-tag">
      <span>GROWING UP PASSPORT • 7-DAY SAMPLER</span>
      <span>${m.day}</span>
    </div>

    <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
      <span style="font-size:1.8rem;">${m.icon}</span>
      <div>
        <span class="sub-badge" style="margin-bottom:2px;">${m.pillar}</span>
        <h3 style="font-size:1.25rem; font-weight:800; color:#0A192F; margin:0;">${m.title}</h3>
      </div>
    </div>

    <div class="pdf-preview-sheet">
      <div style="font-size:0.78rem; font-weight:800; color:#0D9488; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px;">
        10-Minute Teen Mission Prompt
      </div>
      <p style="font-size:0.96rem; color:#0A192F; line-height:1.65; margin-bottom:18px;">${m.teenPrompt}</p>

      <div style="font-size:0.78rem; font-weight:800; color:#B45309; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px;">
        Evening Reflection Question
      </div>
      <p style="font-size:0.92rem; color:#475569; font-style:italic; line-height:1.55; margin-bottom:0;">"${m.reflection}"</p>
    </div>

    <div class="scale-parent-cue" style="margin:20px 0;">
      <strong>3-Minute Parent Conversation Cue</strong>
      <p>${m.parentCue}</p>
    </div>

    <div style="display:flex; gap:12px; justify-content:flex-end; flex-wrap:wrap;">
      <button class="btn btn-outline btn-sm" onclick="closeMissionModal()">Close Preview</button>
      <a href="assets/Growing-Up-Passport-7-Day-Sampler.pdf" download="Growing-Up-Passport-7-Day-Sampler.pdf" class="btn btn-primary btn-sm" style="text-decoration:none;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download All 7 Days (Free PDF)
      </a>
    </div>
  `;

  const modal = document.getElementById("missionModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
};

window.closeMissionModal = function () {
  const modal = document.getElementById("missionModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
};

// ─── Modal Closers ─────────────────────────────────────────────────────────────
function initModalClosers() {
  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
      e.target.setAttribute("aria-hidden", "true");
    }
  });
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMissionModal();
  });
}
