"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: "HVAC Bluestar",
    subtitle: "Enterprise Admin Dashboard",
    description: "Multi-level approval flow with advanced animations",
    tech: ["React", "TypeScript", "GSAP", "Redux"],
    color: "#3B82F6",
    features: ["Multi-level approval", "Role-based access", "Real-time updates"],
  },
  {
    title: "SVV / RTM",
    subtitle: "KYC & Wallet System",
    description: "Secure identity verification with role-based UI",
    tech: ["React", "Redux", "TypeScript", "REST API"],
    color: "#10B981",
    features: ["KYC verification", "Wallet management", "Transaction history"],
  },
  {
    title: "HRMS",
    subtitle: "HR Management System",
    description: "Comprehensive HR workflows with modern UI",
    tech: ["React", "shadcn/ui", "TypeScript", "Tailwind"],
    color: "#8B5CF6",
    features: ["Employee management", "Leave tracking", "Performance reviews"],
  },
];

function AnimatedDashboard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div className="relative w-full aspect-video bg-card/50 rounded-2xl overflow-hidden border border-border/30">
      {/* Dashboard header */}
      <motion.div 
        className="h-10 bg-muted/50 border-b border-border/30 flex items-center px-4 gap-2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
          {project.title.toLowerCase().replace(/\s/g, "-")}.app
        </div>
      </motion.div>

      {/* Dashboard content */}
      <div className="p-4 grid grid-cols-3 gap-3 h-[calc(100%-40px)]">
        {/* Sidebar */}
        <motion.div
          className="col-span-1 bg-muted/30 rounded-xl p-3 space-y-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`h-8 rounded-lg ${i === 0 ? "bg-primary/30" : "bg-muted/50"}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ x: 5, backgroundColor: `${project.color}30` }}
            />
          ))}
        </motion.div>

        {/* Main content */}
        <div className="col-span-2 space-y-3">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-muted/30 rounded-xl p-3"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-lg mb-2"
                  style={{ backgroundColor: `${project.color}40` }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                />
                <div className="h-2 w-12 bg-muted/50 rounded" />
              </motion.div>
            ))}
          </div>

          {/* Chart area */}
          <motion.div
            className="flex-1 bg-muted/30 rounded-xl p-4 min-h-[100px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-end gap-2 h-full">
              {[40, 65, 45, 80, 55, 70, 50, 85].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{ backgroundColor: project.color }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 100 }}
                  whileHover={{ scaleY: 1.1, backgroundColor: "#ff6b35" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: project.color }}
        animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        whileHover={{ scale: 1.2 }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
    >
      <motion.div
        className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Project preview */}
        <div className="p-6 pb-0">
          <AnimatedDashboard project={project} index={index} />
        </div>

        {/* Project info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.span
                className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-2"
                style={{ backgroundColor: `${project.color}20`, color: project.color }}
              >
                Internal Project
              </motion.span>
              <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
              <p className="text-primary font-medium">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{project.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.features.map((feature, i) => (
              <motion.span
                key={feature}
                className="px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: `${project.color}20` }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
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
            Featured Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Project </span>
            <span className="text-primary">Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Enterprise applications built with modern React patterns and smooth animations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
