/*
 * Design: Warm Modernism — Anthropic + Thinking Machines Lab inspired
 * Color: Warm cream bg (#F5F0E8), terracotta accent (#C4704B), dark brown text
 * Typography: DM Serif Display headings + DM Sans body
 * Layout: Sidebar (fixed on desktop) + scrollable content
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Building2, ExternalLink, GraduationCap, Briefcase, BookOpen, Users, ChevronUp, Github, Linkedin, Twitter, Sparkles, PenLine, Trophy } from "lucide-react";

const PROFILE_PHOTO = "/images/profile.jpeg";

const HERO_BG = "/images/hero-bg.jpg";

const RESEARCH_BG = "/images/research-pattern.jpg";

// ─── Inline SVG Company Logos ───
function AmazonLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/>
    </svg>
  );
}

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
      <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
      <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
      <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
      <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
      <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
      <path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z" fill="#4285F4"/>
    </svg>
  );
}

function MicrosoftLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '0.9em', height: '0.9em' }}>
      <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
      <rect x="12" y="1" width="10" height="10" fill="#7fba00"/>
      <rect x="1" y="12" width="10" height="10" fill="#00a4ef"/>
      <rect x="12" y="12" width="10" height="10" fill="#ffb900"/>
    </svg>
  );
}

function GoogleScholarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
    </svg>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

// Navigation items
const NAV_ITEMS = [
  { id: "about", label: "About" },
  // { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "teaching", label: "Teaching" },
  { id: "service", label: "Service" },
];

// Publications data
const PREPRINTS = [
  {
    title: "Precise Attribute Intensity Control in Large Language Models via Targeted Representation Editing",
    authors: "Rongzhi Zhang*, Liqin Ye*, Yuzhao Heng, Xiang Chen, Tong Yu, Lingkai Kong, Sudheer Chava and Chao Zhang.",
    venue: "Preprint on ArXiv",
    year: "2025",
    first: true,
    url: "https://arxiv.org/html/2510.12121v1",
  },
  {
    title: "Instant Personalized Large Language Model Adaptation via Hypernetwork",
    authors: "Zhaoxuan Tan, Zixuan Zhang, Haoyang Wen, Zheng Li, Rongzhi Zhang, Pei Chen, Fengran Mo, Zheyuan Liu, Qingkai Zeng, Qingyu Yin and Meng Jiang.",
    venue: "Preprint on ArXiv",
    year: "2025",
    first: false,
    url: "https://arxiv.org/pdf/2510.16282",
  },
  {
    title: "HeaPA: Difficulty-Aware Heap Sampling and On-Policy Query Augmentation for LLM Reinforcement Learning",
    authors: "Weiqi Wang, Xin Liu, Binxuan Huang, Hejie Cui, Rongzhi Zhang, Changlong Yu, Shuowei Jin, Jingfeng Yang, Qingyu Yin, Zhengyang Wang, Zheng Li, Yifan Gao, Priyanka Nigam, Bing Yin, Lihong Li, Yangqiu Song",
    venue: "Preprint on ArXiv",
    year: "2026",
    first: false,
    url: "https://arxiv.org/pdf/2601.22448",
  },
];

const PUBLICATIONS = [
  {
    title: "MLE-Dojo: Interactive Environments for Empowering LLM Agents in Machine Learning Engineering",
    authors: "Rushi Qiang, Yuchen Zhuang, Yinghao Li, Rongzhi Zhang, Changhao Li, Ian Shu-Hei Wong, Sherry Yang, Percy Liang, Chao Zhang and Bo Dai.",
    venue: "NeurIPS",
    year: "2025",
    first: false,
    url: "https://openreview.net/pdf?id=5W5mFU4oMO",
  },
  {
    title: "DORM: Preference Data Weights Optimization for Reward Modeling in LLM Alignment",
    authors: "Rongzhi Zhang, Chenwei Zhang, Xinyang Zhang, Liang Qiu, Haoming Jiang, Yuchen Zhuang, Qingru Zhang, Hyokun Yun, Xian Li, Bing Yin, Tuo Zhao, Chao Zhang.",
    venue: "EMNLP Findings",
    year: "2025",
    first: true,
    url: "https://aclanthology.org/2025.findings-emnlp.1237.pdf",
  },
  {
    title: "Self-Rewarding PPO: Aligning Large Language Models with Demonstrations Only",
    authors: "Qingru Zhang, Liang Qiu, Ilgee Hong, Zhenghao Xu, Tianyi Liu, Shiyang Li, Rongzhi Zhang, Zheng Li, Lihong Li, Bing Yin, Chao Zhang, Jianshu Chen, Haoming Jiang and Tuo Zhao.",
    venue: "COLM",
    year: "2025",
    first: false,
    url: "https://arxiv.org/pdf/2510.21090",
  },
  {
    title: "Hephaestus: Improving Fundamental Agent Capabilities of Large Language Models through Continual Pre-Training",
    authors: "Yuchen Zhuang, Jingfeng Yang, Haoming Jiang, Xin Liu, Kewei Cheng, Sanket Lokegaonkar, Yifan Gao, Qing Ping, Tianyi Liu, Binxuan Huang, Zheng Li, Zhengyang Wang, Pei Chen, Ruijie Wang, Rongzhi Zhang, Nasser Zalmout, Priyanka Nigam, Bing Yin and Chao Zhang.",
    venue: "NAACL",
    year: "2025",
    first: false,
    url: "https://aclanthology.org/2025.naacl-long.308.pdf",
  },
  {
    title: "LoRC: Low-Rank Compression for LLMs KV Cache with a Progressive Compression Strategy",
    authors: "Rongzhi Zhang, Kuan Wang, Liyuan Liu, Shuohang Wang, Hao Cheng, Chao Zhang and Yelong Shen.",
    venue: "NeurIPS Workshop",
    year: "2024",
    first: true,
    url: "https://arxiv.org/abs/2410.03111",
  },
  {
    title: "Aligning Large Language Models with Representation Editing: A Control Perspective",
    authors: "Lingkai Kong, Haorui Wang, Wenhao Mu, Yuanqi Du, Yuchen Zhuang, Yifei Zhou, Yue Song, Rongzhi Zhang, Kai Wang and Chao Zhang.",
    venue: "NeurIPS",
    year: "2024",
    first: false,
    url: "https://arxiv.org/abs/2406.05954",
  },
  {
    title: "TPD: Enhancing Student Language Model Reasoning via Principle Discovery and Guidance",
    authors: "Haorui Wang, Rongzhi Zhang, Yinghao Li, Lingkai Kong, Yuchen Zhuang, Xiusi Chen and Chao Zhang.",
    venue: "COLM",
    year: "2024",
    first: false,
    url: "https://arxiv.org/abs/2401.13849",
  },
  {
    title: "Knowledge Distillation with Perturbed Loss: From a Vanilla Teacher to a Proxy Teacher",
    authors: "Rongzhi Zhang, Jiaming Shen, Tianqi Liu, Jialu Liu, Michael Bendersky, Marc Najork and Chao Zhang.",
    venue: "KDD",
    year: "2024",
    first: true,
    url: "https://dl.acm.org/doi/pdf/10.1145/3637528.3671851",
  },
  {
    title: "PLaD: Preference-based Large Language Model Distillation with Pseudo-Preference Pairs",
    authors: "Rongzhi Zhang, Jiaming Shen, Tianqi Liu, Haorui Wang, Zhen Qin, Feng Han, Jialu Liu, Simon Baumgartner, Michael Bendersky and Chao Zhang.",
    venue: "ACL Findings",
    year: "2024",
    first: true,
    url: "https://aclanthology.org/2024.findings-acl.923.pdf",
  },
  {
    title: "ProgGen: Generating Named Entity Recognition Datasets Step-by-step with Self-Reflexive Large Language Models",
    authors: "Yuzhao Heng, Chunyuan Deng, Yitong Li, Yue Yu, Yinghao Li, Rongzhi Zhang, Chao Zhang.",
    venue: "ACL Findings",
    year: "2024",
    first: false,
    url: "https://arxiv.org/pdf/2403.11103",
  },
  {
    title: "Local Boosting for Weakly-Supervised Learning",
    authors: "Rongzhi Zhang, Yue Yu, Jiaming Shen, Xiquan Cui and Chao Zhang.",
    venue: "KDD",
    year: "2023",
    first: true,
    url: "https://dl.acm.org/doi/pdf/10.1145/3580305.3599417",
  },
  {
    title: "Cold-Start Data Selection for Few-shot Language Model Fine-tuning: A Prompt-Based Uncertainty Propagation Approach",
    authors: "Yue Yu, Rongzhi Zhang, Ran Xu, Jieyu Zhang, Jiaming Shen and Chao Zhang.",
    venue: "ACL",
    year: "2023",
    first: false,
    url: "https://arxiv.org/abs/2209.06995",
  },
  {
    title: "Zero-Shot Text Classification by Training Data Creation with Progressive Dense Retrieval",
    authors: "Yue Yu, Yuchen Zhuang, Rongzhi Zhang, Yu Meng, Jiaming Shen and Chao Zhang.",
    venue: "ACL Findings",
    year: "2023",
    first: false,
    url: "https://arxiv.org/abs/2305.10703",
  },
  {
    title: "PRBoost: Prompt-Based Rule Discovery and Boosting for Interactive Weakly-Supervised Learning",
    authors: "Rongzhi Zhang, Yue Yu, Shetty Pranav, Le Song and Chao Zhang.",
    venue: "ACL",
    year: "2022",
    first: true,
    url: "https://aclanthology.org/2022.acl-long.55.pdf",
  },
  {
    title: "Adaptive Multi-view Rule Discovery for Weakly-Supervised Compatible Products Prediction",
    authors: "Rongzhi Zhang, Rebecca West, Xiquan Cui and Chao Zhang.",
    venue: "KDD",
    year: "2022",
    first: true,
    url: "https://dl.acm.org/doi/pdf/10.1145/3534678.3539208",
  },
  {
    title: "AcTune: Uncertainty-Aware Active Self-Training for Active Fine-Tuning of Pretrained Language Models",
    authors: "Yue Yu, Lingkai Kong, Jieyu Zhang, Rongzhi Zhang and Chao Zhang.",
    venue: "NAACL",
    year: "2022",
    first: false,
    url: "https://arxiv.org/pdf/2112.08787.pdf",
  },
  {
    title: "SeqMix: Augmenting Active Sequence Labeling via Sequence Mixup",
    authors: "Rongzhi Zhang, Yue Yu and Chao Zhang.",
    venue: "EMNLP",
    year: "2020",
    first: true,
    url: "https://rongzhizhang.org/pdf/emnlp20_SeqMix.pdf",
  },
];

const EXPERIENCES = [
  {
    role: "Applied Scientist Intern",
    company: "Amazon Stores Foundational AI",
    companyUrl: "https://www.aboutamazon.com/news/retail/amazon-rufus",
    location: "Palo Alto, CA",
    period: "May 2024 – Nov. 2024",
    hosts: [
      { name: "Chenwei Zhang", url: "https://cwzhang.com/" },
      { name: "Xinyang Zhang", url: "https://scholar.google.com/citations?user=5nowj40AAAAJ" },
    ],
    LogoComponent: AmazonLogo,
  },
  {
    role: "Research Intern",
    company: "Microsoft Azure AI",
    companyUrl: "https://www.microsoft.com/en-us/research/",
    location: "Redmond, WA",
    period: "Jan. 2024 – May 2024",
    hosts: [
      { name: "Shuohang Wang", url: "https://sites.google.com/site/shuohangsite" },
      { name: "Lucas Liu", url: "https://liyuanlucasliu.github.io/" },
      { name: "Yelong Shen", url: "https://scholar.google.com/citations?user=S6OFEFEAAAAJ" },
    ],
    LogoComponent: MicrosoftLogo,
  },
  {
    role: "Student Researcher",
    company: "Google Research",
    companyUrl: "https://research.google/",
    location: "New York City, NY",
    period: "May 2023 – Dec. 2023",
    hosts: [
      { name: "Jiaming Shen", url: "https://mickeysjm.github.io/" },
      { name: "Tianqi Liu", url: "https://scholar.google.com/citations?user=pUKhiMIAAAAJ" },
      { name: "Jialu Liu", url: "https://jialu.info/" },
    ],
    LogoComponent: GoogleLogo,
  },
  {
    role: "Student Researcher",
    company: "Google Research",
    companyUrl: "https://research.google/",
    location: "New York City, NY",
    period: "May 2022 – Dec. 2022",
    hosts: [
      { name: "Jiaming Shen", url: "https://mickeysjm.github.io/" },
      { name: "Tianqi Liu", url: "https://scholar.google.com/citations?user=pUKhiMIAAAAJ" },
      { name: "Michael Bendersky", url: "https://scholar.google.com/citations?user=C9mxM5IAAAAJ" },
    ],
    LogoComponent: GoogleLogo,
  },
];

const TEACHING = [
  { course: "CSE 8803 - Deep Learning for Text Data", semester: "Fall 2023", school: "Georgia Tech", url: "http://chaozhang.org/course/cse8803-23f.html" },
  { course: "CSE 8803 - Deep Learning for Text Data", semester: "Fall 2021", school: "Georgia Tech", url: "http://chaozhang.org/course/cse8803-21f.html" },
  { course: "CS 4641/7641 - Machine Learning", semester: "Fall 2020", school: "Georgia Tech", url: "https://mahdi-roozbahani.github.io/CS46417641-fall2020/#" },
];

const SERVICE_AC = [{ venue: "ACL Rolling Review", year: "2025" }];
const SERVICE_REVIEWER = [
  { venue: "EMNLP", year: "2022 – Present" },
  { venue: "ACL", year: "2022 – Present" },
  { venue: "ACL Rolling Review", year: "2023 – Present" },
  { venue: "KDD", year: "2023 – Present" },
  { venue: "NeurIPS", year: "2023 – Present" },
  { venue: "ICML", year: "2024 – Present" },
  { venue: "ICLR", year: "2024 – Present" },
  { venue: "COLM", year: "2025" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0 };
        return { id: item.id, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 120 && section.top > closest.top) return section;
        return closest;
      }, { id: "about", top: -Infinity });

      setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen">
      {/* Desktop Sidebar + Content Layout */}
      <div className="lg:flex">
        {/* Sidebar - fixed on desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-80 xl:w-96 lg:border-r border-warm-border bg-warm-bg/50 backdrop-blur-sm z-40">
          <div className="flex-1 flex flex-col justify-center px-8 xl:px-12">
            {/* Profile */}
            <div className="mb-8">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-6 ring-4 ring-warm-border shadow-lg">
                <img src={PROFILE_PHOTO} alt="Rongzhi Zhang" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl xl:text-4xl font-serif text-foreground mb-2">Rongzhi Zhang</h1>
              <p className="text-base text-terracotta font-medium mb-1">Applied Scientist, Amazon</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ph.D. in Machine Learning<br />
                Georgia Institute of Technology
              </p>
            </div>

            {/* Contact Info */}
            {/* <div className="space-y-3 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <a href="mailto:rongzhi.zhang@gatech.edu" className="hover:text-terracotta transition-colors">
                  rongzhi.zhang@gatech.edu
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-terracotta shrink-0" />
                <span>CODA E1317</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                <span>756 W Peachtree St NW, Atlanta, GA 30308</span>
              </div>
            </div> */}

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-8">
              <a href="https://twitter.com/rongzhi_zhang" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://scholar.google.com/citations?hl=en&user=jHgmQEIAAAAJ" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="Google Scholar">
                <GoogleScholarIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com/rz-zhang" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/rongzhi-zhang-a20460178/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Separator */}
            <div className="border-t border-warm-border/60 mb-6" />

            {/* Navigation */}
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-terracotta/10 text-terracotta"
                      : "text-muted-foreground hover:text-foreground hover:bg-warm-card"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-80 xl:ml-96 flex-1">
          {/* Mobile Header */}
          <MobileHeader />

          {/* Hero Section */}
          <section
            id="about"
            className="relative overflow-hidden"
            style={{ scrollMarginTop: "80px" }}
          >
            <div className="absolute inset-0 z-0">
              <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
            </div>

            <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-12 pb-10 lg:pt-20 lg:pb-14">
              {/* Mobile Profile */}
              <div className="lg:hidden mb-8">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-warm-border shadow-lg">
                  <img src={PROFILE_PHOTO} alt="Rongzhi Zhang" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-3xl font-serif text-foreground mb-1">Rongzhi Zhang</h1>
                <p className="text-base text-terracotta font-medium mb-1">Applied Scientist, Amazon</p>
                <p className="text-sm text-muted-foreground">
                  Ph.D. in Machine Learning, Georgia Institute of Technology
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-terracotta" />
                  <a href="mailto:rongzhi.zhang@gatech.edu" className="hover:text-terracotta transition-colors">
                    rongzhi.zhang@gatech.edu
                  </a>
                </div>
              </div>

              <AnimatedSection>
                <FadeIn>
                  <div className="flex items-center gap-3 mb-6">
  <Sparkles className="w-6 h-6 text-terracotta" />
  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">About Me</h2>
