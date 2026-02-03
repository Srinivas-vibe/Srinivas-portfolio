"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const blobs = sectionRef.current.querySelectorAll(".breathing-blob");
    
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        scale: 1.1,
        duration: 2 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Breathing background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="breathing-blob absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="breathing-blob absolute top-1/2 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="breathing-blob absolute bottom-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.span
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
        >
          <span className="text-foreground">Bringing </span>
          <span className="text-primary">Ideas</span>
          <span className="text-foreground"> to Life</span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          {/* Main about card */}
          <motion.div
            className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />

            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-medium">
              Front-end developer crafting modern, animated, high-performance web experiences.
            </p>

            {/* Experience badge */}
            <motion.div
              className="mt-8 inline-flex items-center gap-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">1+</span>
              </div>
              <span className="text-muted-foreground">Year of Experience</span>
            </motion.div>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl rotate-12"
            animate={{
              rotate: [12, -8, 12],
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
