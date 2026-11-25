// These examples are type-checked against the public SDK by tests/docs/examples.ts.
export const setup = `import { createSDK } from '@epam/ai-dial-typescript-sdk';

const sdk = createSDK({
  baseUrl: process.env.DIAL_URL!,
  apiKey: process.env.DIAL_API_KEY!,
});`;

export const snippets = {
  Chat: `const result = await sdk.sendChatCompletionRequest(
  'your-chat-deployment',
  {
    params: { query: { 'api-version': apiVersion } },
    body: {
      messages: [{ role: 'user', content: 'Hello, DIAL.' }],
      stream: false, temperature: 0.7,
      top_p: 1, n: 1, max_tokens: 256,
      max_prompt_tokens: 4096,
      presence_penalty: 0, frequency_penalty: 0,
      logit_bias: null,
    },
  },
);

if (result.error !== undefined || !result.data) {
  throw new Error(\`HTTP \${result.response.status}\`);
}
console.info(result.data.choices?.[0]?.message.content);`,
  Embeddings: `const result = await sdk.createEmbedding(
  'your-embedding-deployment',
  {
    params: { query: { 'api-version': apiVersion } },
    body: {
      input: ['TypeScript SDK', 'DIAL Core'],
      encoding_format: 'float',
    },
  },
);

if (result.error !== undefined || !result.data) {
  throw new Error(\`HTTP \${result.response.status}\`);
}
const vector = result.data.data[0]?.embedding;
if (Array.isArray(vector)) console.info(vector.length);`,
  Resources: `const result = await sdk.getUserBucket();
const bucket = result.data?.bucket;
if (!bucket) throw new Error('Bucket unavailable');

const saved = await sdk.savePrompt(bucket, 'demo/summary', {
  params: { header: { 'If-None-Match': '*' } },
  body: {
    name: 'Summary',
    content: 'Summarize the text in three bullet points.',
  },
});

if (!saved.response.ok) {
  throw new Error(\`Save failed: \${saved.response.status}\`);
}`,
};

export const discover = `const { data, error, response } =
  await sdk.getDeployments();

if (!response.ok) {
  console.error(response.status, error);
} else {
  console.info(data);
}`;

export const analyticsSetup = `import { createAnalyticsSDK } from '@epam/ai-dial-typescript-sdk';

const analytics = createAnalyticsSDK({
  baseUrl: process.env.DIAL_ANALYTICS_URL!,
  token: process.env.DIAL_TOKEN!,
});`;

export const analyticsSnippets = {
  Query: `const result = await analytics.executeSql({
  body: {
    sql:
      'SELECT deployment, count(*) AS n ' +
      'FROM dial_usage_log GROUP BY deployment',
  },
});

if (result.error !== undefined || !result.data) {
  throw new Error(\`HTTP \${result.response.status}\`);
}
console.info(result.data.rows);`,
  Csv: `const csv = await analytics.executeSqlCsv({
  body: { sql: 'SELECT deployment FROM dial_usage_log LIMIT 10' },
});

if (!csv.response.ok) {
  throw new Error(\`HTTP \${csv.response.status}\`);
}
console.info(csv.data); // the CSV text`,
};

export const customFetch = `const sdk = createSDK({
  baseUrl: 'https://dial.example.test',
  fetch: async () => new Response(
    JSON.stringify({ bucket: 'demo' }),
    { headers: { 'Content-Type': 'application/json' } },
  ),
});

const { data } = await sdk.getUserBucket();
console.info(data?.bucket); // "demo"`;
