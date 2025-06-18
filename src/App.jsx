import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Zap, Code, Database, Cpu, Bot, Gamepad2, Globe, Sparkles, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import MNfineAvatar from './components/MNfineAvatar';
import TechnicalSkillBar from './components/TechnicalSkillBar';
import ProfessionalSkillCircle from './components/ProfessionalSkillCircle';
import { Menu, X } from "lucide-react";

// pageContent 
const pageContent = {
  en: {
    navbar: {
      home: "Home",
      projects: "Projects", 
      articles: "Articles",
      contact: "Contact",
      homeUrl: "#avatar",
      projectsUrl: "#projects", 
      articlesUrl: "#academic-articles",
      contactUrl: "#footer",
    },
    hero: {
      tagline1: "Information Technology Student at ",
      tagline2_school: "UIT - VNU-HCM",
      tagline3: "Building the future with AI and innovative software solutions",
    },
    about: {
      title: "About Me",
      intro: "As someone driven by a startup mindset, I believe in rapid prototyping, iteration, and delivering practical impact. I’m especially focused on applying AI — not just as a trend, but as a tool to unlock real-world value.",
      workIsAbout: "My work is about:",
      points: [
        "Turning concepts into MVPs and demos",
        "Using AI to automate, enhance, and simplify user experiences",
        "Creating tools that people _actually_ want to use — in education, legal tech, and beyond",
        "Building toward a future where AI-powered tools become affordable and meaningful for everyone"
      ],
      exploring: "Right now, I’m exploring:",
      exploringPoints: [
        "Legal AI in Vietnam using RAG (Redis + OpenAI)",
        "Lightweight systems development to understand how machines work"
      ]
    },
    skills: {
      title_my_expertise: {
        whitePart: "My",
        gradientPart: "Expertise"
      },
      title_technical: "Technical Skills",
      title_professional: "Professional Skills",
      technical: [
        { name: "HTML", icon: "html", level: 90 },
        { name: "CSS", icon: "css", level: 70 },
        { name: "JavaScript", icon: "javascript", level: 55 },
        { name: "Python", icon: "python", level: 75 },
        { name: "React", icon: "react", level: 45 },
      ],
      professional: [
        { name: "Creativity", level: 90 },
        { name: "Communication", level: 85 },
        { name: "Problem Solving", level: 75 },
        { name: "Teamwork", level: 85 },
      ]
    },
    projects: {
      viewOnGithub: "View on GitHub",
    },
    academicArticles: {
      title: "Academic Articles & Research (Coming soon)",
      description: "Here are some academic articles and research papers I have contributed to or authored.",
      articles: [
        {
          title: "The Impact of AI on Legal Document Analysis",
          link: "https://example.com/article1",
          date: "May 2024",
          authors: "MNfine"
        },
        {
          title: "RISC-V Architecture: A Performance Analysis",
          link: "https://example.com/article2",
          date: "March 2024",
          authors: "MNfine"
        },
        {
          title: "Enhancing User Experience with LLMs in Education",
          link: "https://example.com/article3",
          date: "Jan 2024",
          authors: "MNfine"
        }
      ],
    },
    funFacts: {
      title: "Fun Facts",
      items: [
        "A huge fan of **pixel art**, even though my drawing skills are, well, not so great.",
        "Love playing **football**, I'm even a member of a football club, and I also compete in track and field!",
        "Once pulled an all-nighter to finish my first AI project because I was just too excited about it.",
        "Always eager to explore new technologies and share what I learn with friends.",
        "“Code then sleep” – MNfine's familiar philosophy during every deadline season!",
        "Don't drink coffee, I just “run on energy drinks” and a passion for learning."
      ]
    },
    footer: {
      tagline: "Let's build something amazing together 🚀",
    }
  },
  vi: {
    navbar: {
      home: "Trang chủ",
      projects: "Dự án", 
      articles: "Bài viết",
      contact: "Liên hệ",
      homeUrl: "#avatar",
      projectsUrl: "#projects", 
      articlesUrl: "#academic-articles",
      contactUrl: "#footer",
    },
    hero: {
      tagline1: "Sinh viên ngành Công Nghệ Thông Tin tại ",
      tagline2_school: "UIT - VNU-HCM",
      tagline3: "Xây dựng tương lai với AI và các giải pháp phần mềm sáng tạo",
    },
    about: {
      title: "Về tôi",
      intro: "Với tư duy khởi nghiệp, tôi tin vào việc phát triển nhanh mẫu thử (rapid prototyping), lặp lại cải tiến (iteration), và mang lại tác động thực tiễn. Tôi đặc biệt tập trung vào việc ứng dụng AI — không chỉ như một xu hướng, mà như một công cụ để khai phá giá trị thực trong thế giới.",
      workIsAbout: "Công việc của tôi là:",
      points: [
        "Biến các ý tưởng thành sản phẩm khả dụng tối thiểu (MVPs) và bản demo",
        "Sử dụng AI để tự động hóa, nâng cao và đơn giản hóa trải nghiệm người dùng",
        "Tạo ra các công cụ mà mọi người _thực sự_ muốn sử dụng — trong giáo dục, công nghệ pháp lý và hơn thế nữa",
        "Xây dựng tương lai nơi các công cụ hỗ trợ AI trở nên phải chăng và ý nghĩa cho mọi người"
      ],
      exploring: "Hiện tại, tôi đang tìm hiểu:",
      exploringPoints: [
        "AI pháp lý tại Việt Nam sử dụng RAG (Redis + OpenAI)",
        "Phát triển các hệ thống gọn nhẹ để hiểu cách máy móc hoạt động"
      ]
    },
    skills: {
     title_my_expertise: {
      whitePart: "Kỹ năng",
      gradientPart: "của tôi"
     },
     title_technical: "Kỹ năng kỹ thuật",
     title_professional: "Kỹ năng nghề nghiệp",
     technical: [
      { name: "HTML", icon: "html", level: 90 },
      { name: "CSS", icon: "css", level: 70 },
      { name: "JavaScript", icon: "javascript", level: 55 },
      { name: "Python", icon: "python", level: 75 },
      { name: "React", icon: "react", level: 45 },
    ],
     professional: [
      { name: "Sáng tạo", level: 90 },
      { name: "Giao tiếp", level: 85 },
      { name: "Giải quyết vấn đề", level: 75 },
      { name: "Làm việc nhóm", level: 85 },
     ]
    },
    projects: {
      viewOnGithub: "Xem trên GitHub",
    },
    academicArticles: {
      title: "Bài viết & Nghiên cứu Khoa học (Sắp ra mắt)",
      description: "Đây là một số bài viết học thuật và nghiên cứu mà tôi đã đóng góp hoặc là tác giả chính.",
      articles: [
        {
          title: "Tác động của AI trong phân tích tài liệu pháp lý",
          link: "https://example.com/article1-vi",
          date: "Tháng 5, 2024",
          authors: "MNfine"
        },
        {
          title: "Kiến trúc RISC-V: Phân tích hiệu năng",
          link: "https://example.com/article2-vi",
          date: "Tháng 3, 2024",
          authors: "MNfine"
        },
        {
          title: "Nâng cao trải nghiệm người dùng với LLM trong giáo dục",
          link: "https://example.com/article3-vi",
          date: "Tháng 1, 2024",
          authors: "MNfine"
        }
      ],
    },
    funFacts: {
      title: "Sự thật thú vị",
      items: [
        "Fan cứng của **pixel art** nhưng vẽ dở.",
        "Thích chơi **bóng đá**, là thành viên của clb bóng đá đó nha, mình còn là vận động viên điền kinh nữa.",
        "Từng thức khuya để hoàn thành dự án AI đầu tay chỉ vì… quá hứng thú.",
        "Luôn thích tìm hiểu các công nghệ mới và chia sẻ lại cho bạn bè.",
        "“Code xong mới ngủ” – triết lý quen thuộc của MNfine mỗi mùa deadline!",
        "Không uống cà phê, chỉ “sống bằng nước tăng lực” và đam mê học hỏi."
      ]
    },
    footer: {
      tagline: "Hãy cùng nhau xây dựng những điều tuyệt vời 🚀",
    }
  }
};

