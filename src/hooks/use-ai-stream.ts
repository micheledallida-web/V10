'use client';

import { useCallback, useRef, useState } from 'react';

type StreamOptions<TPayload> = {
  endpoint: string;
  payload: TPayload;
  onChunk?: (chunk: string) => void;
  onComplete?: (fullText: string) => void;
};

export function useAiStream() {
  const controllerRef = useRef<AbortController | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const start = useCallback(async <TPayload,>({ endpoint, payload, onChunk, onComplete }: StreamOptions<TPayload>) => {
    stop();
    const controller = new AbortController();
    controllerRef.current = controller;
    setError(null);
    setOutput('');
    setIsStreaming(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Stream endpoint did not return a readable response.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setOutput(fullText);
        onChunk?.(chunk);
      }

      onComplete?.(fullText);
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unknown streaming error';
      setError(message);
    } finally {
      controllerRef.current = null;
      setIsStreaming(false);
    }
  }, [stop]);

  return { start, stop, output, error, isStreaming };
}
