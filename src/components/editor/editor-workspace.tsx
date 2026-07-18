'use client';

import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@/components/editor/canvas';
import { PanelAi } from '@/components/editor/panel-ai';
import { PanelInspector } from '@/components/editor/panel-inspector';
import { Topbar } from '@/components/editor/topbar';
import { useEditorContext } from '@/context/editor-context';
import { useCanvasHistory } from '@/hooks/use-canvas-history';
import { triggerVercelDeploy } from '@/lib/vercel';

export function EditorWorkspace({ projectId }: { projectId: string }) {
  const { generatedHtml, isStreaming, setGeneratedHtml, activeSelection, setActiveSelection } = useEditorContext();
  const history = useCanvasHistory(generatedHtml);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState('Preview deploy is idle.');

  useEffect(() => {
    if (generatedHtml !== history.value) {
      history.push(generatedHtml);
    }
  }, [generatedHtml, history]);

  useEffect(() => {
    setGeneratedHtml(history.value);
  }, [history.value, setGeneratedHtml]);

  const statusMessage = useMemo(() => {
    if (isStreaming) {
      return 'Streaming AI output into editor state.';
    }

    return deployStatus;
  }, [deployStatus, isStreaming]);

  const handleDeploy = async () => {
    const deployRequest = {
      projectId,
      meta: { sourceProjectId: projectId },
      token: 'server-side-token-required',
    };

    if (deployRequest.token === 'server-side-token-required') {
      setDeployStatus('TODO: move deploy action behind a secure server-side Vercel token flow.');
      return;
    }

    setIsDeploying(true);
    setDeployStatus('Creating preview deployment...');

    try {
      // TODO: replace client-side invocation with a server action or API route that holds the Vercel token securely.
      const response = await triggerVercelDeploy(deployRequest);
      setDeployStatus(response.url ? `Deployment queued at ${response.url}` : `Deployment ${response.id} created.`);
    } catch (error) {
      setDeployStatus(error instanceof Error ? error.message : 'Unknown deployment error');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <section className="space-y-4 px-6 py-8 lg:px-10">
      <Topbar canRedo={history.canRedo} canUndo={history.canUndo} isDeploying={isDeploying} onDeploy={handleDeploy} onRedo={history.redo} onUndo={history.undo} statusMessage={statusMessage} />
      <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
        <PanelAi />
        <Canvas html={history.value} onSelect={setActiveSelection} />
        <PanelInspector activeSelection={activeSelection} />
      </div>
    </section>
  );
}