</div>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl mb-4">
                    I work on end-to-end LLM post-training at{" "}
                    <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Amazon Rufus Team</a>,
                    focusing on scalable data synthesis and reinforcement learning.
                  </p>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl mb-4">
                    I obtained my Ph.D. in Machine Learning from Georgia Tech{" "}
                    <a href="http://ml.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">(ML@GT)</a>{" "}
                    in 2025, advised by{" "}
                    <a href="http://chaozhang.org/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Prof. Chao Zhang</a>.
                    My research centers on model efficiency and data efficiency for language models.
                    During my Ph.D., I interned at{" "}
                    <a href="https://research.google/" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Google Research</a>,{" "}
                    <a href="https://www.microsoft.com/en-us/research/" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Microsoft Azure AI</a>, and{" "}
                    <a href="https://www.aboutamazon.com/news/retail/amazon-rufus" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Amazon Stores Foundational AI</a>.
                  </p>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl">
                    I received my B.E. from{" "}
                    <a href="http://www.zju.edu.cn/english/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Zhejiang University</a>,
                    and I spent my senior year as a visiting researcher at{" "}
                    <a href="https://hms.harvard.edu/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Harvard Medical School</a>.
                  </p>
                </FadeIn>
              </AnimatedSection>
            </div>
          </section>

          {/* Research Section */}
          {/* <section
            id="research"
            className="relative overflow-hidden"
            style={{ scrollMarginTop: "80px" }}
          >
            <div className="absolute inset-0 z-0">
              <img src={RESEARCH_BG} alt="" className="w-full h-full object-cover opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
            </div>
            <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
              <AnimatedSection>
                <FadeIn>
                  <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="w-6 h-6 text-terracotta" />
                    <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Research</h2>
                  </div>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl mb-8">
                    My research focuses on advancing language models in three key aspects:
                  </p>
                </FadeIn>
                <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
                  <FadeIn>
                    <ResearchCard
                      title="Model Efficiency"
                      description="Progressive KV cache compression; Knowledge distillation"
                      venues={["NeurIPS'24 Workshop", "KDD'24", "ACL'24", "COLM'24"]}
                    />
                  </FadeIn>
                  <FadeIn>
                    <ResearchCard
                      title="Model Alignment"
                      description="Robust reward modeling; Test-time alignment"
                      venues={["EMNLP'25", "NeurIPS'24"]}
                    />
                  </FadeIn>
                  <FadeIn>
                    <ResearchCard
                      title="Data-centric Approach"
                      description="Data selection and weak supervision"
                      venues={["ACL'22", "ACL'23", "KDD'23"]}
                    />
                  </FadeIn>
                </div>
              </AnimatedSection>
            </div>
          </section> */}

          {/* Publications Section */}
          <section
            id="publications"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-10">
  <BookOpen className="w-6 h-6 text-terracotta" />
  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Publications</h2>
