import { EditorWorkspace } from '@/components/editor/editor-workspace';
import { EditorContextProvider } from '@/context/editor-context';

export default async function ProjectEditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <EditorContextProvider projectId={projectId}>
      <EditorWorkspace projectId={projectId} />
    </EditorContextProvider>
  );
}
