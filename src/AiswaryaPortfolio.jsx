import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import {
  GitBranch, Mail, Phone, MapPin, Download, ExternalLink,
  ArrowRight, Code2, Server, Database, Layers, ChevronDown,
  Menu, X, Star, Zap, Globe, Shield, BarChart3, ShoppingBag,
  Eye, FileText, Send, User, MessageSquare
} from "lucide-react";

/* ─── FONT IMPORT ──────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Josefin+Sans:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');`;

/* ─── DATA ──────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = {
  Frontend: { icon: <Layers size={18}/>, items: [{ name:"React.js",level:90},{ name:"Tailwind CSS",level:88},{ name:"JavaScript (ES6+)",level:85},{ name:"HTML5 & CSS3",level:92}] },
  Backend: { icon: <Server size={18}/>, items: [{ name:"Node.js",level:85},{ name:"Express.js",level:83},{ name:"Django",level:70},{ name:"Flask",level:68}] },
  Languages: { icon: <Code2 size={18}/>, items: [{ name:"Java",level:80},{ name:"Python",level:82},{ name:"C++",level:75},{ name:"PHP",level:65}] },
  "DB & Tools": { icon: <Database size={18}/>, items: [{ name:"MySQL",level:85},{ name:"MongoDB",level:78},{ name:"Git & GitHub",level:88},{ name:"Figma / AWS",level:65}] },
};

/* ─── PROJECTS — ADD YOUR REAL URLs HERE ────────────────────────────── */
const PROJECTS = [
  {
    title: "Role Based Finance Dashboard",
    period: "Mar–Apr 2026",
    icon: <BarChart3 size={22}/>,
    tech: ["Node.js","Express.js","React.js","MySQL","JWT"],
    color: "orange",
    liveUrl: "https://rolefinancedashboards.netlify.app/",        // ← your live URL
    githubUrl: "https://github.com/aiswaryaamrithraj/Finance-Dashboard",    // ← your github repo
    desc: "Full-stack finance dashboard with JWT-based authentication, role-based access control (Admin, Analyst, Viewer), advanced multi-parameter filtering, and real-time KPI analytics.",
    highlights: ["JWT Auth + RBAC","Real-time Analytics","Full CRUD + Pagination","Production Deployed"],
  },
  {
    title: "Sustainable Thrift Store Platform",
    period: "Nov–Dec 2025",
    icon: <ShoppingBag size={22}/>,
    tech: ["React.js","Node.js","MongoDB","Tailwind CSS"],
    color: "teal",
    liveUrl: "",                                                     
    githubUrl: "https://github.com/aiswaryaamrithraj/Rethreads_India",   
    desc: "Revenue-generating MERN e-commerce platform with 10+ core features including time-based drops, live countdown timers, and 15+ RESTful APIs.",
    highlights: ["10+ Core Features","Live Countdown Drops","Heart Wishlists","MVC Architecture"],
  },
  {
    title: "ShadowBan Detector",
    period: "2025",
    icon: <Eye size={22}/>,
    tech: ["Python","AI/ML","Flask"],
    color: "violet",
    liveUrl: "",
    githubUrl: "https://github.com/aiswaryaamrithraj/ShadowBan-Detector-",  
    desc: "AI-powered social media visibility analysis tool detecting shadowban status across platforms with 87% accuracy through intelligent pattern recognition.",
    highlights: ["87% Accuracy","AI-Powered","Cross-Platform","Real-time Detection"],
  },
  {
    title: "PDF Viewer & Extractor",
    period: "2025",
    icon: <FileText size={22}/>,
    tech: ["Next.js","MongoDB","Node.js"],
    color: "amber",
    liveUrl: "",
    githubUrl: "https://github.com/aiswaryaamrithraj/pdf-ai-dashboard",    
    desc: "Internship data extraction dashboard processing PDF documents and surfacing structured insights with SSR performance.",
    highlights: ["PDF Parsing","Data Extraction","Dashboard UI","MongoDB Storage"],
  },
];

const COLOR_MAP = {
  orange:{ bg:"rgba(249,115,22,0.12)", border:"rgba(249,115,22,0.35)", text:"#f97316", badge:"rgba(249,115,22,0.15)" },
  teal:{ bg:"rgba(20,184,166,0.12)", border:"rgba(20,184,166,0.35)", text:"#14b8a6", badge:"rgba(20,184,166,0.15)" },
  violet:{ bg:"rgba(139,92,246,0.12)", border:"rgba(139,92,246,0.35)", text:"#8b5cf6", badge:"rgba(139,92,246,0.15)" },
  amber:{ bg:"rgba(245,158,11,0.12)", border:"rgba(245,158,11,0.35)", text:"#f59e0b", badge:"rgba(245,158,11,0.15)" },
};

