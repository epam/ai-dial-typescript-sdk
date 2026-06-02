import type { components, operations } from './schema';

type SuccessStatus = 200 | 201 | 202 | 204;

type UnknownIfNever<T> = [T] extends [never] ? unknown : T;

type JsonContent<T> = T extends { content: infer TContent }
  ? TContent extends { 'application/json': infer TJson }
    ? TJson
    : unknown
  : undefined;

type OperationResponses<TOperation> = TOperation extends {
  responses: infer TResponses;
}
  ? TResponses
  : never;

type OperationSuccessData<TOperation> = UnknownIfNever<
  JsonContent<
    OperationResponses<TOperation>[Extract<
      keyof OperationResponses<TOperation>,
      SuccessStatus
    >]
  >
>;

type OperationErrorData<TOperation> = UnknownIfNever<
  JsonContent<
    OperationResponses<TOperation>[Exclude<
      keyof OperationResponses<TOperation>,
      SuccessStatus
    >]
  >
>;

type OperationBody<TOperation> = TOperation extends {
  requestBody: { content: infer TContent };
}
  ? TContent extends { 'application/json': infer TBody }
    ? TBody
    : unknown
  : never;

type OperationParameterLocation<
  TOperation,
  TLocation extends 'query' | 'header' | 'cookie',
> = TOperation extends {
  parameters: infer TParameters;
}
  ? TParameters extends { [__K in TLocation]?: infer TValue }
    ? TValue
    : TParameters extends { [__K in TLocation]: infer TValue }
      ? TValue
      : never
  : never;

type OperationParams<TOperation> = {
  query?: OperationParameterLocation<TOperation, 'query'>;
  header?: OperationParameterLocation<TOperation, 'header'>;
  cookie?: OperationParameterLocation<TOperation, 'cookie'>;
};

type EmptyObject = Record<string, never>;

type SDKOperationParams<TOperation> =
  OperationParams<TOperation> extends EmptyObject
    ? { params?: never }
    : { params?: OperationParams<TOperation> };

type SDKOperationBody<TOperation> =
  OperationBody<TOperation> extends never
    ? { body?: never }
    : TOperation extends { requestBody: unknown }
      ? { body: OperationBody<TOperation> }
      : { body?: OperationBody<TOperation> };

export type SDKResponse<TData, TError = unknown> =
  | {
      data: TData;
      error?: never;
      response: Response;
    }
  | {
      data?: never;
      error: TError;
      response: Response;
    };

export type SDKHeaders =
  | Record<
      string,
      | string
      | number
      | boolean
      | (string | number | boolean)[]
      | null
      | undefined
    >
  | [string, string][];

export interface SDKRequestInit<TBody = unknown> {
  body?: TBody;
  headers?: SDKHeaders;
  params?: {
    query?: Record<string, unknown>;
    header?: Record<string, unknown>;
    path?: Record<string, unknown>;
    cookie?: Record<string, unknown>;
  };
  parseAs?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'stream';
  [key: string]: unknown;
}

export type SDKOperationInit<TOperation> = Omit<
  SDKRequestInit,
  'body' | 'params'
> &
  SDKOperationParams<TOperation> &
  SDKOperationBody<TOperation>;

export type SDKOperationResponse<TOperation> = SDKResponse<
  OperationSuccessData<TOperation>,
  OperationErrorData<TOperation>
>;

export type SDKOperationId = keyof operations;

export interface ConversationModelId {
  /** Application/model unique identifier. */
  id: string;
  [key: string]: unknown;
}

export interface ConversationMessageSettings {
  prompt: string;
  temperature: number;
  [key: string]: unknown;
}

export interface ConversationMessage {
  role: string;
  content: string;
  model?: ConversationModelId;
  settings?: ConversationMessageSettings;
  [key: string]: unknown;
}

export interface Conversation {
  /** Conversation unique identifier. */
  id: string;
  /** Path to the folder where conversation is located according to the user's root. */
  folderId: string;
  /** Display name. */
  name: string;
  /** System prompt. */
  prompt: string;
  temperature: number;
  lastActivityDate?: number;
  model: ConversationModelId;
  messages: ConversationMessage[];
  customViewState?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ConversationResource {
  name?: string;
  author?: string;
  parentPath?: string;
  bucket?: string;
  url?: string;
  nodeType?: string;
  resourceType?: 'CONVERSATION' | string;
  etag?: string;
  createdAt?: number;
  updatedAt?: number;
  permissions?: string[];
  [key: string]: unknown;
}

export type DeploymentData = components['schemas']['DeploymentBase'] &
  components['schemas']['DeploymentWithFeatures'];

export type ModelCapabilities = components['schemas']['ModelCapabilities'];

export type ModelLimits = components['schemas']['ModelLimits'];

export type ModelPricing = components['schemas']['ModelPricing'];

export type ModelData = components['schemas']['ModelOpenAi'];

export interface ModelListData {
  /** An array of models. */
  data?: ModelData[];
  [key: string]: unknown;
}
