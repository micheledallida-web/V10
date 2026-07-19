"use client";

import { ArrowLeft, ArrowRight, ChevronDown, Github, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Q3DCanvas from "./Q3DCanvas";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinueWithEmail?: () => void;
};

function ProviderButton({ provider, className, children }: { provider: string; className: string; children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Authorization request with ${provider} completed. (placeholder — wire up Supabase OAuth here)`);
    }, 1800);
  }
  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? <><span className="btn-spinner mr-2" />Pending…</> : children}
    </button>
  );
}

export default function LoginModal({ isOpen, onClose, onContinueWithEmail }: LoginModalProps) {
  const [authStep, setAuthStep] = useState<"options" | "phone">("options");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isOpen) setAuthStep("options");
  }, [isOpen]);

  if (!isOpen) return null;

  const spinningQ = (
    <div className="mb-4 sm:mb-6 flex justify-center">
      <div
        style={{ animation: "spin 3s linear infinite" }}
        className="w-16 h-16 sm:w-20 sm:h-20"
      >
        <Q3DCanvas className="w-full h-full" scale={0.7} />
      </div>
    </div>
  );

  const heading = (
    <h2 className="text-[clamp(1.4rem,5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-center">
      Build Full-Stack
      <br />
      <span className="text-[#98F7A4]">Web &amp; Mobile Apps in Minutes</span>
    </h2>
  );

  const footerLinks = (
    <p className="mt-6 sm:mt-10 text-center text-sm sm:text-[22px] leading-relaxed text-white/45">
      By continuing, you agree to our
      <br />
      <a href="#" className="underline underline-offset-4">Terms of Service</a>{" "}
      /{" "}
      <a href="#" className="underline underline-offset-4">Privacy Policy</a>
    </p>
  );

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md">
        <div className="h-full w-full overflow-y-auto">
          <div className="mx-auto min-h-full w-full max-w-md bg-[#111111] text-white px-4 sm:px-6 pt-5 pb-8 relative">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.05), transparent 45%)",
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 sm:mb-6 flex items-center justify-end">
                <button
                  onClick={() => { onClose(); }}
                  className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
                  aria-label="Close login modal"
                >
                  ✕
                </button>
              </div>

              {authStep === "options" && (
                <div className="flex flex-col items-center">
                  {spinningQ}
                  {heading}

                  <div className="mt-5 sm:mt-8 w-full space-y-3">
                    {/* Google — primary/filled */}
                    <ProviderButton
                      provider="Google"
                      className="w-full h-12 sm:h-[84px] rounded-full bg-white text-[#151515] text-base sm:text-2xl font-semibold flex items-center justify-center gap-3 hover:bg-[#98F7A4] transition disabled:opacity-60"
                    >
                      Continue with Google
                    </ProviderButton>

                    {/* GitHub / Apple / Facebook icon row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <ProviderButton
                        provider="GitHub"
                        className="h-10 sm:h-[60px] rounded-full border border-white/15 bg-[#161616] flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-lg font-medium hover:border-white/30 transition disabled:opacity-60"
                      >
                        <Github className="h-4 w-4 shrink-0" />
                        GitHub
                      </ProviderButton>
                      <ProviderButton
                        provider="Apple"
                        className="h-10 sm:h-[60px] rounded-full border border-white/15 bg-[#161616] flex items-center justify-center text-xs sm:text-lg font-medium hover:border-white/30 transition disabled:opacity-60"
                      >
                        Apple
                      </ProviderButton>
                      <ProviderButton
                        provider="Facebook"
                        className="h-10 sm:h-[60px] rounded-full border border-white/15 bg-[#161616] flex items-center justify-center text-xs sm:text-lg font-medium hover:border-white/30 transition disabled:opacity-60"
                      >
                        Facebook
                      </ProviderButton>
                    </div>

                    {/* OR divider */}
                    <div className="flex items-center gap-4 py-1">
                      <div className="flex-1 h-px bg-white/15" />
                      <span className="text-white/45 text-sm sm:text-xl font-medium tracking-widest">OR</span>
                      <div className="flex-1 h-px bg-white/15" />
                    </div>

                    {/* Email */}
                    <button
                      onClick={() => { onContinueWithEmail?.(); onClose(); }}
                      className="w-full h-12 sm:h-[84px] rounded-full border border-white/15 bg-[#161616] text-base sm:text-2xl font-semibold flex items-center justify-center hover:border-white/30 transition"
                    >
                      Continue with Email
                    </button>

                    {/* Phone */}
                    <button
                      onClick={() => setAuthStep("phone")}
                      className="w-full h-12 sm:h-[84px] rounded-full border border-white/15 bg-[#161616] text-base sm:text-2xl font-semibold flex items-center justify-center hover:border-white/30 transition"
                    >
                      Continue with Phone
                    </button>
                  </div>

                  {footerLinks}
                </div>
              )}

              {authStep === "phone" && (
                <div>
                  <div className="mb-4 sm:mb-6 flex flex-col items-center text-center">
                    {spinningQ}
                    {heading}
                  </div>

                  <p className="mb-4 sm:mb-8 text-center text-sm sm:text-3xl font-medium text-white/85">
                    Already have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Sign in
                    </a>
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Get code for ${name || "user"} (${phone || "no phone"})`);
                    }}
                    className="space-y-3"
                  >
                    <div className="h-12 sm:h-[84px] rounded-full border border-white/15 bg-[#161616] px-5 sm:px-8 flex items-center gap-3 sm:gap-5">
                      <UserRound className="h-5 w-5 sm:h-8 sm:w-8 text-white/45" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-transparent text-base sm:text-4xl placeholder:text-white/40 outline-none"
                      />
                    </div>

                    <div className="h-12 sm:h-[84px] rounded-full border border-white/15 bg-[#161616] px-4 sm:px-6 flex items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-1 sm:gap-3 pr-3 sm:pr-4 border-r border-white/15">
                        <span className="text-xl sm:text-4xl">🇮🇳</span>
                        <ChevronDown className="h-4 w-4 sm:h-6 sm:w-6 text-white/45" />
                      </div>
                      <span className="text-base sm:text-4xl text-white/90">+91</span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter mobile number"
                        className="min-w-0 flex-1 bg-transparent text-base sm:text-4xl placeholder:text-white/40 outline-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAuthStep("options")}
                        className="h-12 w-12 sm:h-[84px] sm:w-[84px] shrink-0 rounded-full bg-[#1B1B1B] border border-white/5 text-white flex items-center justify-center"
                        aria-label="Go back"
                      >
                        <ArrowLeft className="h-5 w-5 sm:h-9 sm:w-9" />
                      </button>
                      <button
                        type="submit"
                        className="h-12 sm:h-[84px] flex-1 rounded-full bg-white text-[#151515] text-xl sm:text-5xl font-semibold tracking-tight flex items-center justify-center gap-2 sm:gap-4"
                      >
                        Get code <ArrowRight className="h-5 w-5 sm:h-9 sm:w-9" />
                      </button>
                    </div>
                  </form>

                  {footerLinks}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

