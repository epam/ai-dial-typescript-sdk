export interface Schema {
  $ref?: string;
  type?: string | string[];
  title?: string;
  description?: string;
  format?: string;
  nullable?: boolean;
  deprecated?: boolean;
  enum?: unknown[];
  default?: unknown;
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  'x-typescript-required'?: string[];
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  additionalProperties?: boolean | Schema;
}
export interface MediaSchema {
  mediaType: string;
  schema: Schema;
}
export interface ApiMethod {
  name: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  endpoint: string;
  httpMethod: string;
  deprecated: boolean;
  sourceLine: number;
  signature: string;
  returnType: string;
  arguments: { name: string; required: boolean; type: string }[];
  parameters: {
    name: string;
    location: string;
    required: boolean;
    description: string;
    schema: Schema;
    example?: unknown;
  }[];
  requestBody: {
    required: boolean;
    description: string;
    content: MediaSchema[];
  } | null;
  responses: {
    status: string;
    description: string;
    content: MediaSchema[];
    headers: { name: string; description: string; schema: Schema }[];
  }[];
}
export interface ApiReferenceData {
  packageName: string;
  version: string;
  license: string;
  methodCount: number;
  categories: string[];
  methods: ApiMethod[];
  schemas: Record<string, Schema>;
  sdkTypes: Record<string, string>;
  sdkOptions: string;
  sourceHash: string;
}
