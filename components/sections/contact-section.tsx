"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const contactLinks = [
  {
    label: "Email",
    value: "srinivasan.ezhumalai2636@gmail.com",
    href: "mailto:srinivasan.ezhumalai2636@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Srinivas",
    href: "https://linkedin.com/in/srini-vasan-106a85284",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "8098652460",
    href: "tel:8098652460",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

function ContactCard({ contact, index }: { contact: typeof contactLinks[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={contact.href}
      target={contact.label === "LinkedIn" ? "_blank" : undefined}
      rel={contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}
      className="block"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 overflow-hidden group"
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          {/* Icon with bounce effect */}
          <motion.div
            className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4"
            animate={isHovered ? { 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {contact.icon}
          </motion.div>

          <h3 className="text-lg font-medium text-muted-foreground mb-1">{contact.label}</h3>
          <p className="text-foreground font-semibold text-lg break-all">{contact.value}</p>

          {/* Arrow indicator */}
          <motion.div
            className="absolute top-8 right-8 text-primary"
            initial={{ x: 0, opacity: 0.5 }}
            animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.5 }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        {/* Decorative corner */}
        <motion.div
          className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"
          animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
        />
      </motion.div>
    </motion.a>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [-50, 50, -50], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl"
          animate={{ x: [50, -50, 50] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
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
            Get in Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Let's </span>
            <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Ready to build something amazing together? Reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactLinks.map((contact, index) => (
            <ContactCard key={contact.label} contact={contact} index={index} />
          ))}
        </div>

        {/* Animated CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="mailto:srinivasan.ezhumalai2636@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Send a Message</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
