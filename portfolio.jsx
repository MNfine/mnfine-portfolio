import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Zap, Code, Database, Cpu, Bot, Gamepad2 } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function EnhancedPortfolioPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const smoothMouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(0, { stiffness: 300, damping: 30 });
  const containerRef = useRef(null);

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

  const projects = [
    {
      title: "llama2-lawbot",
      description: "Legal chatbot using Llama 2 & prompt engineering",
      url: "https://github.com/MNfine/llama2-lawbot",
      icon: Bot,
      tech: ["Llama 2", "NLP", "Legal AI"]
    },
    {
      title: "VietLawBot", 
      description: "Vietnamese legal chatbot powered by OpenAI & Redis (RAG)",
      url: "https://github.com/MNfine/VietLawBot",
      icon: Database,
      tech: ["OpenAI", "Redis", "RAG"]
    },
    {
      title: "VietNamAdventures",
      description: "Interactive storytelling game based on Vietnamese folklore",
      url: "https://github.com/MNfine/VietNamAdventures", 
      icon: Gamepad2,
      tech: ["Game Dev", "Storytelling", "Interactive"]
    },
    {
      title: "riscv-iss",
      description: "Instruction Set Simulator for RISC-V architecture",
      url: "https://github.com/MNfine/riscv-iss",
      icon: Cpu,
      tech: ["RISC-V", "Assembly", "Simulation"]
    },
    {
      title: "riscv-assembler",
      description: "Educational assembler written from scratch", 
      url: "https://github.com/MNfine/riscv-assembler",
      icon: Code,
      tech: ["Compiler", "Assembly", "Education"]
    },
    {
      title: "Demo-E-commerce-using-Redis",
      description: "Real-time shopping demo with Redis-powered backend",
      url: "https://github.com/MNfine/Demo-E-commerce-using-Redis",
      icon: Zap,
      tech: ["Redis", "Real-time", "E-commerce"]
    },
  ];

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
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
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

      <div className="relative z-10 px-4 py-10">
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
          
          <motion.h1
            className="relative text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 drop-shadow-[0_0_40px_rgba(34,197,94,0.5)] mb-6"
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
            MNfine's Portfolio 
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
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Information Technology Student at <span className="text-green-400 font-semibold glow-text">UIT - VNU-HCM</span>
            <br />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-green-300"
            >
              Building the future with AI and innovative software solutions
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Skills Tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {["AI & ML", "Startup Mindset", "OpenAI", "Redis", "RISC-V", "Full Stack", "System Design"].map((tag, idx) => (
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
              <Badge className="bg-gradient-to-r from-green-900/80 to-green-700/80 hover:from-green-800 hover:to-green-600 text-green-100 text-base px-6 py-3 rounded-full shadow-lg backdrop-blur-md border border-green-400/40 hover:border-green-300/60 transition-all duration-300">
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, idx) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
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
                }}
                className="group perspective-1000"
              >
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
                  
                  <CardContent className="p-8 h-full flex flex-col relative z-10">
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
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center mb-6 shadow-lg border border-green-500/50 relative overflow-hidden"
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
                      <IconComponent className="w-8 h-8 text-green-100 relative z-10" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-grow">
                      <motion.h3 
                        className="text-2xl font-bold text-green-300 mb-3 group-hover:text-green-200 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIdx) => (
                          <motion.span
                            key={techIdx}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 text-xs bg-green-900/40 text-green-200 rounded-full backdrop-blur-sm border border-green-600/30 hover:border-green-500/50 transition-all duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="block"
                    >
                      <Button className="w-full bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 font-semibold text-base py-3 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center">
                      <Github className="w-5 h-5 mr-2" />
                      <span>View on GitHub</span>
                      </Button>
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
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
            Let's build something amazing together 🚀
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