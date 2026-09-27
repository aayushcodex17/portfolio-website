// All site content lives here. Edit this file to update the portfolio.
import { FaAws, FaJava } from "react-icons/fa6";
import {
  SiApachekafka,
  SiApachemaven,
  SiBazel,
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbSql, TbTopologyStar3 } from "react-icons/tb";

export const profile = {
  name: "Ayush P Chaudhary",
  shortName: "ayush",
  initials: "AC",
  role: "Backend Engineer",
  // The role line under your name types through these in turn.
  roles: ["Backend Engineer", "Java · Spring Boot · Kafka", "SEBI Research Analyst", "Futures & Options Trader", "Next.js · React · TypeScript"],
  location: "Bengaluru, IN",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  email: "aayushcodex@gmail.com",
  // Drop a square photo in /public (e.g. /public/avatar.jpg) and set this to "/avatar.jpg".
  avatar: null,
  resume: "/resume.pdf",
  openToWork: true,
  description:
    "Backend engineer specialising in Java microservices, distributed systems and high-throughput fintech infrastructure.",
};

export const socials = {
  github: { handle: "aayushcodex17", url: "https://github.com/aayushcodex17" },
  linkedin: { handle: "ayushcodex", url: "https://www.linkedin.com/in/ayushcodex/" },
  x: { handle: "aayushlyf", url: "https://x.com/aayushlyf" },
  leetcode: { handle: "aayushcodex", url: "https://leetcode.com/u/aayushcodex/" },
};

// **text** renders bold, [label](url) renders a link.
export const bio = [
  "Hey there! 👋 I'm **Ayush**. I build backend systems that stay fast under load. I'm currently a backend engineer at **Scholiphi**, an AI-powered school management platform. Before that I rebuilt **Homeplanr**'s backend as Spring Boot microservices at **CPCL**, cutting page load times by 80%, and was a backend engineer and prop trader at **Jainam Broking (Trade Delta)**, writing low-latency C++ trading algorithms and breaking a monolith into Kafka-driven microservices.",
  "I'm also a **SEBI-registered Research Analyst** and trade futures & options with live capital, so I think about latency, correctness and risk the way a trading desk does. I write a lot of **Java**, **Spring Boot** and **C++**, and I'm a regular at **LeetCode** contests.",
];

export const openToWorkNote = "Right now I'm open to backend and fintech engineering roles, so [let's talk](#contact).";

// Scrolling ticker tape under the banner. dir adds a ▲/▼ arrow; every item here is a win, so all show green.
export const ticker = [
  { symbol: "THROUGHPUT", value: "+70%", dir: "up" },
  { symbol: "PAGE LOAD", value: "−80%", dir: "down" },
  { symbol: "EXEC LATENCY", value: "<1 ms", dir: "down" },
  { symbol: "LC PEAK", value: "1871", dir: "up" },
  { symbol: "LC SOLVED", value: "400+", dir: "up" },
  { symbol: "CONTEST", value: "TOP 1%", dir: "up" },
  { symbol: "PEAK-HOUR BOTTLENECKS", value: "0", dir: "down" },
  { symbol: "SEBI RA", value: "REGISTERED" },
];

// Career timeline, drawn as a git log (oldest first).
// type + message make the commit line. branch: this commit forks a side branch (named here);
// onBranch: the entry sits on that side branch; head: where you are now (shown as "YOU ARE HERE").
// logo: file in /public/logos; fill: true for logos that are already a full tile; wide: true for wordmark-shaped
// logos (less padding); brand tints the logo tile.
export const career = {
  eyebrow: "Career log",
  title: "Not a resume.",
  subtitle: "A commit log.",
  summary:
    "Every role shipped something: a faster system, a cleaner architecture or a sharper instinct for risk. HEAD is where I am now.",
  card: { value: 1871, label: "peak contest rating on LeetCode", href: "https://leetcode.com/u/aayushcodex/" },
  commits: [
    {
      type: "init",
      message: "hello, world",
      name: "DSCE",
      badge: "B.E. · ECE",
      meta: "Dayananda Sagar College of Engineering · 2022 – 2026",
      logo: "/logos/dsce.png",
      brand: "#1C5FB8",
      url: "https://www.dsce.edu.in",
      text: "Electronics & Communication Engineering, graduating with a CGPA of 7.0 / 10, while building a habit of C++, data structures and backend side projects.",
    },
    {
      type: "feat",
      message: "low-latency trading systems",
      name: "Jainam Broking",
      badge: "Backend Engineer & Prop Trader",
      meta: "Trade Delta · Jan 2025 – Oct 2025 · Bengaluru",
      logo: "/logos/jainam.png",
      brand: "#08B878",
      url: "https://www.jainam.in",
      text: "Wrote C++ trading algorithms with lock-free data structures and custom allocators for sub-millisecond execution, split the monolith into Kafka-driven Spring Boot services for 70% more throughput, and moved it all onto AWS auto-scaling.",
      chips: ["C++", "Spring Boot", "Kafka", "AWS EC2"],
      branch: "markets/research",
    },
    {
      type: "perf",
      message: "80% faster page loads",
      name: "CPCL",
      badge: "Backend Developer",
      meta: "Chaitanya Projects Consultancy · Nov 2025 – Jun 2026 · Remote",
      logo: "/logos/cpcl.png",
      brand: "#08A888",
      url: "https://www.chaitanyaprojects.com/",
      text: "Rebuilt Homeplanr's backend as RESTful Spring Boot microservices on MongoDB for thousands of active listings, cut page load times by 80% with server-side caching and index tuning, and reshaped API payloads for SEO-friendly server rendering.",
      chips: ["Java", "Spring Boot", "MongoDB", "Caching"],
    },
    {
      type: "branch",
      message: "markets/research",
      onBranch: true,
      name: "SEBI Research Analyst",
      meta: "NISM certified",
      logo: "/logos/nism.png",
      wide: true,
      brand: "#2E3192",
      text: "Licensed to publish equity and derivatives research, and trading futures and options with live capital. It's why I design for latency, correctness and risk the way a trading desk would.",
      chips: ["Equity research", "Derivatives", "Risk analysis", "Futures & options"],
    },
    {
      type: "merge",
      message: "everything so far → HEAD",
      name: "Scholiphi",
      badge: "Backend Engineer",
      head: true,
      meta: "Aug 2026 – Present · Remote",
      logo: "/logos/scholiphi.svg",
      fill: true,
      brand: "#4D51BF",
      url: "https://www.scholiphi.com",
      text: "Building backend systems for an AI-powered school management platform that brings ERP, LMS and student management together for teachers, students and parents.",
    },
  ],
};

