// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickStart.Ai | Build Full-Stack Apps in Minutes",
  description: "Autonomous web & mobile system builder using natural language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#090909] text-white antialiased font-sans selection:bg-[#8EF08A] selection:text-black min-h-screen relative overflow-x-hidden">
        
        {/* The clean canvas injector */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