// projectData 
const projectData = [
  {
    id: 1,
    title: "llama2-lawbot",
    icons: [<Bot key="bot1"/>],
    tags: ["Llama 2", "NLP", "Legal AI"],
    description: {
      en: "Legal chatbot using Llama 2, RAG & prompt engineering",
      vi: "Chatbot pháp lý sử dụng Llama 2, RAG & kỹ thuật prompt",
    },
    githubLink: "https://github.com/MNfine/llama2-lawbot",
     // NEW: Add image/video preview
    previewImage: "/images/lawbot_screenshot.png", // Path to your project screenshot
    previewVideo: "https://www.youtube.com/embed/your_video_id" // Link to a short demo video
  },
  {
    id: 2,
    title: "VietLawBot",
    icons: [<Database key="db1"/>],
    tags: ["OpenAI", "Redis", "RAG"],
    description: {
      en: "Vietnamese legal chatbot powered by OpenAI & Redis (RAG)",
      vi: "Chatbot pháp lý tiếng Việt được hỗ trợ bởi OpenAI & Redis (RAG)",
    },
    githubLink: "https://github.com/MNfine/VietLawBot",
    // NEW: Add image/video preview
    previewImage: "/images/lawbot_screenshot.png", // Path to your project screenshot
    previewVideo: "https://www.youtube.com/embed/your_video_id" // Link to a short demo video
  },
  {
    id: 3,
    title: "VietNamAdventures",
    icons: [<Gamepad2 key="gamepad2"/>],
    tags: ["Game Dev", "Storytelling", "Interactive"],
    description: {
      en: "Interactive storytelling game based on Vietnamese folklore",
      vi: "Trò chơi kể chuyện tương tác dựa trên văn hóa dân gian Việt Nam",
    },
    githubLink: "https://github.com/MNfine/VietNamAdventures",
    // NEW: Add image/video preview
    previewImage: "/images/lawbot_screenshot.png", // Path to your project screenshot
    previewVideo: "https://www.youtube.com/embed/your_video_id" // Link to a short demo video
  },
  {
    id: 4,
    title: "riscv-iss",
    icons: [<Cpu key="cpu1"/>],
    tags: ["RISC-V", "Assembly", "Simulation"],
    description: {
      en: "Instruction Set Simulator for RISC-V architecture",
      vi: "Mô phỏng Tập lệnh cho kiến trúc RISC-V",
    },
    githubLink: "https://github.com/MNfine/riscv-iss",
    // NEW: Add image/video preview
    previewImage: "/images/lawbot_screenshot.png", // Path to your project screenshot
    previewVideo: "https://www.youtube.com/embed/your_video_id" // Link to a short demo video
  },
  {
    id: 5,
    title: "riscv-assembler",
    icons: [<Code key="code1"/>],
    tags: ["Compiler", "Assembly", "Education"],
    description: {
      en: "Educational assembler written from scratch",
      vi: "Trình hợp dịch (assembler) phục vụ học tập, được tự xây dựng từ đầu",
    },
    githubLink: "https://github.com/MNfine/riscv-assembler",
    // NEW: Add image/video preview
    previewImage: "/images/lawbot_screenshot.png", // Path to your project screenshot
    previewVideo: "https://www.youtube.com/embed/your_video_id" // Link to a short demo video
  },
  {
    id: 6,
    title: "Demo-E-commerce-using-Redis",
    icons: [<Zap key="zap1"/>],
    tags: ["Redis", "Real-time", "E-commerce"],
    description: {
      en: "Real-time e-commerce demo powered by Redis",
      vi: "Demo mua sắm thời gian thực ứng dụng Redis",
    },
    githubLink: "https://github.com/MNfine/Demo-E-commerce-using-Redis",
    // NEW: Add image/video preview
    previewImage: "/images/lawbot_screenshot.png", // Path to your project screenshot
    previewVideo: "https://www.youtube.com/embed/your_video_id" // Link to a short demo video
  },
];

