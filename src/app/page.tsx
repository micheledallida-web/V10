// src/app/page.tsx
"use client";

import { useState } from "react";
import { Zap, Layout, Server } from "lucide-react";
import AuthenticModal from "./AuthenticModal"; // Adjust path to where you saved the modal file

const FEATURES = [
  { icon: Zap, title: "AI Full Stack Generation", desc: "Generate interfaces, databases, APIs, and authentication dynamically." },
  { icon: Layout, title: "Frontend Engine", desc: "Beautiful responsive layouts compiled natively using Next.js 15 and Tailwind CSS." },
  { icon: Server, title: "Sovereign Backend", desc: "Type-safe routing controls, backend microservices, and absolute validations." },
];

export default function LandingPage() {
  // 1. Create the state to track if the modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-32 pb-32">
      
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto pt-16">
        <div className="inline-block px-3 py-1 bg-[#8EF08A]/10 border border-[#8EF08A]/30 rounded-full text-xs font-semibold text-[#8EF08A] uppercase tracking-wider mb-6">
          Batch One Launch Target
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-tight text-white">
          Build Full-Stack <br />
          <span className="text-[#8EF08A]">Web Apps in Minutes</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Instantly generate layouts, database configurations, and authentication setups using straightforward natural language descriptions.
        </p>

        {/* 2. Update the button to trigger the modal */}
        <div className="mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-[#8EF08A] transition-all duration-300 hover:scale-[1.02]"
          >
            Get Started & Build Instantly
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">Engineered for Rapid Production</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-white/5 bg-zinc-900/20 hover:border-[#8EF08A]/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-[#8EF08A]">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mt-4 text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Drop the modal component at the bottom of the canvas layer */}
      <AuthenticModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
