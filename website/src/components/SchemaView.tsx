import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import type { Schema } from '../data/reference-types';

export function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown skipHtml>{children}</ReactMarkdown>
    </div>
  );
}

export function schemaName(schema: Schema): string {
  if (schema.$ref) return schema.$ref.split('/').at(-1) ?? schema.$ref;
  if (schema.enum) return schema.enum.map((v) => JSON.stringify(v)).join(' | ');
  if (schema.oneOf || schema.anyOf)
    return (schema.oneOf ?? schema.anyOf ?? []).map(schemaName).join(' | ');
  if (schema.allOf) return schema.allOf.map(schemaName).join(' & ');
  if (schema.type === 'array') return `${schemaName(schema.items ?? {})}[]`;
  return `${Array.isArray(schema.type) ? schema.type.join(' | ') : (schema.type ?? (schema.properties ? 'object' : 'unknown'))}${schema.nullable ? ' | null' : ''}${schema.format ? ` (${schema.format})` : ''}`;
}

function resolved(
  schema: Schema,
  schemas: Record<string, Schema>,
  seen = new Set<string>(),
): Schema {
  if (!schema.$ref) return schema;
  if (seen.has(schema.$ref)) return schema;
  const name = schema.$ref.split('/').at(-1) ?? '';
  return {
    ...resolved(schemas[name] ?? {}, schemas, new Set([...seen, schema.$ref])),
    ...Object.fromEntries(
      Object.entries(schema).filter(([key]) => key !== '$ref'),
    ),
  };
}

export function SchemaView({
  schema,
  schemas,
  level = 0,
  seen = [],
}: {
  schema: Schema;
  schemas: Record<string, Schema>;
  level?: number;
  seen?: string[];
}) {
  const [open, setOpen] = useState(false);
  const value = resolved(schema, schemas);
  const recursive = schema.$ref && seen.includes(schema.$ref);
  const nextSeen = schema.$ref ? [...seen, schema.$ref] : seen;
  const fields = Object.entries(value.properties ?? {});
  const variants = value.oneOf ?? value.anyOf ?? value.allOf ?? [];
  const canExpand =
    fields.length > 0 ||
    !!value.items ||
    variants.length > 0 ||
    typeof value.additionalProperties === 'object';
  if (recursive || level > 5)
    return (
      <p className="schema-recursion">
        <code>{schemaName(schema)}</code> · Nested schema; see raw definition
        below.
      </p>
    );
  if (!canExpand)
    return (
      <div className="schema-scalar">
        <code>{schemaName(schema)}</code>
        {value.description && <Markdown>{value.description}</Markdown>}
        {value.default !== undefined && (
          <p>
            Default: <code>{JSON.stringify(value.default)}</code>
          </p>
        )}
      </div>
    );
  return (
    <details
      className="schema-details"
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        <code>{schemaName(schema)}</code>
        <span>
          {fields.length ? `${fields.length} fields` : 'Expand schema'}
        </span>
      </summary>
      {open && (
        <div className="schema-content">
          {value.description && <Markdown>{value.description}</Markdown>}
          {fields.map(([name, field]) => {
            const required = (
              value['x-typescript-required'] ??
              value.required ??
              []
            ).includes(name);
            return (
              <div className="schema-field" key={name}>
                <div className="field-heading">
                  <code>{name}</code>
                  {required && <span className="required">required</span>}
                  {field.deprecated && (
                    <span className="deprecated">deprecated</span>
                  )}
                </div>
                <SchemaView
                  schema={field}
                  schemas={schemas}
                  level={level + 1}
                  seen={nextSeen}
                />
              </div>
            );
          })}
          {value.items && (
            <div className="schema-field">
              <strong>Array item</strong>
              <SchemaView
                schema={value.items}
                schemas={schemas}
                level={level + 1}
                seen={nextSeen}
              />
            </div>
          )}
          {variants.map((variant, index) => (
            <div className="schema-field" key={index}>
              <strong>
                {value.allOf ? 'Combined schema' : 'Alternative'} {index + 1}
              </strong>
              <SchemaView
                schema={variant}
                schemas={schemas}
                level={level + 1}
                seen={nextSeen}
              />
            </div>
          ))}
          {typeof value.additionalProperties === 'object' && (
            <div className="schema-field">
              <strong>Additional properties</strong>
              <SchemaView
                schema={value.additionalProperties}
                schemas={schemas}
                level={level + 1}
                seen={nextSeen}
              />
            </div>
          )}
          {value.additionalProperties === true && (
            <p>Additional properties are allowed.</p>
          )}
        </div>
      )}
    </details>
  );
}