</div>
              </FadeIn>

              {/* Preprints */}
              <FadeIn>
                <h3 className="text-lg font-sans font-semibold text-terracotta mb-5 tracking-wide uppercase">Preprints</h3>
              </FadeIn>
              <div className="space-y-4 mb-12 max-w-4xl">
                {PREPRINTS.map((paper, i) => (
                  <FadeIn key={i}>
                    <PaperCard paper={{ ...paper, first: true }} />
                  </FadeIn>
                ))}
              </div>

              {/* Published Papers */}
              <FadeIn>
                <h3 className="text-lg font-sans font-semibold text-terracotta mb-5 tracking-wide uppercase">Published Papers</h3>
              </FadeIn>
              <div className="space-y-4 max-w-4xl">
                {PUBLICATIONS.map((paper, i) => (
                  <FadeIn key={i}>
                    <PaperCard paper={paper} />
                  </FadeIn>
                ))}
              </div>
            </AnimatedSection>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-10">
                  <Briefcase className="w-6 h-6 text-terracotta" />
                  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Experience</h2>
                </div>
              </FadeIn>
              <div className="space-y-6 max-w-3xl">
                {EXPERIENCES.map((exp, i) => (
                  <FadeIn key={i}>
                    <ExperienceCard exp={exp} />
                  </FadeIn>
                ))}
              </div>
            </AnimatedSection>
          </section>

          {/* Education Section */}
          <section
            id="education"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="w-6 h-6 text-terracotta" />
                  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Education</h2>
                </div>
              </FadeIn>
              <div className="space-y-6 max-w-3xl">
                <FadeIn>
                  <EducationCard
                    school="Georgia Institute of Technology"
                    schoolUrl="https://www.gatech.edu"
                    location="Atlanta"
                    period="Aug. 2019 – May 2025"
                    degrees={[
                      "Ph.D. in Machine Learning",
                      "M.S. in Electrical and Computer Engineering (May 2021)",
                    ]}
                  />
                </FadeIn>
                <FadeIn>
                  <EducationCard
                    school="Zhejiang University"
                    schoolUrl="http://www.zju.edu.cn/english/"
                    location="Hangzhou"
                    period="Aug. 2015 – June 2019"
                    degrees={["B.Eng. in Measurement Control Technology and Instruments"]}
                  />
                </FadeIn>
                <FadeIn>
                  <EducationCard
                    school="Harvard Medical School"
                    schoolUrl="https://hms.harvard.edu/"
                    location="Boston"
                    period="Sep. 2018 – May 2019"
                    degrees={["Visiting Student Researcher in Neural System Group"]}
                  />
                </FadeIn>
              </div>
            </AnimatedSection>
          </section>

          {/* Teaching Section */}
          <section
            id="teaching"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20 bg-warm-card/50"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-10">
  <PenLine className="w-6 h-6 text-terracotta" />
  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Teaching</h2>
