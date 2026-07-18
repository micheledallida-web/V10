'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type EditorContextValue = {
  projectId: string;
  generatedHtml: string;
  generatedCode: string;
  isStreaming: boolean;
  activeSelection: string | null;
  setGeneratedHtml: (value: string) => void;
  setGeneratedCode: (value: string) => void;
  setIsStreaming: (value: boolean) => void;
  setActiveSelection: (value: string | null) => void;
};

const defaultHtml = `
  <main style="font-family: Arial, sans-serif; min-height: 100vh; display: grid; place-items: center; background: #020617; color: #e2e8f0;">
    <section style="max-width: 560px; padding: 32px; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; background: rgba(15,23,42,0.9);">
      <p style="letter-spacing: 0.3em; font-size: 12px; text-transform: uppercase; color: #7dd3fc;">Editor Preview</p>
      <h1 style="font-size: 40px; margin-top: 12px;">Project scaffold is ready.</h1>
      <p style="margin-top: 12px; color: #cbd5e1;">Generated markup streamed through the editor context will appear here.</p>
    </section>
  </main>
`;

const defaultCode = `<section className=\"hero\">\n  <h1>Project scaffold is ready.</h1>\n  <p>Generated code will be streamed into the editor context.</p>\n</section>`;

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorContextProvider({ children, projectId }: { children: React.ReactNode; projectId: string }) {
  const [generatedHtml, setGeneratedHtml] = useState(defaultHtml);
  const [generatedCode, setGeneratedCode] = useState(defaultCode);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      projectId,
      generatedHtml,
      generatedCode,
      isStreaming,
      activeSelection,
      setGeneratedHtml,
      setGeneratedCode,
      setIsStreaming,
      setActiveSelection,
    }),
    [activeSelection, generatedCode, generatedHtml, isStreaming, projectId],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditorContext must be used inside EditorContextProvider');
  }

  return context;
}