export default function EnhancedPortfolioPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const smoothMouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(0, { stiffness: 300, damping: 30 });
  const containerRef = useRef(null);

  { /* State Multi-language contents */ }
  const [language, setLanguage] = useState('en');
  { /* State for menu open/close */ }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      smoothMouseX.set(x);
      smoothMouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothMouseX, smoothMouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.9,
      rotateX: 15
    },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden bg-gray-900/80">

      {/* --- Fixed Navbar --- */}
      <motion.nav
        className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md z-50 py-4 px-4 sm:px-6 shadow-lg border-b border-emerald-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <a
            href="#avatar"
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform duration-200"
          >
            <span className="hidden sm:inline">MNfine</span> 
            <span className="sm:hidden text-lg">MNfine</span> 
          </a>

          {/* Menu desktop & mobile toggle */}
          <div className="flex items-center">
            {/* Toggle Button for Mobile Menu */}
            <button
              className="md:hidden text-gray-300 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-1 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {Object.keys(pageContent[language].navbar).map((key) => {
                if (key.endsWith('Url')) return null; 
                return (
                  <motion.li key={key} whileHover={{ y: -2, scale: 1.05 }}>
                    <a
                      href={pageContent[language].navbar[`${key}Url`]}
                      className="text-sm sm:text-lg text-gray-300 hover:text-green-300 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)} 
                    >
                      {pageContent[language].navbar[key]}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Language Switcher */}
            <div className="ml-4 md:ml-6 flex items-center bg-gray-700/50 rounded-full p-1 border border-emerald-600/40">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                  language === 'en' ? 'bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'text-gray-400 hover:text-green-300'
                }`}
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                  language === 'vi' ? 'bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'text-gray-400 hover:text-green-300'
                }`}
              >
                VIE
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.ul
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
          }}
          className="md:hidden absolute top-16 left-5 right-5 flex flex-col items-center mt-4 space-y-4 bg-gray-800/90 rounded-lg overflow-hidden backdrop-blur-md text-center"
        >
          {Object.keys(pageContent[language].navbar).map((key) => {
            if (key.endsWith('Url')) return null;
            return (
              <motion.li key={key} variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: -20, opacity: 0 }
              }}>
                <a
                  href={pageContent[language].navbar[`${key}Url`]}
                  className="text-gray-200 hover:text-green-400 transition font-medium text-lg block py-2 px-4"
                  onClick={() => setIsMobileMenuOpen(false)} // UPDATED: Close mobile menu on link click
                >
                  {pageContent[language].navbar[key]}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.nav>

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900"
        style={{ y: backgroundY }}
      />

      {/* Matrix-style Grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <motion.div
              key={i}
              className="border-green-500/20 border-r border-b"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 2,
                delay: (i * 0.01) % 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Cursor Glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.15), transparent 60%)`
        }}
      />

      {/* Floating Code Symbols */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/20 font-mono text-xs select-none"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {["{ }", "< >", "[ ]", "( )", "=>", "&&", "||", "!="][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 80,
            damping: 15
          }}
          className="text-center mb-16 relative"
        >
          {/* Glowing background for title */}
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute inset-0 bg-green-400/10 blur-3xl rounded-full"
          />

          {/* Avatar and Quick Stacts */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center md:gap-x-12 mb-8">
            {/* Avatar */}
            <motion.div
              id="avatar" // ID for navigation
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="mb-8 md:mb-0 max-w-[150px] md:max-w-[250px]"
            >
              <MNfineAvatar size={window.innerWidth < 768 ? 150 : 250} /> {/* Adjust MNfineAvatar size dynamically */}
            </motion.div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-emerald-700/50 rounded-xl p-6 shadow-xl shadow-emerald-900/20 text-left h-[220px] sm:h-[250px] w-[280px] sm:w-[300px]">
              <div className="flex flex-col gap-2 sm:gap-3">
                <span className="text-gray-300 text-sm sm:text-base">
                  Ho Chi Minh, Viet Nam
                </span>
                <span className="text-green-300 text-sm sm:text-base">
                  AI Engineer
                </span>
                <span className="text-emerald-300 text-sm sm:text-base">
                  Startup Mindset
                </span>
                <span className="text-green-400 text-sm sm:text-base">
                  hothiminhngoc7461@gmail.com
                </span>
                <a
                  href="https://www.facebook.com/minh.ngoc.411702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 text-sm sm:text-base flex items-center gap-2 hover:text-blue-200 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block flex-shrink-0">
                    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.876V15.89h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.261c-1.242 0-1.631.771-1.631 1.562V13h2.773l-.443 2.89h-2.33v6.986C18.343 21.128 22 16.991 22 12"/>
                  </svg>
                  Facebook
                </a>
                <a
                  href="http://linkedin.com/in/ngọc-hồ-thị-minh-359763369"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 text-sm sm:text-base flex items-center gap-2 hover:text-sky-200 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block flex-shrink-0">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75c.966 0 1.75.783 1.75 1.75s-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.604c0-1.098-.021-2.509-1.528-2.509-1.529 0-1.763 1.195-1.763 2.428v4.685h-3v-9h2.885v1.233h.041c.403-.765 1.388-1.568 2.859-1.568 3.058 0 3.624 2.012 3.624 4.629v4.706z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          { /* Tille MNfine but hidden */ }
          <motion.h1
            className="relative text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_40px_rgba(34,197,94,0.5)] mb-6 hidden"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 60px rgba(34,197,94,0.8)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
          >
            { /* MNfine */ }
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="mx-auto mb-8 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            style={{ maxWidth: "500px" }}
          />

          { /* Hero section */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
            delay: 1,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed"
          >
          {pageContent[language].hero.tagline1}
          <span className="text-green-400 font-semibold glow-text">
            {pageContent[language].hero.tagline2_school}
          </span>
          <br />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-green-300"
            >
            {pageContent[language].hero.tagline3}
            </motion.span>
          </motion.p>
        </motion.div>

        {/* About Me Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto py-16 px-4 text-center rounded-2xl
                     bg-gray-800/50 backdrop-blur-sm
                     border border-emerald-700/50 shadow-xl
                     shadow-emerald-900/20
                     transform hover:scale-[1.005] transition-transform duration-300 ease-out"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] mb-8">
            {pageContent[language].about.title}
          </h2>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6">
            {pageContent[language].about.intro}
          </p>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
            {pageContent[language].about.workIsAbout}
          </p>

          {/* Styles "My work is about" */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6 sm:mb-8">
            {pageContent[language].about.points.map((point, idx) => (
              <motion.li
                key={idx}
                className="flex items-start p-4 rounded-lg bg-gray-700/30 border border-green-700/30
                           hover:bg-gray-700/50 hover:border-green-600/50 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                {/* Icons */}
                {idx === 0 && <Zap className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />}
                {idx === 1 && <Bot className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />}
                {idx === 2 && <Code className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />}
                {idx === 3 && <Database className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />}
                <span className="text-gray-200 text-base md:text-lg">{point}</span>
              </motion.li>
            ))}
          </ul>

          <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-2 sm:mb-4">
            {pageContent[language].about.exploring}
          </p>

          {/* Styles "Right now, I'm exploring" */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {pageContent[language].about.exploringPoints.map((point, idx) => (
              <motion.li
                key={idx}
                className="flex items-start p-4 rounded-lg bg-gray-700/30 border border-emerald-700/30
                           hover:bg-gray-700/50 hover:border-emerald-600/50 transition-colors duration-200"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                {/* Icons */}
                {idx === 0 && <Cpu className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />}
                {idx === 1 && <Globe className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />}
                <span className="text-gray-200 text-base md:text-lg">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Skills Tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-4 justify-center my-16"
        >
          {["AI & ML", "Startup Mindset", "OpenAI", "Redis", "Full Stack", "System Design"].map((tag, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                rotate: [0, -2, 2, 0],
                boxShadow: "0 0 30px rgba(34,197,94,0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Badge className="bg-gradient-to-r from-green-900/80 to-green-700/80 hover:from-green-800 hover:to-green-600 text-green-100 text-sm sm:text-base px-6 py-3 rounded-full shadow-lg backdrop-blur-md border border-green-400/40 hover:border-green-300/60 transition-all duration-300">
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section - UPDATED TO USE CHARTS */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-6xl mx-auto py-16 px-4 text-center rounded-2xl
                     bg-gray-800/50 backdrop-blur-sm
                     border border-emerald-700/50 shadow-xl
                     shadow-emerald-900/20"
        >
          {/* My Expertise Title - Split for custom styling */}
          <h2 className="text-center font-extrabold mb-12">
            <span className="text-gray-200 text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {pageContent[language].skills.title_my_expertise.whitePart}{" "}
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              {pageContent[language].skills.title_my_expertise.gradientPart}
            </span>
          </h2>

          <div className="flex flex-col lg:flex-row justify-around gap-12 lg:gap-8 p-6 sm:p-6">
            {/* Technical Skills */}
            <div className="lg:w-1/2 flex flex-col items-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 pb-2 border-b-2 border-gray-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {pageContent[language].skills.title_technical}
              </h3>
              <div className="w-full max-w-sm sm:max-w-md">
                {pageContent[language].skills.technical.map((skill, idx) => (
                  <TechnicalSkillBar key={idx} name={skill.name} icon={skill.icon} level={skill.level} />
                ))}
              </div>
            </div>

            <div className="lg:border-l-2 lg:border-emerald-700/50 lg:h-auto my-auto" /> {/* Divider */}

            {/* Professional Skills */}
            <div className="lg:w-1/2 flex flex-col items-center p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 sm:mb-6 pb-2 border-b-2 border-gray-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {pageContent[language].skills.title_professional}
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 max-w-sm w-full">
                {pageContent[language].skills.professional.map((skill, idx) => (
                  <ProfessionalSkillCircle key={idx} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Grid Section */}
        <motion.section
          id="projects" // ID for navigation
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-6xl mx-auto py-8 px-4 sm:py-16 sm:px-6"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
          >
            {projectData.map((project, idx) => {
              const IconComponent = project.icons[0].type;
              return (
                <motion.div
                key={project.id}
                variants={itemVariants}
                className="w-full max-w-sm"
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(34,197,94,0.3)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}>
                  <Card className="h-full bg-gradient-to-br from-black/90 via-gray-900/90 to-green-900/20 backdrop-blur-xl border-2 border-green-700/30 hover:border-green-500/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform-gpu relative">

                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-sm"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.98, 1.02, 0.98]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Green accent line */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-green-400 to-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                      layoutId={`accent-${idx}`}
                    />

                    <CardContent className="p-6 sm:p-8 h-full flex flex-col relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: 1.2
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center mb-4 sm:mb-6 shadow-lg border border-green-500/50 relative overflow-hidden"
                      >
                        {/* Icon glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-green-400/20 blur-sm"
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-green-100 relative z-10" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-grow">
                        <motion.h3
                          className="text-xl sm:text-2xl font-bold text-green-300 mb-2 sm:mb-3 group-hover:text-green-200 transition-colors duration-300"
                          whileHover={{ x: 5 }}
                        >
                          {project.title}
                        </motion.h3>
                        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                          {project.description[language]}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                          {project.tags.map((tag, techIdx) => (
                            <motion.span
                              key={techIdx}
                              whileHover={{ scale: 1.1 }}
                              className="px-2 py-0.5 text-xs bg-green-900/40 text-green-200 rounded-full backdrop-blur-sm border border-green-600/30 hover:border-green-500/50 transition-all duration-200"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="block"
                      >
                        <Button className="w-full bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 font-semibold text-sm sm:text-base py-2 sm:py-3 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center"> 
                         <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-emerald-600 hover:text-emerald-700" /> 
                         <span className="text-emerald-600 hover:text-emerald-700">{pageContent[language].projects.viewOnGithub}</span>
                        </Button>
                      </motion.a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Academic Articles & Research Section */}
        <motion.section
          id="academic-articles" // ID for navigation
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-6xl mx-auto py-16 px-4 text-center rounded-2xl
                     bg-gray-800/50 backdrop-blur-sm
                     border border-emerald-700/50 shadow-xl
                     shadow-emerald-900/20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] mb-6 sm:mb-8 pb-2">
            {pageContent[language].academicArticles.title}
          </h2>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12">
            {pageContent[language].academicArticles.description}
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {pageContent[language].academicArticles.articles.map((article, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                // Hover effect for article
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.4), 0 0 25px rgba(34,197,94,0.2)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="bg-gradient-to-br from-black/90 via-gray-900/90 to-green-900/10 backdrop-blur-xl border-2 border-green-700/30 hover:border-green-500/60 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="p-6 flex flex-col h-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">
                    {article.authors} - {article.date}
                  </p>
                  {/* You can add a short abstract/description here if you have it */}
                  {/* <p className="text-gray-300 mb-4 flex-grow">{article.abstract}</p> */}
                  <span className="text-emerald-400 hover:text-emerald-300 mt-auto flex items-center justify-end text-sm sm:text-base">
                    Read More <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Fun Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-xl mx-auto mt-8 sm:mt-12 mb-8 sm:mb-10 bg-gray-900/80 rounded-2xl p-6 shadow-lg border border-emerald-700/40"
        >
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
            <span>✨ {pageContent[language].funFacts.title}</span>
          </h3>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-emerald-200 text-sm sm:text-base">
            {pageContent[language].funFacts.items.map((fact, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.08, duration: 0.4, ease: "easeOut" }}
                // Replace **text** with <b>text</b> for direct rendering
                dangerouslySetInnerHTML={{ __html: fact.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
              />
            ))}
          </ul>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center mt-20 py-8"
        >
          <motion.p
            className="text-gray-400 text-lg mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {pageContent[language].footer.tagline}
          </motion.p>
          <motion.div
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}