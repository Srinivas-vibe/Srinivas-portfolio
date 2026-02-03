"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

function AnimatedCharacter({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const eyeX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const eyeY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  
  useEffect(() => {
    const clampedX = Math.max(-8, Math.min(8, (mouseX - 0.5) * 16));
    const clampedY = Math.max(-6, Math.min(6, (mouseY - 0.5) * 12));
    eyeX.set(clampedX);
    eyeY.set(clampedY);
  }, [mouseX, mouseY, eyeX, eyeY]);

  return (
    <motion.div 
      className="relative w-48 h-48 md:w-64 md:h-64"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
    >
      {/* Character body */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-[40%_60%_55%_45%/40%_45%_55%_60%] animate-blob"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      />
      
      {/* Face container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Left eye */}
        <motion.div 
          className="absolute w-10 h-12 md:w-12 md:h-14 bg-card rounded-full left-[25%] top-[35%] flex items-center justify-center overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <motion.div 
            className="w-5 h-5 md:w-6 md:h-6 bg-foreground rounded-full relative"
            style={{ x: eyeX, y: eyeY }}
          >
            <div className="absolute top-1 left-1 w-2 h-2 bg-card rounded-full" />
          </motion.div>
        </motion.div>
        
        {/* Right eye */}
        <motion.div 
          className="absolute w-10 h-12 md:w-12 md:h-14 bg-card rounded-full right-[25%] top-[35%] flex items-center justify-center overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
        >
          <motion.div 
            className="w-5 h-5 md:w-6 md:h-6 bg-foreground rounded-full relative"
            style={{ x: eyeX, y: eyeY }}
          >
            <div className="absolute top-1 left-1 w-2 h-2 bg-card rounded-full" />
          </motion.div>
        </motion.div>
        
        {/* Smile */}
        <motion.div 
          className="absolute bottom-[28%] w-12 h-6 md:w-16 md:h-8 border-b-4 border-card rounded-b-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, type: "spring" }}
        />
      </div>
      
      {/* Floating particles around character */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-accent/60 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, Math.random() > 0.5 ? 10 : -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}

function FloatingShape({ delay, className }: { delay: number; className: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #ff6b35 0%, transparent 50%)`,
        }}
      />

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 bg-secondary/20 rounded-full blur-2xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -50, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/15 rounded-full blur-xl"
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -40, 0]
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#ff6b35 1px, transparent 1px), linear-gradient(90deg, #ff6b35 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                Front-End Developer
              </span>
            </motion.div>

            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              style={{ perspective: "1000px" }}
            >
              <span className="block text-foreground">{splitText("Hi, I'm")}</span>
              <span className="block text-primary mt-2">{splitText("Srinivas")}</span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Front-end developer crafting modern, animated, high-performance web experiences.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "tween", duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold text-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 107, 53, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Animated character */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            <AnimatedCharacter mouseX={mousePosition.x} mouseY={mousePosition.y} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
