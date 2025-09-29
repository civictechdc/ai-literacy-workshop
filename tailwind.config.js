/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ai-blue': '#1e3a8a',
        'ai-cyan': '#06b6d4',
        'ai-purple': '#7c3aed',
        'ai-amber': '#f59e0b',
        'ai-green': '#10b981',
        'ai-slate': '#64748b',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.25rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['clamp(1rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(0.875rem, 2vw, 1.375rem)', { lineHeight: '1.4' }],
        'body': ['clamp(0.875rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'small': ['clamp(0.75rem, 1.2vw, 0.875rem)', { lineHeight: '1.5' }],
        'xs': ['clamp(0.625rem, 1vw, 0.75rem)', { lineHeight: '1.4' }],
      },
      maxWidth: {
        'slide': '1400px',
        'content': '65ch', // Optimal reading width
      },
      spacing: {
        'slide-padding': 'clamp(1rem, 4vw, 3rem)',
        'content-gap': 'clamp(0.25rem, 1vw, 0.75rem)',
        'section-gap': 'clamp(0.5rem, 1.5vw, 1rem)',
        'element-gap': 'clamp(0.25rem, 1vw, 0.75rem)',
      },
      screens: {
        'xs': '475px',
        'tall': { 'raw': '(min-height: 800px)' },
        'short': { 'raw': '(max-height: 600px)' },
      }
    },
  },
  plugins: [],
}
