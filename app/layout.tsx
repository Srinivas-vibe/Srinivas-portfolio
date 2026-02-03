import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-heading'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Srinivas | Front-End Developer',
  description: 'Front-end developer crafting modern, animated, high-performance web experiences.',
  generator: 'v0.app',
  keywords: ['Front-End Developer', 'React', 'TypeScript', 'Animations', 'GSAP', 'Web Development'],
  authors: [{ name: 'Srinivas' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove Next.js development overlay
              setInterval(() => {
                const portals = document.querySelectorAll('nextjs-portal');
                portals.forEach(portal => portal.remove());
                
                // Also remove any overlay elements
                const overlays = document.querySelectorAll('[data-nextjs-overlay]');
                overlays.forEach(overlay => overlay.remove());
              }, 100);
            `,
          }}
        />
      </body>
    </html>
  )
}
