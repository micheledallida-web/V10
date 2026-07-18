export type VercelDeployRequest = {
  projectId: string;
  teamId?: string;
  token: string;
  branch?: string;
  meta?: Record<string, string>;
};

export type VercelDeployResponse = {
  id: string;
  url?: string;
  readyState?: string;
};

export async function triggerVercelDeploy({
  projectId,
  teamId,
  token,
  branch = 'main',
  meta,
}: VercelDeployRequest): Promise<VercelDeployResponse> {
  const params = new URLSearchParams();
  if (teamId) {
    params.set('teamId', teamId);
  }

  const query = params.toString();

  const response = await fetch(`https://api.vercel.com/v13/deployments${query ? `?${query}` : ''}`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectId,
        target: 'preview',
        gitSource: {
          type: 'github',
          repoId: projectId,
          ref: branch,
        },
        meta,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Vercel deploy failed with status ${response.status}`);
  }

  return (await response.json()) as VercelDeployResponse;
}