// status shows as a small pill next to the name.
export const projects = [
  {
    name: "DPI Engine",
    summary: "Multi-threaded deep packet inspection engine that classifies TLS traffic by SNI, without decryption.",
    stack: ["C++", "Multithreading", "TLS/SNI", "PCAP"],
    repo: "https://github.com/aayushcodex17/Packet_analyzer",
  },
  {
    name: "Luminosity",
    summary: "Mixture-of-Agents EdTech backend that routes STEM questions to domain-specific LLMs, with sandboxed simulators.",
    stack: ["Java", "Spring Boot", "LLMs", "Docker"],
    status: "private",
  },
  {
    name: "StayEase",
    summary: "Hotel booking REST API with JWT auth, a strategy-pattern dynamic pricing engine and Stripe checkout.",
    stack: ["Java 21", "Spring Boot 3", "PostgreSQL", "Stripe"],
    repo: "https://github.com/aayushcodex17/StayEasy",
  },
  {
    name: "testcontainers-go",
    summary: "Open-source fix for a race where reused Postgres containers reported ready before crash recovery finished, making tests flaky.",
    stack: ["Go", "Docker", "PostgreSQL"],
    repo: "https://github.com/testcontainers/testcontainers-go/pull/3816",
    repoLabel: "pull request",
    status: "open source · PR open",
  },
  {
    name: "Zerodha Lite",
    summary: "Kite-style paper-trading terminal with a Spring Boot order management backend, JWT auth and a Next.js trading UI.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "Next.js"],
    repo: "https://github.com/aayushcodex17/Zerodha_lite",
  },
  {
    name: "Make Your Index",
    summary: "Real-time, exposure-weighted custom index built from live Zerodha Kite F&O positions.",
    stack: ["Node.js", "Express", "React", "TypeScript"],
    repo: "https://github.com/aayushcodex17/Make_your_Index",
  },
  {
    name: "Relative Rotation Graph",
    summary: "REST API that maps sector and stock rotation against a benchmark for Indian markets.",
    stack: ["Python", "FastAPI", "Pandas", "Plotly"],
    repo: "https://github.com/aayushcodex17/Relative-Rotation-Graph",
  },
  {
    name: "SIP Calculator",
    summary: "Step-up SIP calculator plus a goal planner that works out the monthly SIP or lump sum needed to reach a target.",
    stack: ["React", "TypeScript", "Vite", "Recharts"],
    repo: "https://github.com/aayushcodex17/sip-calculator",
  },
  {
    name: "Attendance API",
    summary: "REST API for student records and daily attendance, with bulk marking, filters and one-mark-per-day constraints.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite"],
    repo: "https://github.com/aayushcodex17/AttendanceSystem",
  },
  {
    name: "Tic-Tac-Toe",
    summary: "Game server that keeps each session's state and validates every move, with a Next.js board on top.",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript"],
    repo: "https://github.com/aayushcodex17/tictactoe",
  },
];

export const skills = [
  {
    label: "Languages",
    items: [
      { name: "Java", icon: FaJava },
      { name: "C++", icon: SiCplusplus },
      { name: "Python", icon: SiPython },
      { name: "SQL", icon: TbSql },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "REST APIs", icon: TbApi },
      { name: "Microservices", icon: TbTopologyStar3 },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "FastAPI", icon: SiFastapi },
    ],
  },
  {
    label: "Messaging",
    items: [
      { name: "Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Bazel", icon: SiBazel },
      { name: "Maven", icon: SiApachemaven },
      { name: "Git", icon: SiGit },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
];

export const achievements = [
  {
    title: "LeetCode Knight · 1800+ rating",
    detail: "Top 1% finish in a LeetCode Weekly Contest.",
    kind: "leetcode",
  },
  {
    title: "SEBI-Registered Research Analyst",
    detail: "NISM certified and licensed to publish equity and derivatives research.",
    kind: "sebi",
  },
  {
    title: "Certified Equity & Commodities Derivatives Trader",
    detail: "Trades futures and options with live capital, which shapes how I design for latency and risk.",
    kind: "trader",
  },
];