</div>
              </FadeIn>
              <div className="space-y-4 max-w-3xl">
                {TEACHING.map((t, i) => (
                  <FadeIn key={i}>
                    <div className="flex items-start justify-between gap-4 py-3 border-b border-warm-border">
                      <div>
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-terracotta transition-colors">{t.course}</a>
                        <p className="text-sm text-muted-foreground mt-0.5">Graduate Teaching Assistant, {t.school}</p>
                      </div>
                      <span className="text-sm text-terracotta font-medium whitespace-nowrap">{t.semester}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </AnimatedSection>
          </section>

          {/* Academic Service Section */}
          <section
            id="service"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-terracotta" />
                  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Academic Service</h2>
                </div>
              </FadeIn>

              <div className="max-w-3xl">
                <FadeIn>
                  <div className="mb-5">
                    <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">Area Chair</span>
                    <span className="text-foreground/40 mx-2">&mdash;</span>
                    <span className="text-sm text-foreground/85">{SERVICE_AC.map(s => `${s.venue} ${s.year}`).join(", ")}</span>
                  </div>
                </FadeIn>
                <FadeIn>
                  <div>
                    <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">Reviewer</span>
                    <span className="text-foreground/40 mx-2">&mdash;</span>
                    <span className="text-sm text-foreground/85 leading-relaxed">
                      {SERVICE_REVIEWER.map((s, i) => (
                        <span key={i}>
                          {s.venue}{" "}
                          <span className="text-muted-foreground text-xs">({s.year})</span>
                          {i < SERVICE_REVIEWER.length - 1 && <span className="text-foreground/25 mx-1.5">&middot;</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                </FadeIn>
              </div>
            </AnimatedSection>
          </section>

          {/* Misc Section */}
          <section className="px-6 sm:px-10 lg:px-16 py-14 lg:py-16 bg-warm-card/50">
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
  <Trophy className="w-6 h-6 text-terracotta" />
  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Misc</h2>
</div>
              </FadeIn>
              <div className="space-y-3 max-w-3xl">
                <FadeIn>
                  <p className="text-foreground/80 leading-relaxed">
                    I was a player of Zhejiang University Varsity Men's basketball team, competing in CUBA Division II.
                  </p>
                </FadeIn>
                <FadeIn>
                  <p className="text-foreground/80 leading-relaxed">
                    I enjoy watching FC Barcelona matches and cheering for <span className="line-through text-foreground/40">R. Nadal</span> C. Alcaraz on the tennis court.
                  </p>
                </FadeIn>
              </div>
            </AnimatedSection>
          </section>

          {/* Footer */}
          <footer className="bg-foreground text-background/70 px-6 sm:px-10 lg:px-16 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm">&copy; {new Date().getFullYear()} Rongzhi Zhang. All rights reserved.</p>
              <div className="flex items-center gap-4 text-sm">
                <a href="mailto:rongzhi.zhang@gatech.edu" className="hover:text-background transition-colors">Email</a>
                <span className="text-background/30">|</span>
                <a href="https://scholar.google.com/citations?hl=en&user=jHgmQEIAAAAJ" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">Google Scholar</a>
                <span className="text-background/30">|</span>
                <a href="https://github.com/rz-zhang" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.8 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-terracotta text-white shadow-lg flex items-center justify-center hover:bg-terracotta-light transition-colors"
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

/* ─── Sub-components ─── */

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-warm-border">
      <div className="flex items-center justify-between px-4 py-3">
        <a href="#about" className="font-serif text-lg text-foreground">Rongzhi Zhang</a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="px-4 pb-4 space-y-1 border-t border-warm-border/50">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-warm-card rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function EducationCard({ school, schoolUrl, location, period, degrees }: { school: string; schoolUrl: string; location: string; period: string; degrees: string[] }) {
  return (
    <div className="bg-background/80 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-2">
        <a href={schoolUrl} target="_blank" rel="noopener noreferrer" className="font-serif text-lg text-foreground hover:text-terracotta transition-colors">{school}</a>
        <span className="text-sm text-terracotta font-medium whitespace-nowrap">{period}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{location}</p>
      {degrees.map((d, i) => (
        <p key={i} className="text-sm text-foreground/80 leading-relaxed">{d}</p>
      ))}
    </div>
  );
}

function ResearchCard({ title, description, venues }: { title: string; description: string; venues: string[] }) {
  return (
    <div className="bg-background/90 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 hover:shadow-md transition-all duration-200">
      <h3 className="font-serif text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground/75 mb-3 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {venues.map((v, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-medium">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function PaperCard({ paper }: { paper: { title: string; authors: string; venue: string; year: string; first?: boolean; url?: string } }) {
  const highlightAuthor = (authors: string) => {
    const parts = authors.split(/(Rongzhi Zhang\*?)/g);
    return parts.map((part, i) =>
      part.match(/Rongzhi Zhang/) ? (
        <span key={i} className="font-semibold text-foreground">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const titleContent = paper.url ? (
    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground leading-snug mb-2 group-hover:text-terracotta transition-colors inline-flex items-start gap-1.5">
      {paper.title}
      <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-0 group-hover:opacity-60 transition-opacity" />
    </a>
  ) : (
    <span className="font-medium text-foreground leading-snug mb-2">{paper.title}</span>
  );

  return (
    <div className="group relative bg-background/80 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 hover:shadow-sm transition-all duration-200">
      <div className="flex-1">
        <h4 className="mb-2">{titleContent}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          {highlightAuthor(paper.authors)}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta font-semibold">
            {paper.venue}
          </span>
          <span className="text-xs text-muted-foreground">{paper.year}</span>
        </div>
      </div>
    </div>
  );
}

type ExperienceData = {
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  hosts: { name: string; url: string }[];
  LogoComponent: React.FC<{ className?: string }>;
};

function ExperienceCard({ exp }: { exp: ExperienceData }) {
  return (
    <div className="bg-background/80 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 transition-colors group">
      <div className="flex items-start gap-5">
        {/* Company Logo — inline SVG, no background box */}
        <div className="shrink-0 mt-0.5 w-12 h-12 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
          <exp.LogoComponent className="w-full h-full" />
        </div>
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h3 className="font-medium text-foreground">{exp.role}</h3>
            <span className="text-sm text-terracotta font-medium whitespace-nowrap">{exp.period}</span>
          </div>
          <p className="text-sm mb-1">
            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground/80 hover:text-terracotta transition-colors">
              {exp.company}
            </a>
          </p>
          <p className="text-sm text-muted-foreground">{exp.location}</p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-foreground/50">Host: </span>
            {exp.hosts.map((h, i) => (
              <span key={i}>
                <a href={h.url} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">{h.name}</a>
                {i < exp.hosts.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
