const bootScreen = document.querySelector("#bootScreen");
const skipBoot = document.querySelector(".skip-boot");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const matrix = document.querySelector("#matrix");
const ctx = matrix.getContext("2d");
const progressBar = document.querySelector(".scroll-progress i");
const intelClock = document.querySelector("#intelClock");
const intelFeed = document.querySelector("#intelFeed");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const consoleForm = document.querySelector("#consoleForm");
const consoleInput = document.querySelector("#consoleInput");
const consoleOutput = document.querySelector("#consoleOutput");
const copyEmail = document.querySelector("#copyEmail");
const copyStatus = document.querySelector("#copyStatus");
const triageForm = document.querySelector("#triageForm");
const triageInput = document.querySelector("#triageInput");
const triageOutput = document.querySelector("#triageOutput");
const triageSignals = document.querySelector("#triageSignals");
const triageBadge = document.querySelector("#triageBadge");
const emailAddress = "Ayazans07@gmail.com";

function hideBoot() {
  bootScreen.classList.add("hidden");
}

window.addEventListener("load", () => {
  window.setTimeout(hideBoot, 3600);
});

skipBoot.addEventListener("click", hideBoot);
bootScreen.addEventListener("click", (event) => {
  if (event.target === bootScreen) hideBoot();
});
document.addEventListener("keydown", hideBoot, { once: true });

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = `mailto:${emailAddress}`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => {
  revealObserver.observe(item);
});

const meterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".meter i").forEach((meter) => {
        meter.style.width = meter.dataset.width;
      });
      meterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });

document.querySelectorAll(".skill-card").forEach((card) => {
  meterObserver.observe(card);
});

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const intelMessages = [
  "DNS query baseline updated",
  "ARP broadcast activity reviewed",
  "Suspicious domain pattern queued for analysis",
  "Packet capture exported for notes",
  "Malware string decode workflow ready",
  "System hardening checklist loaded"
];

function updateClock() {
  const now = new Date();
  intelClock.textContent = now.toLocaleTimeString([], { hour12: false });
}

function addIntelMessage() {
  const message = intelMessages[Math.floor(Math.random() * intelMessages.length)];
  const entry = document.createElement("p");
  entry.innerHTML = `<span>[${intelClock.textContent}]</span> ${message}`;
  intelFeed.prepend(entry);

  while (intelFeed.children.length > 5) {
    intelFeed.lastElementChild.remove();
  }
}

updateClock();
addIntelMessage();
window.setInterval(() => {
  updateClock();
}, 1000);
window.setInterval(addIntelMessage, 2800);

const commandResponses = {
  help: "Available commands: about, skills, projects, certs, labs, triage, focus, evidence, contact, clear",
  about: "Mohammed Ayaz Ansari is a cybersecurity and IT student at SUNY Broome focused on SOC monitoring, malware analysis, system protection, and IT support.",
  skills: "Core skills: threat detection, log analysis, malware analysis basics, SIEM monitoring, Python, web development, networking, troubleshooting, and secure system support.",
  projects: "Featured work includes a SOC lab, malware analysis report, AI phishing detector, secure grocery website, mosque IT support, cafe website, network configuration, vulnerability scanner, DNS threat hunting, and SEO optimization.",
  certs: "Certifications include Google Cybersecurity Professional Certificate, IT Security, AI courses from Google, and IBM Prompt Engineering Basics.",
  labs: "Practice platforms include TryHackMe and Hack The Box, with hands-on work in scanning, enumeration, vulnerability analysis, and privilege escalation basics.",
  triage: "Use the Threat Triage Sandbox to paste a sample URL, domain, or log line and see a simple local review of suspicious indicators.",
  focus: "Professional focus: IT Support or SOC Analyst Tier 1, growing toward cybersecurity analysis, threat detection, incident response, and system security.",
  evidence: "Supporting evidence to add: SOC screenshots, malware report PDF, GitHub repositories, live demos, and certification verification links.",
  contact: `Email Mohammed Ayaz Ansari at ${emailAddress}.`
};

