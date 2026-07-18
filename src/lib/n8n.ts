export type N8nWebhookPayload = {
  projectId: string;
  prompt: string;
  metadata?: Record<string, unknown>;
};

export type N8nWebhookResponse = {
  executionId?: string;
  message?: string;
};

export async function invokeN8nWebhook(payload: N8nWebhookPayload): Promise<N8nWebhookResponse> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('Missing N8N_WEBHOOK_URL environment variable.');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`n8n webhook failed with status ${response.status}`);
  }

  return (await response.json()) as N8nWebhookResponse;
}
