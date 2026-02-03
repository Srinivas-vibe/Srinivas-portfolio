"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StrengthsSection } from "@/components/sections/strengths-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  useEffect(() => {
    // Smooth scroll setup for section transitions
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.8 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-background">
      {/* Animated background noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <Navigation />
      
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <StrengthsSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
