"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const skills = [
  { name: "React", level: 95, color: "#61DAFB" },
  { name: "TypeScript", level: 90, color: "#3178C6" },
  { name: "JavaScript", level: 95, color: "#F7DF1E" },
  { name: "Tailwind CSS", level: 92, color: "#06B6D4" },
  { name: "Bootstrap", level: 85, color: "#7952B3" },
  { name: "React Native", level: 75, color: "#61DAFB" },
  { name: "Redux", level: 88, color: "#764ABC" },
  { name: "shadcn/ui", level: 90, color: "#000000" },
  { name: "GSAP", level: 85, color: "#88CE02" },
  { name: "Framer Motion", level: 88, color: "#FF0055" },
];

function SkillCard({ 
  skill, 
  index, 
  isSelected, 
  onSelect 
}: { 
  skill: typeof skills[0]; 
  index: number; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
      }}
      onClick={onSelect}
    >
      <motion.div
        className={`relative bg-card/80 backdrop-blur-xl border-2 rounded-2xl p-6 transition-colors ${
          isSelected ? "border-primary" : "border-border/50 hover:border-primary/50"
        }`}
        whileHover={{ 
          scale: 1.05, 
          y: -8,
          rotateZ: Math.random() > 0.5 ? 2 : -2,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Skill level indicator */}
        <motion.div
          className="absolute top-0 left-0 h-1 rounded-t-2xl"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />

        {/* Skill icon/badge */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-lg"
          style={{ backgroundColor: skill.color }}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {skill.name.charAt(0)}
        </motion.div>

        <h3 className="text-lg font-semibold text-foreground mb-2">{skill.name}</h3>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm text-muted-foreground font-medium">{skill.level}%</span>
        </div>

        {/* Selection glow effect */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ 
                boxShadow: `0 0 30px ${skill.color}40`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 0.8, 1], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
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
            Tech Stack
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Skills </span>
            <span className="text-primary">Playground</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Click on any skill to explore. Each card reacts to your interaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isSelected={selectedSkill === index}
              onSelect={() => setSelectedSkill(selectedSkill === index ? null : index)}
            />
          ))}
        </div>

        {/* Selected skill detail */}
        <AnimatePresence>
          {selectedSkill !== null && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="inline-block bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-8 py-6">
                <div className="flex items-center gap-4 justify-center">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: skills[selectedSkill].color }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                  >
                    {skills[selectedSkill].name.charAt(0)}
                  </motion.div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-foreground">
                      {skills[selectedSkill].name}
                    </h3>
                    <p className="text-muted-foreground">
                      Proficiency: {skills[selectedSkill].level}%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
