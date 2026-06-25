/* ============================================
   ROBERT — AI STUDY COMPANION
   data.js — Response & Content Data
   ============================================ */

const ROBERT_DATA = {

  /* ─── Subject-Specific Opening Lines ─── */
  subjectResponses: {
    mathematics: [
      "Let's conquer mathematics one problem at a time. Numbers don't lie — and neither does a solid study plan.",
      "Mathematics is a language, and we're about to make you fluent. Ready to build something unbreakable?",
      "Math anxiety? Not on my watch. We'll turn confusion into clarity, step by careful step.",
      "Every great mathematician started exactly where you are. Let's get to work.",
    ],
    math: [
      "Let's conquer mathematics one problem at a time. Numbers don't lie — and neither does a solid study plan.",
      "Math is a puzzle, and every puzzle has a solution. Let's find yours together.",
    ],
    physics: [
      "Physics is just reality showing off — and we're going to understand every trick it has.",
      "From Newton to quantum mechanics, physics rewards the patient mind. Let's build yours.",
      "The universe follows rules. Let's learn them together, one concept at a time.",
      "Einstein didn't crack relativity in a day. But with this plan, you're going to nail your exam.",
    ],
    chemistry: [
      "Let's mix consistency with curiosity — the perfect formula for your exam success.",
      "Chemistry is everywhere. Let's make it stick in your memory, not just your notes.",
      "Reactions, equations, elements — we'll decode them all. Your periodic table is about to become your best friend.",
      "The secret to chemistry? Understanding why, not just memorising what. Let's dig in.",
    ],
    biology: [
      "Life is complex, but your study plan doesn't have to be. Let's break biology wide open.",
      "From cells to ecosystems — biology is the story of life. And we're going to help you tell it perfectly in your exam.",
      "The human body is extraordinary. Your exam preparation is going to be extraordinary too.",
    ],
    history: [
      "Those who understand the past are ready for the future — and for their history exam.",
      "History is full of patterns, stories and turning points. Let's make sure you know them all.",
      "Dates, events, causes and consequences — we'll turn the chaos of history into a clear, learnable structure.",
    ],
    literature: [
      "Great writing deserves great understanding. Let's make sure you can analyse every text like a scholar.",
      "Literature isn't just reading — it's thinking deeply. Your plan will help you do exactly that.",
      "Every text has layers. Your study plan will help you peel them back, one session at a time.",
    ],
    programming: [
      "Time to turn coffee into code — and confusion into competence. Let's build something great.",
      "Programming rewards the methodical mind. We'll tackle every concept systematically.",
      "Every programmer started as a beginner. Your plan will take you from uncertain to unstoppable.",
      "Bugs are just puzzles waiting to be solved. This study plan will sharpen your problem-solving instincts.",
    ],
    coding: [
      "Time to turn coffee into code. Let's architect a study plan as clean as your future codebase.",
      "Every line of expertise is written one day at a time. Let's start yours today.",
    ],
    economics: [
      "Markets, models, and mechanisms — economics makes sense when you break it down. Let's do exactly that.",
      "Supply, demand, and a solid study plan — that's the formula for your exam success.",
      "Economics is about incentives. Your biggest incentive right now is that exam date on the horizon.",
    ],
    geography: [
      "The world is your subject — and your study plan will map out exactly how to ace it.",
      "Geography connects everything. Your study sessions will connect all the dots.",
    ],
    psychology: [
      "Ironically, understanding psychology will help you study it better. Let's use the science of learning to learn the science.",
      "Human behaviour is fascinating — and examinable. Let's make sure you have it all figured out.",
    ],
  },

  /* ─── Generic Opening Responses (fallback) ─── */
  genericResponses: [
    "Brilliant — I love a student who comes prepared with a plan. Let's make {subject} your strongest subject.",
    "Challenge accepted. {subject} is going to feel completely different after this study plan.",
    "I've been waiting for this. Let's build something that actually gets you through {subject} with confidence.",
    "You've made the smartest decision — starting early and starting structured. Let's crush {subject}.",
    "Right, let's get serious about {subject}. I'm thinking daily sessions, smart revision, and zero last-minute panic.",
    "You know what separates students who ace exams from those who don't? A plan. Let's build yours for {subject}.",
    "Great subject choice. {subject} rewards consistent effort more than any other — and that's exactly what we're going to build.",
    "I like the commitment. {subject} is going to feel manageable, organised, and even enjoyable with the right structure.",
    "Let's be real — {subject} can feel overwhelming. But not after today. We're building a system that works.",
    "A study plan for {subject}? You're already ahead of 90% of students who just hope for the best. Let's go.",
  ],

  /* ─── Difficulty-specific follow-up lines ─── */
  difficultyMessages: {
    easy: "This feels like manageable territory — but don't let the label fool you. We'll still build a rock-solid routine.",
    medium: "Medium difficulty means the material requires real focus. I've built in extra revision loops to lock things in.",
    hard: "Hard mode engaged. This plan is going to work you — but I promise, the effort will show up on exam day.",
  },

  /* ─── Motivational Quotes ─── */
  motivationalQuotes: [
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { quote: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  ],

  /* ─── Study Tips ─── */
  studyTips: [
    "Use the Pomodoro Technique: 25 minutes focused work, 5 minute break. Repeat 4 times, then take a longer break.",
    "Active recall beats passive re-reading. Close your notes and try to write down everything you remember.",
    "Spaced repetition is the most efficient way to retain information long-term — revisit material at increasing intervals.",
    "Teach the material to someone else (or to yourself out loud). If you can explain it clearly, you truly understand it.",
    "Study in the same place at the same time each day. Your brain will begin to associate that environment with focus.",
    "Remove your phone from the room during study sessions — notifications fragment focus even when you don't check them.",
    "Start with the hardest topic when your energy is highest. Save easier revision for when you're tired.",
    "Use past exam papers as your primary revision tool in the final two weeks before your exam.",
    "Sleep is when your brain consolidates memories. Never sacrifice sleep for late-night cramming.",
    "Drink water consistently while studying. Dehydration significantly impairs concentration and memory.",
    "Write summaries by hand — the physical act of writing strengthens memory encoding.",
    "Create mind maps to visualise connections between concepts rather than memorising facts in isolation.",
  ],

  /* ─── Plan Templates ─── */
  dailyScheduleTemplates: {
    easy: [
      "Morning (60 min): Core concept review and reading",
      "Afternoon (45 min): Practice problems or exercises",
      "Evening (15 min): Quick recap and memory check",
    ],
    medium: [
      "Morning (75 min): New concept study and note-taking",
      "Lunch break (20 min): Flash card review",
      "Afternoon (60 min): Practice problems and worked examples",
      "Evening (25 min): Summarise the day's learning",
    ],
    hard: [
      "Morning (90 min): Deep study of core concepts",
      "Mid-morning (15 min): Break + hydration",
      "Morning 2 (75 min): Problem sets and active recall",
      "Afternoon (60 min): Past paper questions",
      "Evening (30 min): Review mistakes and consolidate",
      "Before bed (15 min): Read your key summaries",
    ],
  },

  weeklyPlanTemplates: {
    easy: ["Monday: Introduction & overview", "Tuesday: Core concept A", "Wednesday: Core concept B", "Thursday: Practice & application", "Friday: Revision of the week", "Weekend: Rest + light review"],
    medium: ["Monday: New chapter study", "Tuesday: Deepen understanding, worked examples", "Wednesday: Practice problems", "Thursday: Weak spots revision", "Friday: Mock questions", "Saturday: Full review session", "Sunday: Rest (seriously — rest matters)"],
    hard: ["Monday: Two focused study blocks, new material", "Tuesday: Deep-dive into hardest concepts", "Wednesday: Practice and problem solving", "Thursday: Past paper under timed conditions", "Friday: Review mistakes methodically", "Saturday: Comprehensive revision session", "Sunday: Light review, plan next week, rest"],
  },

  /* ─── Icon map for plan cards ─── */
  planCardIcons: {
    daily: "📅",
    weekly: "🗓️",
    revision: "🔁",
    mockTest: "📝",
    tips: "💡",
  },
};

/* Export to global scope */
window.ROBERT_DATA = ROBERT_DATA;