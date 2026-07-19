"use client";

import { ArrowLeft, ArrowRight, ChevronDown, UserRound } from "lucide-react";
import { useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md">
      <div className="h-full w-full overflow-y-auto">
        <div className="mx-auto min-h-full w-full max-w-md bg-[#111111] text-white px-6 pt-7 pb-10 relative">
          <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.05), transparent 45%)" }} />

          <div className="relative z-10">
            <div className="mb-14 flex items-center justify-between">
              <div className="text-5xl font-semibold tracking-tight leading-none">emergent</div>
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
                aria-label="Close login modal"
              >
                ✕
              </button>
            </div>

            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-8 text-6xl leading-none">e</div>
              <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                Build Full-Stack
                <br />
                <span className="text-[#98F7A4]">Web & Mobile Apps in minutes</span>
              </h2>
            </div>

            <p className="mb-10 text-center text-4xl font-medium text-white/85">
              Already have an account? <a href="#" className="underline underline-offset-4">Sign in</a>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Get code for ${name || "user"} (${phone || "no phone"})`);
              }}
              className="space-y-5"
            >
              <div className="h-[84px] rounded-full border border-white/15 bg-[#161616] px-8 flex items-center gap-5">
                <UserRound className="h-8 w-8 text-white/45" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-transparent text-4xl placeholder:text-white/40 outline-none"
                />
              </div>

              <div className="h-[84px] rounded-full border border-white/15 bg-[#161616] px-6 flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-white/15">
                  <span className="text-4xl">🇮🇳</span>
                  <ChevronDown className="h-6 w-6 text-white/45" />
                </div>
                <span className="text-4xl text-white/90">+91</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="min-w-0 flex-1 bg-transparent text-4xl placeholder:text-white/40 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[84px] w-[84px] shrink-0 rounded-full bg-[#1B1B1B] border border-white/5 text-white flex items-center justify-center"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-9 w-9" />
                </button>
                <button
                  type="submit"
                  className="h-[84px] flex-1 rounded-full bg-white text-[#151515] text-5xl font-semibold tracking-tight flex items-center justify-center gap-4"
                >
                  Get code <ArrowRight className="h-9 w-9" />
                </button>
              </div>
            </form>

            <p className="mt-12 text-center text-[30px] leading-[1.45] text-white/45">
              By continuing, you agree to our
              <br />
              <a href="#" className="underline underline-offset-4">Terms of Service</a> and <a href="#" className="underline underline-offset-4">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
