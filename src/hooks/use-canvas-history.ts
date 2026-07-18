'use client';

import { useCallback, useMemo, useState } from 'react';

type HistoryState = {
  past: string[];
  present: string;
  future: string[];
};

export function useCanvasHistory(initialValue: string) {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialValue,
    future: [],
  });

  const push = useCallback((nextValue: string) => {
    setHistory((current) => {
      if (current.present === nextValue) {
        return current;
      }

      return {
        past: [...current.past, current.present],
        present: nextValue,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((current) => {
      const previous = current.past.at(-1);
      if (!previous) {
        return current;
      }

      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((current) => {
      const next = current.future[0];
      if (!next) {
        return current;
      }

      return {
        past: [...current.past, current.present],
        present: next,
        future: current.future.slice(1),
      };
    });
  }, []);

  const reset = useCallback((nextValue: string) => {
    setHistory({ past: [], present: nextValue, future: [] });
  }, []);

  return useMemo(
    () => ({
      value: history.present,
      canUndo: history.past.length > 0,
      canRedo: history.future.length > 0,
      push,
      undo,
      redo,
      reset,
    }),
    [history.future.length, history.past.length, history.present, push, redo, reset, undo],
  );
}
