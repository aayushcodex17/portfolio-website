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
  roles: ["Backend Engineer", "Java · Spring Boot · Kafka", "Low-latency C++", "SEBI Research Analyst"],
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

// about: a line on what the company does. points/stack are optional; add them as you ship things.
// logo: file in /public/logos; fill: true for logos that are already a full tile.
// brand: the company's colour, used to tint the logo tile and its glow.
// Without a logo, the initials are shown instead.
export const experience = [
  {
    role: "Backend Engineer",
    company: "Scholiphi",
    initials: "SC",
    logo: "/logos/scholiphi.svg",
    fill: true,
    brand: "#4D51BF",
    url: "https://www.scholiphi.com",
    period: "Aug 2026 – Present",
    location: "Remote",
    about: "AI-powered school management platform that brings ERP, LMS and student management together for teachers, students and parents.",
    points: [],
    stack: [],
  },
  {
    role: "Backend Developer",
    company: "Chaitanya Projects Consultancy (CPCL)",
    initials: "CP",
    logo: "/logos/cpcl.png",
    brand: "#08A888",
    url: "https://www.chaitanyaprojects.com/",
    period: "Nov 2025 – Jun 2026",
    location: "Remote",
    points: [
      "Rebuilt Homeplanr's backend with RESTful Spring Boot microservices and MongoDB, supporting thousands of active listings on a fully decoupled, scalable architecture.",
      "Boosted platform performance with server-side caching and MongoDB index optimisation on high-traffic endpoints, cutting page load time by 80%.",
      "Grew organic traffic by restructuring API payloads for SEO-friendly server rendering and metadata injection, with a measurable uplift in search rankings.",
    ],
    stack: ["Java", "Spring Boot", "MongoDB", "REST APIs", "Caching"],
  },
  {
    role: "Backend Engineer & Prop Trader",
    company: "Jainam Broking (Trade Delta)",
    initials: "JB",
    logo: "/logos/jainam.png",
    brand: "#08B878",
    url: "https://www.jainam.in",
    period: "Jan 2025 – Oct 2025",
    location: "Bengaluru, KA",
    points: [
      "Engineered low-latency trading algorithms in C++ with lock-free data structures and custom memory allocators, achieving sub-millisecond latency on critical execution paths.",
      "Redesigned the backend from a monolith into Spring Boot microservices with Kafka-based async event pipelines, improving system throughput by 70%.",
      "Led the cloud migration to AWS EC2 auto-scaling groups with load balancing, eliminating infrastructure bottlenecks during peak trading hours.",
    ],
    stack: ["C++", "Java", "Spring Boot", "Kafka", "AWS EC2"],
  },
];

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

export const education = {
  degree: "B.E. Electronics & Communication Engineering",
  school: "Dayananda Sagar College of Engineering, Bengaluru",
  period: "2022 – 2026",
  score: "CGPA 7.0 / 10",
};
