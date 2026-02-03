"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const strengths = [
  {
    title: "Animations",
    description: "Creating fluid, physics-based motion that brings interfaces to life",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Clean UI",
    description: "Crafting pixel-perfect, accessible interfaces with attention to detail",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Performance",
    description: "Optimizing for 60 FPS with lazy loading and efficient rendering",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "React Mastery",
    description: "Building scalable applications with modern React patterns",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: "from-violet-500 to-purple-500",
  },
];

function StrengthCard({ strength, index }: { strength: typeof strengths[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 h-full overflow-hidden"
        whileHover={{ 
          scale: 1.03, 
          y: -10,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Icon container with bounce effect */}
        <motion.div
          className={`relative w-16 h-16 bg-gradient-to-br ${strength.color} rounded-2xl flex items-center justify-center text-white mb-6`}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 10, 0],
          }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {strength.icon}
          
          {/* Pulse ring */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${strength.color} rounded-2xl`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <h3 className="text-2xl font-bold text-foreground mb-3">{strength.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{strength.description}</p>

        {/* Decorative corner */}
        <motion.div
          className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${strength.color} rounded-full opacity-10 blur-2xl`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </motion.div>
  );
}

export function StrengthsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="strengths"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            What I Do Best
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-foreground">My </span>
            <span className="text-primary">Strengths</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strengths.map((strength, index) => (
            <StrengthCard key={strength.title} strength={strength} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
