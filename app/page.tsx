'use client';

import { motion } from 'framer-motion';
import { Cpu, Layers, Layout, Orbit, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: "Interactive Playgrounds",
      description: "Experiment with React 19 hooks in real-time. See how state flows through components with live visualizations.",
      icon: Layout,
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "React 19 Readiness",
      description: "Master the latest features like useActionState, useOptimistic, and the new 'use' API with practical examples.",
      icon: Sparkles,
      color: "from-violet-400 to-purple-500"
    },
    {
      title: "Performance Insights",
      description: "Understand the React Profiler and how to optimize your applications for the best user experience.",
      icon: Cpu,
      color: "from-pink-400 to-rose-500"
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center py-12">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-4xl px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
        >
          <Orbit className="w-4 h-4 animate-spin-slow" />
          Exploring the future of React
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-violet-300"
        >
          React Observatory
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          An interactive laboratory for mastering React Hooks and APIs.
          Visualize state, explore React 19, and build with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/hooks/use-transition"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)] text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all hover:scale-105"
          >
            Start Exploring
          </Link>
          <Link
            href="https://github.com/ankitkush11798/react-19-hooks"
            target="_blank"
            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all"
          >
            View Source
          </Link>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 overflow-hidden"
          >
            <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity`} />

            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
              {feature.title}
            </h3>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Simple Footer/Section Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 pt-12 border-t border-white/5 w-full max-w-4xl flex items-center justify-between text-sm text-[var(--text-muted)]"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-500" /> Powered by React 19</span>
          <span className="flex items-center gap-1"><Layers className="w-4 h-4 text-cyan-500" /> Next.js App Router</span>
        </div>
        <div>
          © 2026 React Observatory
        </div>
      </motion.div>
    </div>
  );
}
