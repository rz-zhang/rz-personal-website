/*
 * Design: Warm Modernism — Anthropic + Thinking Machines Lab inspired
 * Color: Warm cream bg (#F5F0E8), terracotta accent (#C4704B), dark brown text
 * Typography: DM Serif Display headings + DM Sans body
 * Layout: Sidebar (fixed on desktop) + scrollable content
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Building2, ExternalLink, GraduationCap, Briefcase, BookOpen, Users, ChevronUp, Github, Linkedin } from "lucide-react";

const PROFILE_PHOTO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663335159845/egmpAxZhLCUfANhF.jpeg";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/Pca2oVq2I5DVn7TH8OBGNR/sandbox/zUI5V4hl2GLhf7wscDA6FE-img-1_1770678931000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUGNhMm9WcTJJNURWbjdUSDhPQkdOUi9zYW5kYm94L3pVSTVWNGhsMkdMaGY3d3NjREE2RkUtaW1nLTFfMTc3MDY3ODkzMTAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QuxuiOk2mhNRIOgYBUkkM-rYlIN~9m9EsMsL8~X2dz7rUAbNlyIfIoDH3LiyX2bUjvMgc8dKfJiKrDade5ZukTOyl6RgeHpO4UvaT35RsfW3tisVzdrZm3olquIrERIt-pVR2LLBCNZA-UXKtUiPqizqLJIuss0NRTCwJyBNueCQ0ne5ol57zc9URp47LBJV0izlNHrwEDys2AzERJvgf-oGltQidxmHIJgR0O0oXixmGi7R8E217E4DZIiFDy29VqnVxT~tWE90EEL53QH2yllJQssCUOwrLzEaIyV30Rymozc0tehnVx3HqNBdFlyYzGcPXHgXeJv2HXxIAot22A__";

const RESEARCH_BG = "https://private-us-east-1.manuscdn.com/sessionFile/Pca2oVq2I5DVn7TH8OBGNR/sandbox/zUI5V4hl2GLhf7wscDA6FE-img-2_1770678927000_na1fn_cmVzZWFyY2gtcGF0dGVybg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUGNhMm9WcTJJNURWbjdUSDhPQkdOUi9zYW5kYm94L3pVSTVWNGhsMkdMaGY3d3NjREE2RkUtaW1nLTJfMTc3MDY3ODkyNzAwMF9uYTFmbl9jbVZ6WldGeVkyZ3RjR0YwZEdWeWJnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CTIP7sMRWBrxsq8~p4yoGdMcG421GmPt7TOoG4Igcl1Pzsw6COLUBYdcMvuG2N37SLPQ0s7rRPcgWq9NMq7~uP-Q8U3QnfxAuaX5Y4R4PYLnc87ErdBawq7sYWEAqCD-r4nixra8e7uIXOQ5vEcgEakpzCNpLSWjy2FFRgWsRvJ6~OG4MhKByuYnFztZIReuV9pKsHoazftPgOYTE5VWdHRNCy5xWBPMm7oV83YN8DO8yRwl95NFMPEWdhKjC9O0JqwqinWomhCKwoE2MY5ucy59rjpj9mzkq39ffBvSZ5PgTLrEABbfk8cGio8UTF7F7D0qdEIucg-lDtUzZ0pIKg__";

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
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
  { id: "teaching", label: "Teaching" },
  { id: "service", label: "Service" },
];

// Publications data
const PREPRINTS = [
  {
    title: "Precise Attribute Intensity Control in Large Language Models via Targeted Representation Editing",
    authors: "Rongzhi Zhang*, Liqin Ye*, Yuzhao Heng, Xiang Chen, Tong Yu, Lingkai Kong, Sudheer Chava and Chao Zhang.",
    venue: "An arXiv version will be available soon.",
    year: "2025",
  },
  {
    title: "MLE-Dojo: Interactive Environments for Empowering LLM Agents in Machine Learning Engineering",
    authors: "Rushi Qiang, Yuchen Zhuang, Yinghao Li, Rongzhi Zhang, Changhao Li, Ian Shu-Hei Wong, Sherry Yang, Percy Liang, Chao Zhang and Bo Dai.",
    venue: "Preprint on ArXiv, 2025.",
    year: "2025",
  },
];

const PUBLICATIONS = [
  {
    title: "DORM: Preference Data Weights Optimization for Reward Modeling in LLM Alignment",
    authors: "Rongzhi Zhang, Chenwei Zhang, Xinyang Zhang, Liang Qiu, Haoming Jiang, Yuchen Zhuang, Qingru Zhang, Hyokun Yun, Xian Li, Bing Yin, Tuo Zhao, Chao Zhang.",
    venue: "EMNLP",
    year: "2025",
    first: true,
  },
  {
    title: "Self-Rewarding PPO: Aligning Large Language Models with Demonstrations Only",
    authors: "Qingru Zhang, Liang Qiu, Ilgee Hong, Zhenghao Xu, Tianyi Liu, Shiyang Li, Rongzhi Zhang, Zheng Li, Lihong Li, Bing Yin, Chao Zhang, Jianshu Chen, Haoming Jiang and Tuo Zhao.",
    venue: "COLM",
    year: "2025",
    first: false,
  },
  {
    title: "Hephaestus: Improving Fundamental Agent Capabilities of Large Language Models through Continual Pre-Training",
    authors: "Yuchen Zhuang, Jingfeng Yang, Haoming Jiang, Xin Liu, Kewei Cheng, Sanket Lokegaonkar, Yifan Gao, Qing Ping, Tianyi Liu, Binxuan Huang, Zheng Li, Zhengyang Wang, Pei Chen, Ruijie Wang, Rongzhi Zhang, Nasser Zalmout, Priyanka Nigam, Bing Yin and Chao Zhang.",
    venue: "NAACL",
    year: "2025",
    first: false,
  },
  {
    title: "LoRC: Low-Rank Compression for LLMs KV Cache with a Progressive Compression Strategy",
    authors: "Rongzhi Zhang, Kuan Wang, Liyuan Liu, Shuohang Wang, Hao Cheng, Chao Zhang and Yelong Shen.",
    venue: "NeurIPS Workshop",
    year: "2024",
    first: true,
  },
  {
    title: "Aligning Large Language Models with Representation Editing: A Control Perspective",
    authors: "Lingkai Kong, Haorui Wang, Wenhao Mu, Yuanqi Du, Yuchen Zhuang, Yifei Zhou, Yue Song, Rongzhi Zhang, Kai Wang and Chao Zhang.",
    venue: "NeurIPS",
    year: "2024",
    first: false,
  },
  {
    title: "TPD: Enhancing Student Language Model Reasoning via Principle Discovery and Guidance",
    authors: "Haorui Wang, Rongzhi Zhang, Yinghao Li, Lingkai Kong, Yuchen Zhuang, Xiusi Chen and Chao Zhang.",
    venue: "COLM",
    year: "2024",
    first: false,
  },
  {
    title: "Knowledge Distillation with Perturbed Loss: From a Vanilla Teacher to a Proxy Teacher",
    authors: "Rongzhi Zhang, Jiaming Shen, Tianqi Liu, Jialu Liu, Michael Bendersky, Marc Najork and Chao Zhang.",
    venue: "KDD",
    year: "2024",
    first: true,
  },
  {
    title: "PLaD: Preference-based Large Language Model Distillation with Pseudo-Preference Pairs",
    authors: "Rongzhi Zhang, Jiaming Shen, Tianqi Liu, Haorui Wang, Zhen Qin, Feng Han, Jialu Liu, Simon Baumgartner, Michael Bendersky and Chao Zhang.",
    venue: "ACL Findings",
    year: "2024",
    first: true,
  },
  {
    title: "ProgGen: Generating Named Entity Recognition Datasets Step-by-step with Self-Reflexive Large Language Models",
    authors: "Yuzhao Heng, Chunyuan Deng, Yitong Li, Yue Yu, Yinghao Li, Rongzhi Zhang, Chao Zhang.",
    venue: "ACL Findings",
    year: "2024",
    first: false,
  },
  {
    title: "Local Boosting for Weakly-Supervised Learning",
    authors: "Rongzhi Zhang, Yue Yu, Jiaming Shen, Xiquan Cui and Chao Zhang.",
    venue: "KDD",
    year: "2023",
    first: true,
  },
  {
    title: "Cold-Start Data Selection for Few-shot Language Model Fine-tuning: A Prompt-Based Uncertainty Propagation Approach",
    authors: "Yue Yu, Rongzhi Zhang, Ran Xu, Jieyu Zhang, Jiaming Shen and Chao Zhang.",
    venue: "ACL",
    year: "2023",
    first: false,
  },
  {
    title: "Zero-Shot Text Classification by Training Data Creation with Progressive Dense Retrieval",
    authors: "Yue Yu, Yuchen Zhuang, Rongzhi Zhang, Yu Meng, Jiaming Shen and Chao Zhang.",
    venue: "ACL Findings",
    year: "2023",
    first: false,
  },
  {
    title: "PRBoost: Prompt-Based Rule Discovery and Boosting for Interactive Weakly-Supervised Learning",
    authors: "Rongzhi Zhang, Yue Yu, Shetty Pranav, Le Song and Chao Zhang.",
    venue: "ACL",
    year: "2022",
    first: true,
  },
  {
    title: "Adaptive Multi-view Rule Discovery for Weakly-Supervised Compatible Products Prediction",
    authors: "Rongzhi Zhang, Rebecca West, Xiquan Cui and Chao Zhang.",
    venue: "KDD",
    year: "2022",
    first: true,
  },
  {
    title: "AcTune: Uncertainty-Aware Active Self-Training for Active Fine-Tuning of Pretrained Language Models",
    authors: "Yue Yu, Lingkai Kong, Jieyu Zhang, Rongzhi Zhang and Chao Zhang.",
    venue: "NAACL",
    year: "2022",
    first: false,
  },
  {
    title: "SeqMix: Augmenting Active Sequence Labeling via Sequence Mixup",
    authors: "Rongzhi Zhang, Yue Yu and Chao Zhang.",
    venue: "EMNLP",
    year: "2020",
    first: true,
  },
];

const COMPANY_LOGOS: Record<string, string> = {
  amazon: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663335159845/hJjPihvkpWeIPvXW.png",
  microsoft: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663335159845/lyevUgNaQenBAzbA.png",
  google: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663335159845/EndnZaGZWPZrKQGI.png",
};

const EXPERIENCES = [
  {
    role: "Applied Scientist Intern",
    company: "Amazon Stores Foundational AI",
    location: "Palo Alto, CA",
    period: "May 2024 – Nov. 2024",
    hosts: "Chenwei Zhang, Xinyang Zhang",
    logo: COMPANY_LOGOS.amazon,
  },
  {
    role: "Research Intern",
    company: "Microsoft Azure AI",
    location: "Redmond, WA",
    period: "Jan. 2024 – May 2024",
    hosts: "Shuohang Wang, Lucas Liu, Yelong Shen",
    logo: COMPANY_LOGOS.microsoft,
  },
  {
    role: "Student Researcher",
    company: "Google Research",
    location: "New York City, NY",
    period: "May 2023 – Dec. 2023",
    hosts: "Jiaming Shen, Tianqi Liu, Jialu Liu",
    logo: COMPANY_LOGOS.google,
  },
  {
    role: "Student Researcher",
    company: "Google Research",
    location: "New York City, NY",
    period: "May 2022 – Dec. 2022",
    hosts: "Jiaming Shen, Tianqi Liu, Michael Bendersky",
    logo: COMPANY_LOGOS.google,
  },
];

const TEACHING = [
  { course: "CSE 8803 - Deep Learning for Text Data", semester: "Fall 2023", school: "Georgia Tech" },
  { course: "CSE 8803 - Deep Learning for Text Data", semester: "Fall 2021", school: "Georgia Tech" },
  { course: "CS 4641/7641 - Machine Learning", semester: "Fall 2020", school: "Georgia Tech" },
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
              <p className="text-base text-terracotta font-medium mb-1">Ph.D. Candidate</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Machine Learning Center<br />
                School of Computational Science and Engineering<br />
                Georgia Institute of Technology
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-8 text-sm text-muted-foreground">
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
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-8">
              <a href="https://scholar.google.com/citations?user=PLACEHOLDER" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="Google Scholar">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-warm-card flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200 text-muted-foreground" title="LinkedIn">
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

            <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-12 pb-16 lg:pt-20 lg:pb-24">
              {/* Mobile Profile */}
              <div className="lg:hidden mb-8">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-warm-border shadow-lg">
                  <img src={PROFILE_PHOTO} alt="Rongzhi Zhang" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-3xl font-serif text-foreground mb-1">Rongzhi Zhang</h1>
                <p className="text-base text-terracotta font-medium mb-1">Ph.D. Candidate</p>
                <p className="text-sm text-muted-foreground">
                  Machine Learning Center, Georgia Institute of Technology
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
                  <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-6">Biography</h2>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl mb-4">
                    I am a Machine Learning Ph.D. candidate at Georgia Tech{" "}
                    <a href="https://ml.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">(ML@GT)</a>, advised by{" "}
                    <a href="https://chaozhang.org/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Prof. Chao Zhang</a>.
                    My research interest primarily lies in model efficiency and data efficiency of language models.
                    Beyond academia, I've spent several fantastic research internships at{" "}
                    <span className="font-medium">Google Research</span>,{" "}
                    <span className="font-medium">Microsoft Azure AI</span>, and{" "}
                    <span className="font-medium">Amazon Stores Foundational AI</span>.
                  </p>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl">
                    Before that, I obtained my bachelor's degree from{" "}
                    <a href="https://www.zju.edu.cn/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Zhejiang University</a>,
                    and I spent my senior year as a visiting student researcher at{" "}
                    <a href="https://hms.harvard.edu/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Harvard Medical School</a>.
                  </p>
                </FadeIn>
              </AnimatedSection>
            </div>
          </section>

          {/* Education Section */}
          <section className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
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
                    location="Atlanta"
                    period="Aug. 2019 – Present"
                    degrees={[
                      "Ph.D. in Machine Learning",
                      "M.S. in Electrical and Computer Engineering (May 2021)",
                    ]}
                  />
                </FadeIn>
                <FadeIn>
                  <EducationCard
                    school="Zhejiang University"
                    location="Hangzhou"
                    period="Aug. 2015 – June 2019"
                    degrees={["B.Eng. in Measurement Control Technology and Instruments"]}
                  />
                </FadeIn>
                <FadeIn>
                  <EducationCard
                    school="Harvard Medical School"
                    location="Boston"
                    period="Sep. 2018 – May 2019"
                    degrees={["Visiting Student Researcher in Neural System Group"]}
                  />
                </FadeIn>
              </div>
            </AnimatedSection>
          </section>

          {/* Research Section */}
          <section
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
          </section>

          {/* Publications Section */}
          <section
            id="publications"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-10">Publications</h2>
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
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20 bg-warm-card/50"
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

          {/* Teaching Section */}
          <section
            id="teaching"
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-10">Teaching</h2>
              </FadeIn>
              <div className="space-y-4 max-w-3xl">
                {TEACHING.map((t, i) => (
                  <FadeIn key={i}>
                    <div className="flex items-start justify-between gap-4 py-3 border-b border-warm-border">
                      <div>
                        <p className="font-medium text-foreground">{t.course}</p>
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
            className="px-6 sm:px-10 lg:px-16 py-14 lg:py-20 bg-warm-card/50"
            style={{ scrollMarginTop: "80px" }}
          >
            <AnimatedSection>
              <FadeIn>
                <div className="flex items-center gap-3 mb-10">
                  <Users className="w-6 h-6 text-terracotta" />
                  <h2 className="text-2xl lg:text-3xl font-serif text-foreground">Academic Service</h2>
                </div>
              </FadeIn>

              <div className="max-w-3xl">
                <FadeIn>
                  <h3 className="text-base font-semibold text-foreground mb-4">Area Chair</h3>
                </FadeIn>
                <div className="space-y-2 mb-8">
                  {SERVICE_AC.map((s, i) => (
                    <FadeIn key={i}>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-foreground/85">{s.venue}</span>
                        <span className="text-sm text-muted-foreground">{s.year}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <FadeIn>
                  <h3 className="text-base font-semibold text-foreground mb-4">Reviewer</h3>
                </FadeIn>
                <div className="space-y-2">
                  {SERVICE_REVIEWER.map((s, i) => (
                    <FadeIn key={i}>
                      <div className="flex items-center justify-between py-2 border-b border-warm-border/50">
                        <span className="text-foreground/85">{s.venue}</span>
                        <span className="text-sm text-muted-foreground">{s.year}</span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Misc Section */}
          <section className="px-6 sm:px-10 lg:px-16 py-14 lg:py-16">
            <AnimatedSection>
              <FadeIn>
                <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-6">Misc</h2>
              </FadeIn>
              <FadeIn>
                <p className="text-foreground/80 max-w-3xl leading-relaxed">
                  I was a player of Zhejiang University Varsity Men's basketball team, competing in CUBA Division II.
                </p>
              </FadeIn>
            </AnimatedSection>
          </section>

          {/* Footer */}
          <footer className="bg-foreground text-background/70 px-6 sm:px-10 lg:px-16 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm">&copy; {new Date().getFullYear()} Rongzhi Zhang. All rights reserved.</p>
              <div className="flex items-center gap-4 text-sm">
                <a href="mailto:rongzhi.zhang@gatech.edu" className="hover:text-background transition-colors">Email</a>
                <span className="text-background/30">|</span>
                <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">Google Scholar</a>
                <span className="text-background/30">|</span>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">GitHub</a>
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

function EducationCard({ school, location, period, degrees }: { school: string; location: string; period: string; degrees: string[] }) {
  return (
    <div className="bg-background/80 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-serif text-lg text-foreground">{school}</h3>
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

function PaperCard({ paper }: { paper: { title: string; authors: string; venue: string; year: string; first?: boolean } }) {
  // Highlight "Rongzhi Zhang" in authors
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

  return (
    <div className="group relative bg-background/80 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h4 className="font-medium text-foreground leading-snug mb-2 group-hover:text-terracotta transition-colors">
            {paper.title}
          </h4>
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
    </div>
  );
}

function ExperienceCard({ exp }: { exp: { role: string; company: string; location: string; period: string; hosts: string; logo: string } }) {
  return (
    <div className="bg-background/80 rounded-lg p-5 border border-warm-border/60 hover:border-terracotta/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-12 h-12 rounded-lg bg-white border border-warm-border/40 flex items-center justify-center shrink-0 p-1.5 shadow-sm">
          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
        </div>
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h3 className="font-medium text-foreground">{exp.role}</h3>
            <span className="text-sm text-terracotta font-medium whitespace-nowrap">{exp.period}</span>
          </div>
          <p className="text-sm font-medium text-foreground/80 mb-1">{exp.company}</p>
          <p className="text-sm text-muted-foreground">{exp.location}</p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-foreground/60">Host:</span> {exp.hosts}
          </p>
        </div>
      </div>
    </div>
  );
}
