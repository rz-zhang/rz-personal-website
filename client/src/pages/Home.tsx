/*
 * Design: Warm Modernism — Anthropic + Thinking Machines Lab inspired
 * Color: Warm cream bg (#F5F0E8), terracotta accent (#C4704B), dark brown text
 * Typography: DM Serif Display headings + DM Sans body
 * Layout: Sidebar (fixed on desktop) + scrollable content
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Building2, ExternalLink, GraduationCap, Briefcase, BookOpen, Users, ChevronUp, Github, Linkedin, Twitter } from "lucide-react";

const PROFILE_PHOTO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663335159845/egmpAxZhLCUfANhF.jpeg";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/Pca2oVq2I5DVn7TH8OBGNR/sandbox/zUI5V4hl2GLhf7wscDA6FE-img-1_1770678931000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUGNhMm9WcTJJNURWbjdUSDhPQkdOUi9zYW5kYm94L3pVSTVWNGhsMkdMaGY3d3NjREE2RkUtaW1nLTFfMTc3MDY3ODkzMTAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QuxuiOk2mhNRIOgYBUkkM-rYlIN~9m9EsMsL8~X2dz7rUAbNlyIfIoDH3LiyX2bUjvMgc8dKfJiKrDade5ZukTOyl6RgeHpO4UvaT35RsfW3tisVzdrZm3olquIrERIt-pVR2LLBCNZA-UXKtUiPqizqLJIuss0NRTCwJyBNueCQ0ne5ol57zc9URp47LBJV0izlNHrwEDys2AzERJvgf-oGltQidxmHIJgR0O0oXixmGi7R8E217E4DZIiFDy29VqnVxT~tWE90EEL53QH2yllJQssCUOwrLzEaIyV30Rymozc0tehnVx3HqNBdFlyYzGcPXHgXeJv2HXxIAot22A__";

const RESEARCH_BG = "https://private-us-east-1.manuscdn.com/sessionFile/Pca2oVq2I5DVn7TH8OBGNR/sandbox/zUI5V4hl2GLhf7wscDA6FE-img-2_1770678927000_na1fn_cmVzZWFyY2gtcGF0dGVybg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUGNhMm9WcTJJNURWbjdUSDhPQkdOUi9zYW5kYm94L3pVSTVWNGhsMkdMaGY3d3NjREE2RkUtaW1nLTJfMTc3MDY3ODkyNzAwMF9uYTFmbl9jbVZ6WldGeVkyZ3RjR0YwZEdWeWJnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CTIP7sMRWBrxsq8~p4yoGdMcG421GmPt7TOoG4Igcl1Pzsw6COLUBYdcMvuG2N37SLPQ0s7rRPcgWq9NMq7~uP-Q8U3QnfxAuaX5Y4R4PYLnc87ErdBawq7sYWEAqCD-r4nixra8e7uIXOQ5vEcgEakpzCNpLSWjy2FFRgWsRvJ6~OG4MhKByuYnFztZIReuV9pKsHoazftPgOYTE5VWdHRNCy5xWBPMm7oV83YN8DO8yRwl95NFMPEWdhKjC9O0JqwqinWomhCKwoE2MY5ucy59rjpj9mzkq39ffBvSZ5PgTLrEABbfk8cGio8UTF7F7D0qdEIucg-lDtUzZ0pIKg__";

// ─── Inline SVG Company Logos ───
function AmazonLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 603 182" fill="#232F3E" xmlns="http://www.w3.org/2000/svg">
      <path d="M374.00 109.24C338.82 135.21 287.55 149.00 243.60 149.00C182.33 149.00 127.24 127.06 85.38 90.72C82.16 87.83 85.02 83.87 88.88 86.19C134.06 112.41 189.91 128.20 247.75 128.20C286.71 128.20 329.42 120.36 368.74 104.17C374.59 101.72 379.49 107.99 374.00 109.24Z"/>
      <path d="M388.13 93.07C383.82 87.59 359.31 90.50 348.25 91.82C344.93 92.21 344.43 89.30 347.42 87.21C367.05 73.44 399.82 77.47 403.52 82.02C407.23 86.60 402.49 119.45 384.16 134.82C381.37 137.19 378.72 135.93 379.97 132.84C384.16 122.36 392.47 98.58 388.13 93.07Z"/>
      <path d="M349.00 15.00V4.68C349.00 3.02 350.27 1.89 351.77 1.89H413.22C414.79 1.89 416.06 3.05 416.06 4.68V13.64C416.03 15.23 414.69 17.31 412.36 20.53L380.26 66.08C391.73 65.80 403.83 67.55 414.22 73.40C416.52 74.69 417.16 76.58 417.33 78.17V89.14C417.33 90.76 415.53 92.65 413.66 91.69C393.77 81.28 367.41 80.17 345.39 91.82C343.66 92.72 341.83 90.86 341.83 89.24V78.78C341.83 76.95 341.86 73.73 343.69 70.95L380.90 18.68H351.80C350.24 18.68 348.97 17.55 348.97 15.93L349.00 15.00Z"/>
      <path d="M124.56 93.96H105.59C104.19 93.86 103.09 92.80 102.99 91.47V4.81C102.99 3.32 104.26 2.12 105.82 2.12H123.52C124.96 2.19 126.09 3.29 126.19 4.65V14.44H126.46C130.63 3.82 136.95 0.00 145.46 0.00C154.10 0.00 159.82 3.82 164.72 14.44C168.86 3.82 176.47 0.00 184.58 0.00C190.30 0.00 196.62 2.52 200.49 7.87C204.86 13.88 203.96 22.44 203.96 29.88L203.93 91.23C203.93 92.72 202.66 93.96 201.10 93.96H182.16C180.69 93.86 179.52 92.66 179.52 91.23V39.14C179.52 36.26 179.79 29.18 179.22 26.43C178.32 21.82 175.55 20.52 172.08 20.52C169.08 20.52 165.95 22.51 164.55 25.73C163.15 28.95 163.28 34.26 163.28 39.14V91.23C163.28 92.72 162.01 93.96 160.45 93.96H141.51C140.01 93.86 138.87 92.66 138.87 91.23L138.84 39.14C138.84 30.58 140.34 20.35 129.73 20.35C119.02 20.35 119.39 30.28 119.39 39.14V91.23C119.39 92.72 118.12 93.96 116.56 93.96H124.56Z" transform="translate(-16.56, 0)"/>
      <path d="M448.00 0.00C470.62 0.00 483.00 20.35 483.00 46.28C483.00 71.41 469.42 91.23 448.00 91.23C425.68 91.23 413.43 70.88 413.43 45.58C413.43 20.15 425.78 0.00 448.00 0.00ZM448.10 16.52C437.16 16.52 436.56 31.28 436.56 40.54C436.56 49.83 436.43 74.58 448.00 74.58C459.44 74.58 460.00 58.72 460.00 49.00C460.00 42.62 459.74 35.01 457.84 28.95C456.21 23.67 453.21 16.52 448.10 16.52Z"/>
      <path d="M517.00 93.96H498.09C496.62 93.86 495.45 92.66 495.45 91.23L495.42 4.55C495.55 3.19 496.82 2.12 498.29 2.12H515.89C517.16 2.19 518.20 3.05 518.50 4.18V15.73H518.77C523.24 4.35 528.66 0.00 538.40 0.00C544.72 0.00 550.91 2.22 555.08 8.57C558.95 14.44 558.95 24.67 558.95 31.82V91.56C558.75 92.83 557.48 93.86 556.12 93.86H537.05C535.78 93.76 534.74 92.76 534.58 91.56V37.96C534.58 29.58 535.48 20.18 526.34 20.18C523.34 20.18 520.57 22.18 519.07 25.26C517.17 29.18 516.90 33.08 516.90 37.96V91.23C516.87 92.72 515.56 93.96 514.00 93.96H517.00Z" transform="translate(-3, 0)"/>
      <path d="M268.00 51.42C268.00 57.60 268.17 62.78 265.07 68.32C262.57 72.82 258.57 75.60 254.14 75.60C248.01 75.60 244.48 70.88 244.48 63.97C244.48 50.42 256.50 47.88 268.00 47.88V51.42ZM289.12 93.69C287.99 94.69 286.35 94.76 285.09 94.09C279.46 89.38 278.46 87.28 275.56 83.06C267.22 91.59 261.30 94.09 250.36 94.09C237.48 94.09 227.50 86.25 227.50 70.42C227.50 58.09 234.22 49.83 243.86 45.81C252.27 42.22 264.29 41.59 268.00 41.09V39.14C268.00 35.26 268.27 30.68 266.07 27.29C264.17 24.27 260.44 23.01 257.17 23.01C251.10 23.01 245.68 26.13 244.41 32.61C244.18 33.88 243.24 35.14 241.97 35.21L223.60 33.22C222.47 32.95 221.20 32.05 221.54 30.35C225.67 8.87 245.24 2.12 262.87 2.12C271.81 2.12 283.43 4.35 290.45 11.17C299.39 19.53 298.59 30.58 298.59 42.75V68.02C298.59 76.58 302.16 80.38 305.52 85.09C306.69 86.72 306.92 88.68 305.45 89.91C301.82 92.96 295.40 98.50 291.87 101.58L289.12 93.69Z" transform="translate(-2, -7)"/>
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
    <svg className={className} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
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
    url: "",
  },
  {
    title: "MLE-Dojo: Interactive Environments for Empowering LLM Agents in Machine Learning Engineering",
    authors: "Rushi Qiang, Yuchen Zhuang, Yinghao Li, Rongzhi Zhang, Changhao Li, Ian Shu-Hei Wong, Sherry Yang, Percy Liang, Chao Zhang and Bo Dai.",
    venue: "Preprint on ArXiv, 2025.",
    year: "2025",
    url: "https://arxiv.org/pdf/2505.07782",
  },
];

const PUBLICATIONS = [
  {
    title: "DORM: Preference Data Weights Optimization for Reward Modeling in LLM Alignment",
    authors: "Rongzhi Zhang, Chenwei Zhang, Xinyang Zhang, Liang Qiu, Haoming Jiang, Yuchen Zhuang, Qingru Zhang, Hyokun Yun, Xian Li, Bing Yin, Tuo Zhao, Chao Zhang.",
    venue: "EMNLP",
    year: "2025",
    first: true,
    url: "",
  },
  {
    title: "Self-Rewarding PPO: Aligning Large Language Models with Demonstrations Only",
    authors: "Qingru Zhang, Liang Qiu, Ilgee Hong, Zhenghao Xu, Tianyi Liu, Shiyang Li, Rongzhi Zhang, Zheng Li, Lihong Li, Bing Yin, Chao Zhang, Jianshu Chen, Haoming Jiang and Tuo Zhao.",
    venue: "COLM",
    year: "2025",
    first: false,
    url: "",
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
                    <a href="http://ml.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">(ML@GT)</a>, advised by{" "}
                    <a href="http://chaozhang.org/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Prof. Chao Zhang</a>.
                    My research interest primarily lies in model efficiency and data efficiency of language models.
                    Beyond academia, I've spent several fantastic research internships at{" "}
                    <a href="https://research.google/" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Google Research</a>,{" "}
                    <a href="https://www.microsoft.com/en-us/research/" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Microsoft Azure AI</a>, and{" "}
                    <a href="https://www.aboutamazon.com/news/retail/amazon-rufus" target="_blank" rel="noopener noreferrer" className="font-medium text-terracotta hover:underline">Amazon Stores Foundational AI</a>.
                  </p>
                </FadeIn>
                <FadeIn>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-3xl">
                    Before that, I obtained my bachelor's degree from{" "}
                    <a href="http://www.zju.edu.cn/english/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Zhejiang University</a>,
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
                    schoolUrl="https://www.gatech.edu"
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
