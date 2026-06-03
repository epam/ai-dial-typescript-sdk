# ai-dial-typescript-sdk

A type-safe TypeScript SDK for the [DIAL Core API](https://dialx.ai/dial_api), built on top of [openapi-fetch](https://openapi-ts.dev/openapi-fetch/). It provides a unified, fully-typed interface for calling chat/completion and embedding models, and for managing files, conversations, prompts, and other DIAL resources.

## Installation

```bash
npm install @epam/ai-dial-typescript-sdk
```

## Quick Start

```typescript
import { createSDK } from '@epam/ai-dial-typescript-sdk';

const sdk = createSDK({
  baseUrl: 'https://your-dial-instance.example.com',
  apiKey: 'your-api-key',
});

// Send a chat completion request
const response = await sdk.sendChatCompletionRequest('gpt-4o', {
  body: {
    messages: [{ role: 'user', content: 'Hello!' }],
  },
});

// Send an embeddings request
const embeddings = await sdk.sendEmbeddingsRequest('text-embedding-ada-002', {
  body: { input: 'Hello world' },
});
```

## Configuration

`createSDK(options: SDKOptions)` accepts the following options:

| Option    | Type                     | Description                                                     |
| --------- | ------------------------ | --------------------------------------------------------------- |
| `baseUrl` | `string`                 | **Required.** Base URL of the DIAL Core API.                    |
| `apiKey`  | `string`                 | API key — sent as the `Api-Key` header.                         |
| `token`   | `string`                 | JWT bearer token — sent as `Authorization: Bearer <token>`.     |
| `headers` | `Record<string, string>` | Additional custom headers merged into every request.            |
| `fetch`   | `typeof fetch`           | Custom fetch implementation (e.g. for Node.js < 18 or testing). |

Only one of `apiKey` or `token` is typically needed.

## API Reference

### Chat & Embeddings

```typescript
sdk.sendChatCompletionRequest(deployment_name, init?)
sdk.sendEmbeddingsRequest(deployment_name, init?)
```

### Deployments & Models

```typescript
sdk.getDeployments(init?)
sdk.getDeploymentsByInterfaceType(init?)
sdk.getDeployment(deployment_name, init?)
sdk.getDeploymentLimits(deployment_name, init?)
sdk.configurationDeployment(deployment_name, init?)
sdk.rateDeployment(deployment_name, init?)
sdk.getModels(init?)
sdk.getModel(model_name, init?)
```

### Files

```typescript
sdk.uploadFile(bucket, file_path, init?)
sdk.downloadFile(bucket, file_path, init?)
sdk.deleteFile(bucket, file_path, init?)
sdk.getFileMetadata(bucket, path, init?)
sdk.transferInputFile(init?)
sdk.transferOutputFile(init?)
```

### Conversations

```typescript
sdk.getConversation(bucket, conversation_path, init?)
sdk.saveConversation(bucket, conversation_path, init?)
sdk.deleteConversation(bucket, conversation_path, init?)
sdk.getConversationMetadata(bucket, path, init?)
```

### Prompts

```typescript
sdk.getPrompt(bucket, prompt_path, init?)
sdk.savePrompt(bucket, prompt_path, init?)
sdk.deletePrompt(bucket, prompt_path, init?)
sdk.getPromptMetadata(bucket, path, init?)
```

### Custom Applications

```typescript
sdk.getApplications(init?)
sdk.getApplication(application_name, init?)
sdk.deployApplication(init?)
sdk.undeployApplication(init?)
sdk.redeployApplication(init?)
sdk.getApplicationLogs(init?)
sdk.getApplicationMetadata(bucket, path, init?)
sdk.getCustomApplication(bucket, application_path, init?)
sdk.saveCustomApplication(bucket, application_path, init?)
sdk.deleteCustomApplication(bucket, application_path, init?)
sdk.getCustomApplicationSchema(init?)
sdk.listCustomApplicationSchemas(init?)
sdk.getMetaSchemaOfCustomApplicationSchema(init?)
```

### Tool Sets (MCP)

```typescript
sdk.getToolSets(init?)
sdk.getToolset(toolset_name, init?)
sdk.getCustomToolSet(bucket, toolset_path, init?)
sdk.saveToolSet(bucket, toolset_path, init?)
sdk.deleteToolSet(bucket, toolset_path, init?)
sdk.getToolSetMetadata(bucket, path, init?)
sdk.callToolSet(toolset_name, init?)
sdk.toolsetSignin(init?)
sdk.toolSetSignout(init?)
```

### Code Interpreter

```typescript
sdk.uploadFileToCodeInterpreter(init?)
sdk.downloadFileFromCodeInterpreter(init?)
sdk.listFilesFromCodeInterpreter(init?)
sdk.executeCode(init?)
```

### Resource Sharing

```typescript
sdk.copyResource(init?)
sdk.moveResource(init?)
sdk.deleteResource(init?)       // via deleteFile/deleteConversation/deletePrompt
sdk.shareResource(init?)
sdk.getSharedResources(init?)
sdk.copySharedResources(init?)
sdk.discardSharedResources(init?)
sdk.revokeSharedResources(init?)
sdk.subscribeToResources(init?)
```

### Publications

```typescript
sdk.createPublication(init?)
sdk.getPublication(init?)
sdk.getPublications(init?)
sdk.getPublicationRules(init?)
sdk.updatePublication(init?)
sdk.approvePublication(init?)
sdk.rejectPublication(init?)
sdk.deletePublication(init?)
```

### Sessions & User

```typescript
sdk.openSession(init?)
sdk.closeSession(init?)
sdk.getSession(init?)
sdk.getUserInfo(init?)
sdk.getUserBucket(init?)
```

### Permissions & Consent

```typescript
sdk.getPerRequestPermissions(init?)
sdk.grantPerRequestPermissions(init?)
sdk.revokePerRequestPermissions(init?)
sdk.requestUserConsent(deployment_id, init?)
sdk.acceptUserConsent(deployment_id, init?)
```

### Invitations & Notifications

```typescript
sdk.getInvitations(init?)
sdk.getInvitation(invitation_id, init?)
sdk.deleteInvitation(invitation_id, init?)
sdk.getNotifications(init?)
sdk.deleteNotifications(init?)
```

### Other

```typescript
sdk.reloadConfig(init?)
```

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
```

### Scripts

| Command          | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| `npm run gen`    | Bundle the OpenAPI spec and regenerate TypeScript types and SDK client |
| `npm run build`  | Generate types and compile to CJS + ESM with type definitions          |
| `npm run dev`    | Watch mode build                                                       |
| `npm run lint`   | Run ESLint                                                             |
| `npm run format` | Run Prettier                                                           |

### Code Generation

The SDK client and types are auto-generated from `openapi.yaml`. After modifying the spec, run:

```bash
npm run gen
```

This will:

1. Bundle `openapi.yaml` into `openapi.bundle.yaml` via Redocly CLI
2. Generate TypeScript types (`src/schema.ts`) via `openapi-typescript`
3. Generate the SDK client (`src/client.ts`) and path helpers (`src/api-paths.ts`)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All PRs must follow [Conventional Commits](https://www.conventionalcommits.org/).

## License

Apache 2.0 — see [LICENSE](LICENSE).
