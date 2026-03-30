/* ================================================================
   PORTFOLIO APP — Himanshu Pathak
   Interactive features, animations, chatbot, dark/light mode
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollHeader();
    initNavigation();
    initScrollReveal();
    initTypedJS();
    initChatbot();
});

/* ── Dark / Light Mode Toggle ── */
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Restore saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateThemeIcon(icon, next);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
}

/* ── Scroll-Aware Header ── */
function initScrollHeader() {
    const header = document.getElementById('site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

/* ── Navigation ── */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = navLinks.querySelectorAll('a');
    const sections = document.querySelectorAll('section[id]');

    // Mobile toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        icon.className = navLinks.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu';
    });

    // Close after click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            icon.className = 'bx bx-menu';
        });
    });

    // Active section on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

/* ── Scroll Reveal (Intersection Observer) ── */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ── Typed.js ── */
function initTypedJS() {
    if (typeof Typed === 'undefined') return;
    new Typed('#typed-output', {
        strings: [
            'Building Scalable Systems',
            'Competitive Programmer',
            'Full-Stack Developer',
            'Problem Solver'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

/* ── Project Details Toggle ── */
function toggleProjectDetails(id) {
    const details = document.getElementById(id);
    if (details) {
        details.classList.toggle('open');
    }
}

// Make globally accessible
window.toggleProjectDetails = toggleProjectDetails;

/* ── Modal ── */
function openModal(title, content) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = title || 'Project Details';
    document.getElementById('modal-body').innerHTML = content || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

window.openModal = openModal;
window.closeModal = closeModal;

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        closeModal();
    }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeChatbot();
    }
});

/* ── Chatbot ── */
const chatbotResponses = {
    'tech stack': `Himanshu works with a Python-focused tech stack:\n\n• **Languages:** Python, Java, TypeScript, JavaScript\n• **Python Backend:** Django, Django REST Framework, FastAPI, Flask, Celery\n• **Databases:** PostgreSQL, MySQL, MongoDB, Redis, SQLite\n• **Frontend:** Angular, HTML/CSS\n• **Cloud & Tools:** AWS S3, Docker, Git, Jira, Postman\n\nHis core strength is in Python/Django backend development with Redis caching and Celery async tasks.`,

    'python': `Himanshu is a Python expert specializing in:\n\n🐍 **Django/Django REST Framework** — Building scalable APIs with JWT auth, PostgreSQL, and optimized queries\n🚀 **FastAPI** — High-performance async APIs\n📊 **Celery + Redis** — Async task processing and caching\n🛠️ **Flask** — Lightweight REST APIs\n\nHe's built InterviewPrepHub with Django backend, Redis caching, and Celery tasks.`,

    'django': `Django is a core part of Himanshu's stack:\n\n• InterviewPrepHub built with Django REST Framework\n• PostgreSQL with optimized queries and indexing\n• Redis caching for frequently accessed data\n• Celery async tasks for heavy operations\n• JWT authentication and role-based access\n• AWS S3 integration for file storage`,

    'experience': `Himanshu has 2+ years of professional experience:\n\n🏢 **CYFIRMA** (Feb 2024 – Present)\nPython Developer building threat intelligence products. Django/FastAPI APIs serving 50K+ daily requests, Redis caching, Celery async tasks, and Python automation scripts.\n\n🏢 **IBM** (Sep–Nov 2022)\nSoftware Development Intern — Java/Spring Boot for enterprise solutions, optimized database schemas.`,

    'projects': `Himanshu's key projects:\n\n🎯 **InterviewPrepHub** — Django-powered AI interview platform with PostgreSQL, Redis caching, Celery async tasks, and Angular frontend.\n\n🛒 **Grocery Management Store** — Flask e-commerce platform with role-based access, real-time inventory, and background job processing.`,

    'why hire': `Three reasons to hire Himanshu:\n\n🐍 **Python Expert** — Django, FastAPI, Flask, Celery, Redis — builds robust Python backends\n☕ **Java Knowledge** — Spring Boot experience for enterprise systems\n📈 **Impact-Driven** — 50K+ daily API requests, 90% automation savings, 40% latency reduction`,

    'achievements': `Key achievements:\n\n🥇 Rank 1 in IIT Madras Python CodeChef Contest\n🏅 TCS CodeVita — Rank 212 / 1.5L (Top 0.14%)\n💻 2000+ DSA problems solved (CodeChef 4★, CF Specialist)\n🚀 Finalist at Amdocs GenAI Hackathon 2024-25\n⭐ Won Star Award twice at CYFIRMA\n🎯 Hacktoberfest 2023 Winner (11 merged PRs)`,

    'education': `Himanshu's education:\n\n🎓 **B.Tech in Computer Science** — SMVDU (2020-2024)\n📚 Courses: DSA, DBMS, OS, ML, AI, Software Engineering\n\n🎓 **BS in Programming** — IIT Madras (2022-2024)\n📚 Courses: Python, Java, Web Dev, SQL, OOP, Django`,

    'contact': `You can reach Himanshu at:\n\n📧 pathakvishal132@gmail.com\n📱 +91 7727872538\n💼 linkedin.com/in/himanshu-pathak-997720201\n💻 github.com/pathakvishal132`,

    'default': `I'm not sure I understood that. Try asking about:\n• His Python/Django skills\n• Tech stack\n• Work experience\n• Projects he's built\n• Why you should hire him\n• His achievements`
};

function initChatbot() {
    const trigger = document.getElementById('chatbot-trigger');
    const panel = document.getElementById('chatbot-panel');
    const closeBtn = document.getElementById('chatbot-close');

    trigger.addEventListener('click', () => {
        panel.classList.toggle('open');
        trigger.querySelector('i').className = panel.classList.contains('open')
            ? 'bx bx-x' : 'bx bx-message-dots';
    });

    closeBtn.addEventListener('click', closeChatbot);
}

function closeChatbot() {
    const panel = document.getElementById('chatbot-panel');
    const trigger = document.getElementById('chatbot-trigger');
    panel.classList.remove('open');
    trigger.querySelector('i').className = 'bx bx-message-dots';
}

function askChatbot(question) {
    addChatMessage(question, 'user');

    // Find matching response
    const q = question.toLowerCase();
    let response = chatbotResponses['default'];

    for (const [key, value] of Object.entries(chatbotResponses)) {
        if (key !== 'default' && q.includes(key)) {
            response = value;
            break;
        }
    }

    // Simulate typing delay
    setTimeout(() => {
        addChatMessage(response, 'bot');
    }, 500 + Math.random() * 500);
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input-field');
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    askChatbot(message);
}

function addChatMessage(text, sender) {
    const messages = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    // Convert markdown-style bold and newlines
    div.innerHTML = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

window.askChatbot = askChatbot;
window.sendChatMessage = sendChatMessage;