/* ─── HOOKS ─────────────────────────────────────────────────────────── */
function useInView(ref, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

/* ─── SVG ILLUSTRATIONS ─────────────────────────────────────────────── */
function HeroBg() {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"hidden" }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="1100" cy="200" rx="420" ry="420" fill="url(#orb1)"/>
      <ellipse cx="200" cy="700" rx="300" ry="300" fill="url(#orb2)"/>
      <ellipse cx="700" cy="900" rx="350" ry="350" fill="url(#orb3)"/>
      {Array.from({length:12}).map((_,i)=>(
        <line key={`v${i}`} x1={i*130} y1="0" x2={i*130} y2="900" stroke="#f97316" strokeOpacity="0.03" strokeWidth="1"/>
      ))}
      {Array.from({length:8}).map((_,i)=>(
        <line key={`h${i}`} x1="0" y1={i*130} x2="1440" y2={i*130} stroke="#f97316" strokeOpacity="0.03" strokeWidth="1"/>
      ))}
      <g style={{animation:"floatA 8s ease-in-out infinite"}}>
        <rect x="1280" y="120" width="18" height="18" rx="2" fill="#f97316" fillOpacity="0.35" transform="rotate(45 1289 129)"/>
      </g>
      <g style={{animation:"floatB 10s ease-in-out infinite"}}>
        <rect x="180" y="180" width="12" height="12" rx="1" fill="#8b5cf6" fillOpacity="0.45" transform="rotate(45 186 186)"/>
      </g>
      <g style={{animation:"floatA 12s ease-in-out infinite 2s"}}>
        <rect x="900" y="60" width="10" height="10" rx="1" fill="#f97316" fillOpacity="0.3" transform="rotate(45 905 65)"/>
      </g>
      <circle cx="1350" cy="500" r="6" fill="none" stroke="#f97316" strokeOpacity="0.4" strokeWidth="1.5" style={{animation:"floatB 9s ease-in-out infinite 1s"}}/>
      <circle cx="80" cy="400" r="4" fill="none" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1.5" style={{animation:"floatA 11s ease-in-out infinite 3s"}}/>
      <circle cx="600" cy="80" r="5" fill="#f97316" fillOpacity="0.3" style={{animation:"floatB 7s ease-in-out infinite 0.5s"}}/>
    </svg>
  );
}

function DevIllustration() {
  return (
    <svg viewBox="0 0 460 460" style={{width:"100%",maxWidth:460,height:"auto"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.4"/>
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="avatarClip">
          <circle cx="230" cy="230" r="150"/>
        </clipPath>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="230" cy="230" r="200" fill="url(#avatarGlow)"/>
      <circle cx="230" cy="230" r="165" fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.5" style={{animation:"ringPulse 3s ease-in-out infinite"}}/>
      <circle cx="230" cy="230" r="182" fill="none" stroke="#f97316" strokeWidth="0.8" strokeOpacity="0.25" style={{animation:"ringPulse 3s ease-in-out infinite 0.6s"}}/>
      <circle cx="230" cy="230" r="150" fill="#0d1424"/>
      <circle cx="230" cy="230" r="150" fill="none" stroke="#f97316" strokeWidth="2.5"/>
      <image href="https://ia601806.us.archive.org/31/items/gemini-generated-image-lujc-11lujc-11lujc-removebg-preview/Gemini_Generated_Image_lujc11lujc11lujc-removebg-preview.png" x="80" y="90" width="330" height="330" clipPath="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
      <g style={{animation:"floatA 6s ease-in-out infinite"}} filter="url(#glow)">
        <rect x="10" y="80" width="110" height="56" rx="10" fill="#0d1424" stroke="rgba(249,115,22,0.5)" strokeWidth="1"/>
        <text x="20" y="101" fill="#f97316" fontSize="9" fontFamily="monospace" opacity="0.9">const auth =</text>
        <text x="20" y="116" fill="#8b5cf6" fontSize="9" fontFamily="monospace" opacity="0.9">  JWT.verify(</text>
        <text x="20" y="129" fill="#94a3b8" fontSize="9" fontFamily="monospace" opacity="0.9">  token, key)</text>
      </g>
      <g style={{animation:"floatB 7s ease-in-out infinite 1s"}} filter="url(#glow)">
        <rect x="340" y="60" width="110" height="56" rx="10" fill="#0d1424" stroke="rgba(139,92,246,0.5)" strokeWidth="1"/>
        <text x="350" y="81" fill="#14b8a6" fontSize="9" fontFamily="monospace" opacity="0.9">app.get('/api',</text>
        <text x="350" y="96" fill="#f97316" fontSize="9" fontFamily="monospace" opacity="0.9">  async (req,</text>
        <text x="350" y="111" fill="#94a3b8" fontSize="9" fontFamily="monospace" opacity="0.9">  res) =&gt; {`{}`}</text>
      </g>
      <g style={{animation:"floatA 9s ease-in-out infinite 2s"}} filter="url(#glow)">
        <rect x="340" y="330" width="100" height="48" rx="10" fill="#0d1424" stroke="rgba(20,184,166,0.5)" strokeWidth="1"/>
        <text x="350" y="351" fill="#14b8a6" fontSize="9" fontFamily="monospace" opacity="0.9">SELECT * FROM</text>
        <text x="350" y="366" fill="#f97316" fontSize="9" fontFamily="monospace" opacity="0.9">  users WHERE</text>
      </g>
      <g style={{animation:"floatB 8s ease-in-out infinite 0.5s"}} filter="url(#glow)">
        <rect x="10" y="320" width="100" height="48" rx="10" fill="#0d1424" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
        <text x="20" y="340" fill="#8b5cf6" fontSize="9" fontFamily="monospace" opacity="0.9">import React</text>
        <text x="20" y="355" fill="#f97316" fontSize="9" fontFamily="monospace" opacity="0.9">from 'react'</text>
      </g>
      {[0,60,120,180,240,300].map((angle,i)=>{
        const rad = (angle * Math.PI)/180;
        const cx = 230 + 195*Math.cos(rad);
        const cy = 230 + 195*Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r={i%2===0?4:2.5} fill="#f97316" fillOpacity={i%2===0?0.8:0.4}/>;
      })}
      <g style={{animation:"floatA 5s ease-in-out infinite 1.5s"}}>
        <rect x="155" y="360" width="150" height="38" rx="19" fill="#f97316" filter="url(#glow)"/>
        <text x="230" y="383" fill="white" fontSize="12" fontFamily="'Josefin Sans',sans-serif" fontWeight="700" textAnchor="middle" letterSpacing="1">FULL-STACK DEV</text>
      </g>
    </svg>
  );
}

function SkillsBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"hidden"}} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="sbg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="400" rx="350" ry="350" fill="url(#sbg1)"/>
      <ellipse cx="1340" cy="400" rx="350" ry="350" fill="url(#sbg1)"/>
      {Array.from({length:6}).map((_,row)=>
        Array.from({length:10}).map((_,col)=>{
          const x = col*160 + (row%2)*80;
          const y = row*90;
          const pts = Array.from({length:6}).map((_,i)=>{
            const a = (i*60-30)*Math.PI/180;
            return `${x+40*Math.cos(a)},${y+40*Math.sin(a)}`;
          }).join(" ");
          return <polygon key={`${row}-${col}`} points={pts} fill="none" stroke="#f97316" strokeOpacity="0.04" strokeWidth="1"/>;
        })
      )}
    </svg>
  );
}

