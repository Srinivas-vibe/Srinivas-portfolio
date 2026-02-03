"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t border-border/30">
      {/* Subtle background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              S
            </motion.div>
            <span className="text-foreground font-semibold text-lg">Srinivas</span>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            className="flex flex-wrap items-center justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {["About", "Strengths", "Skills", "Projects", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {currentYear} Srinivas. All rights reserved.
          </motion.p>
        </div>

        {/* Animated divider */}
        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Bottom message */}
        <motion.p
          className="mt-6 text-center text-muted-foreground/60 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Built with React, Next.js, GSAP & Framer Motion
        </motion.p>
      </div>
    </footer>
  );
}