function printConsoleLine(command, response) {
  const commandLine = document.createElement("p");
  commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
  consoleOutput.append(commandLine);

  if (response) {
    const responseLine = document.createElement("p");
    responseLine.className = "output";
    responseLine.textContent = response;
    consoleOutput.append(responseLine);
  }

  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

consoleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = consoleInput.value.trim().toLowerCase();

  if (!command) return;

  if (command === "clear") {
    consoleOutput.innerHTML = "";
  } else {
    const response = commandResponses[command] || `Unknown command: ${command}. Type help to see options.`;
    printConsoleLine(command, response);
  }

  consoleInput.value = "";
});

copyEmail.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);
    copyStatus.textContent = "Email copied.";
  } catch {
    copyStatus.textContent = emailAddress;
  }
});

const triageRules = [
  { label: "Possible brute force or login issue", terms: ["failed login", "brute", "password", "ssh", "admin"] },
  { label: "Suspicious URL or phishing clue", terms: ["http://", "verify", "urgent", "login", "account", "password"] },
  { label: "Network or scanning activity", terms: ["nmap", "scan", "port", "syn", "enumeration"] },
  { label: "Malware or process behavior clue", terms: ["powershell", "procmon", "dll", "payload", "encoded", "base64"] },
  { label: "DNS or exfiltration clue", terms: ["dns", "domain", "dga", "exfil", "query"] }
];

function runTriage(sample) {
  const normalized = sample.toLowerCase();
  const matches = triageRules.filter((rule) => (
    rule.terms.some((term) => normalized.includes(term))
  ));

  triageSignals.innerHTML = "";

  if (!sample.trim()) {
    triageBadge.textContent = "READY";
    triageBadge.className = "";
    triageOutput.textContent = "Paste a short sample first. Try a URL, a suspicious login line, or a DNS note.";
    return;
  }

  matches.forEach((match) => {
    const item = document.createElement("li");
    item.textContent = match.label;
    triageSignals.append(item);
  });

  if (matches.length >= 3) {
    triageBadge.textContent = "HIGH REVIEW";
    triageBadge.className = "alert";
    triageOutput.textContent = "Several suspicious indicators were found. In a real workflow, I would preserve the sample, review related logs, check affected hosts, and document the timeline.";
  } else if (matches.length > 0) {
    triageBadge.textContent = "REVIEW";
    triageBadge.className = "warning";
    triageOutput.textContent = "Some indicators deserve a closer look. I would verify context, compare against baselines, and decide whether escalation is needed.";
  } else {
    triageBadge.textContent = "LOW SIGNAL";
    triageBadge.className = "";
    triageOutput.textContent = "No obvious indicators were matched by this simple demo. I would still review context before closing anything in a real investigation.";
  }
}

triageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runTriage(triageInput.value);
});

const glyphs = "01<>/{}[]#$";
let columns = [];
let fontSize = 16;

function resizeMatrix() {
  const dpr = window.devicePixelRatio || 1;
  matrix.width = window.innerWidth * dpr;
  matrix.height = window.innerHeight * dpr;
  matrix.style.width = `${window.innerWidth}px`;
  matrix.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  fontSize = window.innerWidth < 640 ? 13 : 16;
  columns = Array.from({ length: Math.ceil(window.innerWidth / fontSize) }, () => (
    Math.random() * window.innerHeight
  ));
}

function drawMatrix() {
  ctx.fillStyle = "rgba(8, 11, 13, 0.14)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "#00ff8c";
  ctx.font = `${fontSize}px Courier New`;

  columns.forEach((y, index) => {
    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
    const x = index * fontSize;
    ctx.fillText(char, x, y);
    columns[index] = y > window.innerHeight + Math.random() * 800 ? 0 : y + fontSize;
  });

  window.requestAnimationFrame(drawMatrix);
}

resizeMatrix();
drawMatrix();
window.addEventListener("resize", resizeMatrix);