function AboutIllustration() {
  return (
    <svg viewBox="0 0 320 380" style={{width:"100%",maxWidth:320}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="320" height="450" rx="24" fill="#0d1424"/>
      <rect width="320" height="450" rx="24" fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="1"/>
      <circle cx="160" cy="160" r="130" fill="none" stroke="rgba(249,115,22,0.08)" strokeWidth="40"/>
      <circle cx="160" cy="160" r="100" fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="30"/>
      <circle cx="160" cy="150" r="85" fill="#111827"/>
      <circle cx="160" cy="150" r="85" fill="none" stroke="#f97316" strokeWidth="2"/>
      <circle cx="160" cy="150" r="85" fill="#1a1a2e"/>
      <image
        href="https://ia600700.us.archive.org/6/items/gemini-generated-image-vcyg-7lvcyg-7lvcyg-1-removebg-preview/Gemini_Generated_Image_vcyg7lvcyg7lvcyg__1_-removebg-preview.png"
        x="40" y="20" width="240" height="320"
        preserveAspectRatio="xMidYMid slice"
      />
      <rect x="20" y="320" width="280" height="100" rx="14" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.18)" strokeWidth="1"/>
      <text x="160" y="346" fill="#f8fafc" fontSize="14" fontFamily="'Playfair Display',serif" fontWeight="700" textAnchor="middle">Aiswarya Amrithraj E</text>
      <text x="160" y="368" fill="#f97316" fontSize="11" fontFamily="'Josefin Sans',sans-serif" fontWeight="600" textAnchor="middle" letterSpacing="1">FULL-STACK DEVELOPER</text>
      <path d="M20,32 L20,20 L32,20" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
      <path d="M288,32 L288,20 L276,20" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ContactBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="cbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <ellipse cx="720" cy="800" rx="600" ry="400" fill="url(#cbg)"/>
      {Array.from({length:20}).map((_,i)=>(
        <line key={i} x1={i*80-400} y1="0" x2={i*80+400} y2="800" stroke="#f97316" strokeOpacity="0.025" strokeWidth="1"/>
      ))}
    </svg>
  );
}

/* ─── COMPONENTS ────────────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(6,10,20,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(249,115,22,0.1)" : "none",
      transition:"all 0.4s ease",
      padding:"0 2.5rem",
    }}>
      <div style={{maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72}}>
        <div style={{display:"flex", alignItems:"center", gap:4, cursor:"pointer"}} onClick={() => scroll("Home")}>
          <span style={{fontSize:24, fontFamily:"'Playfair Display', serif", fontWeight:800, color:"#fff", letterSpacing:"-0.5px", fontStyle:"italic"}}>
            Aiswarya
          </span>
          <span style={{width:7, height:7, borderRadius:"50%", background:"#f97316", marginBottom:14, boxShadow:"0 0 12px #f97316"}}/>
        </div>

        <div className="desk-nav" style={{display:"flex", gap:4, alignItems:"center"}}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scroll(link)} style={{
              background:"none", border:"none", color:"#94a3b8", fontSize:13, fontWeight:600,
              padding:"8px 16px", cursor:"pointer", borderRadius:8, transition:"all 0.25s",
              fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1.5px", textTransform:"uppercase",
            }}
              onMouseEnter={e=>{e.target.style.color="#f97316"; e.target.style.background="rgba(249,115,22,0.07)";}}
              onMouseLeave={e=>{e.target.style.color="#94a3b8"; e.target.style.background="none";}}>
              {link}
            </button>
          ))}
          <button onClick={() => scroll("Contact")} style={{
            background:"#f97316", border:"none", color:"#fff", fontSize:12, fontWeight:700,
            padding:"10px 24px", borderRadius:50, cursor:"pointer", transition:"all 0.3s",
            boxShadow:"0 4px 22px rgba(249,115,22,0.45)", fontFamily:"'Josefin Sans', sans-serif",
            letterSpacing:"1.5px", textTransform:"uppercase", marginLeft:8,
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(249,115,22,0.65)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 22px rgba(249,115,22,0.45)";}}>
            Let's Talk
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="ham" style={{display:"none", background:"none", border:"none", color:"#fff", cursor:"pointer"}}>
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {open && (
        <div style={{background:"rgba(6,10,20,0.98)", borderTop:"1px solid rgba(249,115,22,0.12)", padding:"1rem 2.5rem 2rem", display:"flex", flexDirection:"column", gap:4}}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scroll(link)} style={{
              background:"none", border:"none", color:"#e2e8f0", fontSize:15, padding:"12px 0",
              textAlign:"left", cursor:"pointer", borderBottom:"1px solid rgba(255,255,255,0.05)",
              fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1.5px",
            }}>{link}</button>
          ))}
          <button onClick={() => scroll("Contact")} style={{
            background:"#f97316", border:"none", color:"#fff", fontSize:13, fontWeight:700,
            padding:"13px", borderRadius:50, cursor:"pointer", marginTop:12,
            fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1.5px",
          }}>LET'S TALK</button>
        </div>
      )}

      <style>{`
        ${FONTS}
        @media(max-width:768px){.desk-nav{display:none!important}.ham{display:block!important}}
        @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(4deg)}}
        @keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(-5deg)}}
        @keyframes ringPulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.05);opacity:0.2}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typeBlink{0%,100%{opacity:1}50%{opacity:0}}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(249,115,22,0.3); color: #fff; }
        html { scroll-behavior: smooth; }
      `}</style>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [typed, setTyped] = useState("");
  const roles = ["Full-Stack Developer", "React Specialist", "Backend Engineer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setRoleIdx(r => (r + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section id="home" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      background:"linear-gradient(145deg, #060a14 0%, #0b1228 55%, #06091a 100%)",
      position:"relative", overflow:"hidden", padding:"100px 2.5rem 60px",
    }}>
      <HeroBg/>
      <div style={{maxWidth:1200, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"3rem", flexWrap:"wrap", position:"relative", zIndex:1}}>
        <div style={{flex:"1 1 420px", opacity:loaded?1:0, animation:loaded?"fadeUp 0.9s ease both":"none"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap:8, background:"rgba(249,115,22,0.08)", border:"1px solid rgba(249,115,22,0.28)", borderRadius:50, padding:"7px 18px", marginBottom:28}}>
            <span style={{width:7, height:7, borderRadius:"50%", background:"#f97316", boxShadow:"0 0 8px #f97316", animation:"typeBlink 1.8s infinite"}}/>
            <span style={{color:"#f97316", fontSize:11, fontWeight:700, letterSpacing:"2.5px", fontFamily:"'Josefin Sans', sans-serif"}}>AVAILABLE FOR INTERNSHIP</span>
          </div>
          <p style={{color:"#64748b", fontSize:17, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", marginBottom:8, letterSpacing:"0.5px"}}>Hello, I'm</p>
          <h1 style={{fontSize:"clamp(2.6rem, 5.5vw, 4.8rem)", fontWeight:900, color:"#f8fafc", lineHeight:1.05, marginBottom:6, fontFamily:"'Playfair Display', serif", letterSpacing:"-2px"}}>
            Aiswarya<br/>
            <span style={{WebkitTextStroke:"1px #f97316", color:"transparent", letterSpacing:"-1px"}}>Amrithraj E</span>
          </h1>
          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:28, marginTop:16, height:34}}>
            <span style={{width:3, height:28, background:"#f97316", borderRadius:2, flexShrink:0}}/>
            <span style={{color:"#f97316", fontSize:20, fontFamily:"'Josefin Sans', sans-serif", fontWeight:600, letterSpacing:"0.5px"}}>
              {typed}
              <span style={{animation:"typeBlink 0.8s infinite", borderLeft:"2px solid #f97316", marginLeft:1}}>&nbsp;</span>
            </span>
          </div>
          <p style={{color:"#94a3b8", fontSize:15.5, lineHeight:1.8, marginBottom:38, maxWidth:500, fontFamily:"'Josefin Sans', sans-serif", fontWeight:300}}>
            Pre-final year CSE student focused on building and deploying scalable web applications. Strong foundation in REST API integration, backend development, and performance optimization.
          </p>
          <div style={{display:"flex", gap:14, flexWrap:"wrap", marginBottom:38}}>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
              style={{background:"#f97316", border:"none", color:"#fff", fontSize:13, fontWeight:700, padding:"15px 32px", borderRadius:50, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 6px 26px rgba(249,115,22,0.5)", display:"flex", alignItems:"center", gap:9, fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1.5px", textTransform:"uppercase"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 38px rgba(249,115,22,0.65)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 6px 26px rgba(249,115,22,0.5)";}}>
              Hire Me <ArrowRight size={15}/>
            </button>
            <a href="https://drive.google.com/file/d/17COJ50xsMTShg9Srv85PwHHdTAfpu0O6/view?usp=sharing" download style={{background:"transparent", border:"1.5px solid rgba(249,115,22,0.6)", color:"#f97316", fontSize:13, fontWeight:700, padding:"13px 30px", borderRadius:50, cursor:"pointer", transition:"all 0.3s", display:"flex", alignItems:"center", gap:9, textDecoration:"none", fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1.5px", textTransform:"uppercase"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,0.1)"; e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="none";}}>
              <Download size={15}/> Resume
            </a>
          </div>
          <div style={{display:"flex", gap:12}}>
            {[
              {icon:<GitBranch size={20}/>, label:"GitHub", url:"https://github.com/aiswaryaamrithraj"},
              {icon:<Globe size={20}/>, label:"LinkedIn", url:"https://www.linkedin.com/in/aiswarya-amrithraj-e/"},
              {icon:<Mail size={19}/>, label:"Email", url:"mailto:aiswaryaamrithraje@gmail.com"},
            ].map(({icon,label,url}) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{width:46, height:46, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"#64748b", transition:"all 0.3s", textDecoration:"none"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,0.14)"; e.currentTarget.style.border="1px solid rgba(249,115,22,0.5)"; e.currentTarget.style.color="#f97316"; e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.border="1px solid rgba(255,255,255,0.1)"; e.currentTarget.style.color="#64748b"; e.currentTarget.style.transform="none";}}>
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div style={{flex:"0 0 auto", opacity:loaded?1:0, animation:loaded?"fadeUp 0.9s ease 0.25s both":"none", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <DevIllustration/>
        </div>
      </div>
      <div style={{position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", animation:"floatB 2.5s ease-in-out infinite"}}>
        <ChevronDown size={22} color="#f97316" opacity={0.5}/>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef();
  const inView = useInView(ref);
  const INFO = [
    {icon:<User size={15}/>, label:"Name", value:"Aiswarya Amrithraj E"},
    {icon:<Mail size={15}/>, label:"Email", value:"aiswaryaamrithraje@gmail.com"},
    {icon:<Phone size={15}/>, label:"Phone", value:"+91 7560959959"},
    {icon:<MapPin size={15}/>, label:"Education", value:"B.Tech CSE, LPU Punjab"},
  ];
  return (
    <section id="about" style={{padding:"110px 2.5rem", background:"#070b18", position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&auto=format&q=30')", backgroundSize:"cover", backgroundPosition:"center", opacity:0.025, pointerEvents:"none"}}/>
      <div ref={ref} style={{maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1, opacity:inView?1:0, transform:inView?"none":"translateY(44px)", transition:"all 0.9s ease"}}>
        <SectionHeader label="WHO I AM" title="About" highlight="Me"/>
        <div style={{display:"flex", gap:"4rem", alignItems:"center", flexWrap:"wrap", marginTop:64}}>
          <div style={{flex:"0 0 auto", display:"flex", justifyContent:"center"}}>
            <AboutIllustration/>
          </div>
          <div style={{flex:"1 1 320px"}}>
            <h3 style={{color:"#f8fafc", fontSize:"clamp(1.5rem, 3vw, 2rem)", fontWeight:700, margin:"0 0 18px", fontFamily:"'Playfair Display', serif", lineHeight:1.3}}>
              Building <em style={{color:"#f97316", fontStyle:"italic"}}>impactful</em> solutions<br/>with clean architecture
            </h3>
            <p style={{color:"#94a3b8", lineHeight:1.85, fontSize:15, marginBottom:18, fontFamily:"'Josefin Sans', sans-serif", fontWeight:300}}>
              Pre-final year Computer Science Engineering student with hands-on experience building and deploying scalable web applications using React.js, Node.js, and modern development tools.
            </p>
            <p style={{color:"#94a3b8", lineHeight:1.85, fontSize:15, marginBottom:30, fontFamily:"'Josefin Sans', sans-serif", fontWeight:300}}>
              Strong foundation in REST API integration, backend development, and performance optimization. Experienced in real-world full-stack projects with a focus on clean architecture and production-ready systems.
            </p>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:28}}>
              {INFO.map(({icon,label,value}) => (
                <div key={label} style={{background:"rgba(15,22,40,0.9)", border:"1px solid rgba(249,115,22,0.12)", borderRadius:14, padding:"14px 16px", transition:"all 0.3s"}}
                  onMouseEnter={e=>{e.currentTarget.style.border="1px solid rgba(249,115,22,0.38)"; e.currentTarget.style.background="rgba(249,115,22,0.05)";}}
                  onMouseLeave={e=>{e.currentTarget.style.border="1px solid rgba(249,115,22,0.12)"; e.currentTarget.style.background="rgba(15,22,40,0.9)";}}>
                  <div style={{display:"flex", alignItems:"center", gap:7, marginBottom:5}}>
                    <span style={{color:"#f97316"}}>{icon}</span>
                    <span style={{color:"#64748b", fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", fontFamily:"'Josefin Sans', sans-serif"}}>{label}</span>
                  </div>
                  <p style={{color:"#e2e8f0", fontSize:12.5, fontFamily:"'Josefin Sans', sans-serif", fontWeight:400, margin:0}}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{display:"flex", flexWrap:"wrap", gap:9}}>
              {["REST APIs","JWT Auth","MVC Architecture","RBAC","Full-Stack","Agile"].map(tag => (
                <span key={tag} style={{background:"rgba(249,115,22,0.08)", border:"1px solid rgba(249,115,22,0.22)", color:"#f97316", borderRadius:50, padding:"5px 15px", fontSize:11, fontWeight:700, fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1px"}}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({name, level, delay=0}) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{marginBottom:16}}>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:7}}>
        <span style={{color:"#cbd5e1", fontSize:12.5, fontFamily:"'Josefin Sans', sans-serif", fontWeight:600, letterSpacing:"0.5px"}}>{name}</span>
        <span style={{color:"#f97316", fontSize:12, fontFamily:"'Josefin Sans', sans-serif", fontWeight:700}}>{level}%</span>
      </div>
      <div style={{height:5, background:"rgba(255,255,255,0.06)", borderRadius:6, overflow:"hidden"}}>
        <div style={{height:"100%", background:"linear-gradient(90deg, #c2410c, #f97316, #fdba74)", borderRadius:6, width:inView?`${level}%`:"0%", transition:`width 1.3s cubic-bezier(0.4,0,0.2,1) ${delay}s`, boxShadow:"0 0 10px rgba(249,115,22,0.45)"}}/>
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <section id="skills" style={{padding:"110px 2.5rem", background:"#060a14", position:"relative", overflow:"hidden"}}>
      <SkillsBg/>
      <div ref={ref} style={{maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1, opacity:inView?1:0, transform:inView?"none":"translateY(44px)", transition:"all 0.9s ease"}}>
        <SectionHeader label="WHAT I KNOW" title="My" highlight="Skills"/>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))", gap:22, marginTop:64}}>
          {Object.entries(SKILLS).map(([cat,{icon,items}],ci) => (
            <div key={cat} style={{background:"rgba(12,18,34,0.85)", border:"1px solid rgba(249,115,22,0.1)", borderRadius:22, padding:"28px 24px", transition:"all 0.35s", backdropFilter:"blur(8px)"}}
              onMouseEnter={e=>{e.currentTarget.style.border="1px solid rgba(249,115,22,0.38)"; e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(249,115,22,0.08)";}}
              onMouseLeave={e=>{e.currentTarget.style.border="1px solid rgba(249,115,22,0.1)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none";}}>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:22}}>
                <div style={{width:36, height:36, borderRadius:10, background:"rgba(249,115,22,0.12)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f97316"}}>{icon}</div>
                <h3 style={{color:"#f8fafc", fontSize:15, fontWeight:700, fontFamily:"'Playfair Display', serif", letterSpacing:"-0.3px"}}>{cat}</h3>
              </div>
              {items.map((s,i) => <SkillBar key={s.name} name={s.name} level={s.level} delay={ci*0.08+i*0.1}/>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS — with working GitHub & Live Demo links ──────────────── */
function Projects() {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <section id="projects" style={{padding:"110px 2.5rem", background:"#070b18", position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1600&auto=format&q=25')", backgroundSize:"cover", backgroundPosition:"center", opacity:0.03, pointerEvents:"none"}}/>
      <div ref={ref} style={{maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1, opacity:inView?1:0, transform:inView?"none":"translateY(44px)", transition:"all 0.9s ease"}}>
        <SectionHeader label="WHAT I'VE BUILT" title="My" highlight="Projects"/>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(460px, 1fr))", gap:24, marginTop:64}}>
          {PROJECTS.map(p => {
            const c = COLOR_MAP[p.color];
            return (
              <div key={p.title} style={{background:"rgba(10,16,30,0.9)", border:`1px solid ${c.border.replace("0.35","0.12")}`, borderRadius:24, padding:"32px", transition:"all 0.38s", position:"relative", overflow:"hidden", backdropFilter:"blur(6px)"}}
                onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${c.border}`; e.currentTarget.style.transform="translateY(-7px)"; e.currentTarget.style.boxShadow=`0 24px 64px ${c.bg}`;}}
                onMouseLeave={e=>{e.currentTarget.style.border=`1px solid ${c.border.replace("0.35","0.12")}`; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none";}}>

                {/* Glow blob */}
                <div style={{position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle, ${c.bg} 0%, transparent 70%)`, pointerEvents:"none"}}/>

                {/* ── Header with link buttons ── */}
                <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18}}>
                  <div style={{display:"flex", alignItems:"center", gap:14}}>
                    <div style={{width:52, height:52, borderRadius:14, background:c.bg, border:`1px solid ${c.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:c.text, flexShrink:0}}>
                      {p.icon}
                    </div>
                    <div>
                      <h3 style={{color:"#f8fafc", fontSize:16.5, fontWeight:700, fontFamily:"'Playfair Display', serif", margin:0, lineHeight:1.25}}>{p.title}</h3>
                      <span style={{color:"#64748b", fontSize:11.5, fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"0.5px"}}>{p.period}</span>
                    </div>
                  </div>

                  {/* Link icon buttons — top right of card */}
                  <div style={{display:"flex", gap:8, flexShrink:0, marginTop:2}}>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo"
                        style={{width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:`rgba(249,115,22,0.12)`, border:`1px solid rgba(249,115,22,0.35)`, color:"#f97316", textDecoration:"none", transition:"all 0.3s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="#f97316"; e.currentTarget.style.color="#fff"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 16px rgba(249,115,22,0.5)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="rgba(249,115,22,0.12)"; e.currentTarget.style.color="#f97316"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none";}}>
                        <ExternalLink size={14}/>
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Repo"
                        style={{width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:"#94a3b8", textDecoration:"none", transition:"all 0.3s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,0.12)"; e.currentTarget.style.border=`1px solid rgba(249,115,22,0.35)`; e.currentTarget.style.color="#f97316"; e.currentTarget.style.transform="translateY(-2px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.border="1px solid rgba(255,255,255,0.12)"; e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.transform="none";}}>
                        <GitBranch size={14}/>
                      </a>
                    )}
                  </div>
                </div>

                <p style={{color:"#94a3b8", fontSize:13.5, lineHeight:1.8, marginBottom:18, fontFamily:"'Josefin Sans', sans-serif", fontWeight:300}}>{p.desc}</p>

                {/* Highlight tags */}
                <div style={{display:"flex", flexWrap:"wrap", gap:8, marginBottom:18}}>
                  {p.highlights.map(h => (
                    <span key={h} style={{background:c.badge, color:c.text, fontSize:11, fontWeight:700, padding:"4px 13px", borderRadius:50, fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"0.5px", border:`1px solid ${c.border}`}}>{h}</span>
                  ))}
                </div>

                {/* Tech stack */}
                <div style={{display:"flex", flexWrap:"wrap", gap:7, borderTop:"1px solid rgba(255,255,255,0.055)", paddingTop:16, marginBottom:16}}>
                  {p.tech.map(t => (
                    <span key={t} style={{background:"rgba(255,255,255,0.04)", color:"#64748b", fontSize:11.5, padding:"4px 12px", borderRadius:7, fontFamily:"'Josefin Sans', sans-serif", border:"1px solid rgba(255,255,255,0.07)"}}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef();
  const inView = useInView(ref);
  const [form, setForm] = useState({name:"", email:"", message:""});
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ).then(() => {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({name:"", email:"", message:""});
      }).catch(err => {
        console.error('Failed to send:', err);
        alert('Something went wrong. Please try again.');
      });
    }
  };

  const inp = {
    width:"100%", background:"rgba(12,18,34,0.85)", border:"none",
    borderBottom:"2px solid rgba(255,255,255,0.08)", borderRadius:0,
    color:"#e2e8f0", fontSize:14, padding:"14px 4px 14px 32px", outline:"none",
    fontFamily:"'Josefin Sans', sans-serif", transition:"border-color 0.3s", boxSizing:"border-box",
  };

  return (
    <section id="contact" style={{padding:"110px 2.5rem", background:"#060a14", position:"relative", overflow:"hidden"}}>
      <ContactBg/>
      <div ref={ref} style={{maxWidth:900, margin:"0 auto", position:"relative", zIndex:1, opacity:inView?1:0, transform:inView?"none":"translateY(44px)", transition:"all 0.9s ease"}}>
        <SectionHeader label="LET'S WORK TOGETHER" title="Get In" highlight="Touch"/>
        <div style={{display:"flex", gap:"4rem", flexWrap:"wrap", marginTop:64}}>
          <div style={{flex:"1 1 240px"}}>
            <h3 style={{color:"#f8fafc", fontSize:"clamp(1.2rem,2.5vw,1.6rem)", fontWeight:700, fontFamily:"'Playfair Display', serif", margin:"0 0 16px", lineHeight:1.3}}>
              Let's build something<br/><em style={{color:"#f97316"}}>remarkable</em> together
            </h3>
            <p style={{color:"#94a3b8", lineHeight:1.85, fontSize:14, marginBottom:32, fontFamily:"'Josefin Sans', sans-serif", fontWeight:300}}>
              Open to internship opportunities, freelance projects, and collaborations. Reach out and let's connect!
            </p>
            <div style={{display:"flex", flexDirection:"column", gap:18}}>
              {[
                {icon:<Mail size={16}/>, val:"aiswaryaamrithraje@gmail.com"},
                {icon:<Phone size={16}/>, val:"+91 7560959959"},
                {icon:<MapPin size={16}/>, val:"LPU, Punjab, India"},
              ].map(({icon,val}) => (
                <div key={val} style={{display:"flex", alignItems:"center", gap:14}}>
                  <div style={{width:40, height:40, borderRadius:10, background:"rgba(249,115,22,0.09)", border:"1px solid rgba(249,115,22,0.22)", display:"flex", alignItems:"center", justifyContent:"center", color:"#f97316", flexShrink:0}}>{icon}</div>
                  <span style={{color:"#94a3b8", fontSize:13, fontFamily:"'Josefin Sans', sans-serif"}}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{flex:"1 1 340px", display:"flex", flexDirection:"column", gap:26}}>
            {[
              {id:"name", ph:"Your Name", icon:<User size={15}/>, type:"text"},
              {id:"email", ph:"Your Email", icon:<Mail size={15}/>, type:"email"},
            ].map(({id,ph,icon,type}) => (
              <div key={id} style={{position:"relative"}}>
                <span style={{position:"absolute", left:4, bottom:15, color:"#64748b"}}>{icon}</span>
                <input placeholder={ph} type={type} value={form[id]}
                  onChange={e=>setForm(f=>({...f,[id]:e.target.value}))}
                  style={inp}
                  onFocus={e=>{e.target.style.borderBottomColor="#f97316";}}
                  onBlur={e=>{e.target.style.borderBottomColor="rgba(255,255,255,0.08)";}}/>
              </div>
            ))}
            <div style={{position:"relative"}}>
              <span style={{position:"absolute", left:4, top:15, color:"#64748b"}}><MessageSquare size={15}/></span>
              <textarea placeholder="Your Message..." rows={5} value={form.message}
                onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                style={{...inp, resize:"vertical", paddingTop:14}}
                onFocus={e=>{e.target.style.borderBottomColor="#f97316";}}
                onBlur={e=>{e.target.style.borderBottomColor="rgba(255,255,255,0.08)";}}/>
            </div>
            <button onClick={handleSubmit} style={{
              background:sent?"#10b981":"#f97316", border:"none", color:"#fff",
              fontSize:12, fontWeight:700, padding:"16px", borderRadius:50,
              cursor:"pointer", transition:"all 0.35s", display:"flex", alignItems:"center",
              justifyContent:"center", gap:10,
              boxShadow:sent?"0 6px 24px rgba(16,185,129,0.5)":"0 6px 26px rgba(249,115,22,0.5)",
              fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"2px", textTransform:"uppercase",
            }}
              onMouseEnter={e=>{if(!sent){e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 38px rgba(249,115,22,0.65)";}}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";}}>
              {sent ? "Message Sent!" : <><Send size={14}/> Send Message</>}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{maxWidth:1100, margin:"80px auto 0", borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:36, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16, position:"relative", zIndex:1}}>
        <span style={{fontSize:22, fontFamily:"'Playfair Display', serif", fontWeight:900, color:"#f8fafc", fontStyle:"italic"}}>
          Aiswarya<span style={{color:"#f97316"}}>.</span>
        </span>
        <p style={{color:"#334155", fontSize:12.5, fontFamily:"'Josefin Sans', sans-serif", margin:0, letterSpacing:"0.5px"}}>
          &copy; {new Date().getFullYear()} Aiswarya Amrithraj E. All rights reserved.
        </p>
        <div style={{display:"flex", gap:22}}>
          {[
            {label:"GitHub", url:"https://github.com/aiswaryaamrithraj"},
            {label:"LinkedIn", url:"https://www.linkedin.com/in/aiswarya-amrithraj-e/"},
          ].map(({label,url}) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer"
              style={{color:"#475569", fontSize:12, textDecoration:"none", transition:"color 0.2s", fontFamily:"'Josefin Sans', sans-serif", letterSpacing:"1px", fontWeight:600}}
              onMouseEnter={e=>e.target.style.color="#f97316"}
              onMouseLeave={e=>e.target.style.color="#475569"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({label, title, highlight}) {
  return (
    <div style={{textAlign:"center"}}>
      <span style={{color:"#f97316", fontSize:11, fontWeight:700, letterSpacing:"3.5px", fontFamily:"'Josefin Sans', sans-serif", display:"block", marginBottom:14, textTransform:"uppercase"}}>{label}</span>
      <h2 style={{color:"#f8fafc", fontSize:"clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight:900, margin:0, fontFamily:"'Playfair Display', serif", letterSpacing:"-1.5px", lineHeight:1.1}}>
        {title} <span style={{color:"#f97316", fontStyle:"italic"}}>{highlight}</span>
      </h2>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:20}}>
        <div style={{height:1, width:70, background:"linear-gradient(90deg, transparent, rgba(249,115,22,0.5))"}}/>
        <div style={{width:7, height:7, borderRadius:"50%", background:"#f97316", boxShadow:"0 0 10px #f97316"}}/>
        <div style={{height:1, width:70, background:"linear-gradient(90deg, rgba(249,115,22,0.5), transparent)"}}/>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{background:"#060a14", minHeight:"100vh"}}>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
    </div>
  );
}