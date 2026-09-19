import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { CodeBlock } from '../components/CodeBlock';
import { REPOSITORY } from '../components/Layout';
import { Markdown, schemaName, SchemaView } from '../components/SchemaView';
import rawReference from '../data/api-reference.json';
import type { ApiMethod, ApiReferenceData } from '../data/reference-types';

const reference = rawReference as unknown as ApiReferenceData;
const PAGE_SIZE = 20;
const verbs = [...new Set(reference.methods.map((m) => m.httpMethod))].sort();

function HttpBadge({ verb }: { verb: string }) {
  return (
    <span className={`http-badge http-${verb.toLowerCase()}`}>{verb}</span>
  );
}

function MethodDetail({ method }: { method: ApiMethod }) {
  const specialTypes =
    method.name === 'saveConversation'
      ? [
          'Conversation',
          'ConversationMessage',
          'ConversationModelId',
          'ConversationResource',
        ]
      : method.name === 'getConversation'
        ? ['Conversation', 'ConversationMessage', 'ConversationModelId']
        : [];
  return (
    <article className="method-detail">
      <Link
        className="back-link"
        to={`/api?category=${encodeURIComponent(method.category)}`}
      >
        <ArrowLeft size={16} />
        {method.category}
      </Link>
      <div className="method-title">
        <h1>{method.name}</h1>
        {method.deprecated && <span className="deprecated">Deprecated</span>}
      </div>
      <p className="method-summary">{method.summary}</p>
      <div className="endpoint">
        <HttpBadge verb={method.httpMethod} />
        <code>{method.endpoint}</code>
      </div>
      {method.description && <Markdown>{method.description}</Markdown>}
      <div className="method-source">
        <span>{method.category}</span>
        <a href={`${REPOSITORY}/blob/HEAD/src/client.ts#L${method.sourceLine}`}>
          View SDK source <ArrowUpRight size={14} />
        </a>
      </div>
      <section>
        <h2>SDK signature</h2>
        <CodeBlock
          code={`${method.signature}\n  => ${method.returnType}`}
          label="TypeScript signature"
        />
        <p className="annotation">
          Path arguments are positional. Query and header parameters belong in{' '}
          <code>init.params</code>; payloads belong in <code>init.body</code>.
        </p>
        <div className="parameter-list">
          {method.arguments.map((arg) => (
            <div className="parameter" key={arg.name}>
              <div className="field-heading">
                <code>{arg.name}</code>
                <span className={arg.required ? 'required' : 'optional'}>
                  {arg.required ? 'required' : 'optional'}
                </span>
              </div>
              <code className="type-expression">{arg.type}</code>
            </div>
          ))}
        </div>
      </section>
      {method.parameters.length > 0 && (
        <section>
          <h2>Request parameters</h2>
          <p className="annotation">
            Required badges below reflect the API contract. The SDK currently
            makes <code>params</code> optional even when the API requires a
            query or header.
          </p>
          <div className="parameter-list">
            {method.parameters.map((p) => (
              <div className="parameter" key={`${p.location}-${p.name}`}>
                <div className="field-heading">
                  <code>{p.name}</code>
                  <span className="location-label">{p.location}</span>
                  <span className={p.required ? 'required' : 'optional'}>
                    {p.required ? 'required' : 'optional'}
                  </span>
                </div>
                <code className="type-expression">{schemaName(p.schema)}</code>
                {p.description && <Markdown>{p.description}</Markdown>}
                {p.example !== undefined && (
                  <p className="annotation">
                    Example: <code>{JSON.stringify(p.example)}</code>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      <section>
        <h2>Request body</h2>
        {method.requestBody ? (
          <>
            <p>
              {method.requestBody.required ? 'Required' : 'Optional'} request
              body.
            </p>
            {method.requestBody.description && (
              <Markdown>{method.requestBody.description}</Markdown>
            )}
            {method.requestBody.content.map((media) => (
              <div className="media-schema" key={media.mediaType}>
                <h3>{media.mediaType}</h3>
                <SchemaView schema={media.schema} schemas={reference.schemas} />
              </div>
            ))}
            <p className="annotation">
              Field requirements use generated TypeScript where available.
              Non-JSON bodies may have broader SDK types and need a custom
              serializer.
            </p>
          </>
        ) : (
          <p>This operation does not define a request body.</p>
        )}
      </section>
      {specialTypes.length > 0 && (
        <section>
          <h2>SDK-specific conversation types</h2>
          <p>
            The SDK explicitly overrides the OpenAPI conversation type for this
            method. These public TypeScript definitions are the signature’s
            source of truth.
          </p>
          {specialTypes
            .filter((name) => reference.sdkTypes[name])
            .map((name) => (
              <CodeBlock
                code={reference.sdkTypes[name]}
                key={name}
                label={name}
              />
            ))}
        </section>
      )}
      <section>
        <h2>Responses</h2>
        <p className="annotation">
          SDK results include <code>data</code> or <code>error</code> and the
          original <code>Response</code>. Raw streams and binary payloads
          require an appropriate <code>parseAs</code>; the current SDK return
          type does not follow that option.
        </p>
        <div className="response-list">
          {method.responses.map((response) => (
            <details key={response.status} className="response-item">
              <summary>
                <span
                  className={
                    response.status.startsWith('2')
                      ? 'response-success'
                      : 'response-status'
                  }
                >
                  {response.status}
                </span>
                <span>{response.description || 'Response'}</span>
                <ChevronRight size={16} />
              </summary>
              <div className="response-content">
                {response.content.length === 0 ? (
                  <p>No response body is specified.</p>
                ) : (
                  response.content.map((media) => (
                    <div className="media-schema" key={media.mediaType}>
                      <h3>{media.mediaType}</h3>
                      <SchemaView
                        schema={media.schema}
                        schemas={reference.schemas}
                      />
                    </div>
                  ))
                )}
                {response.headers.length > 0 && (
                  <>
                    <h3>Response headers</h3>
                    {response.headers.map((header) => (
                      <div className="parameter" key={header.name}>
                        <code>{header.name}</code>
                        {header.description && (
                          <Markdown>{header.description}</Markdown>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
      <details className="raw-definition">
        <summary>Raw operation and referenced schemas</summary>
        <CodeBlock
          label="JSON · reference definitions"
          code={JSON.stringify(
            { method, schemas: collectSchemas(method) },
            null,
            2,
          )}
        />
      </details>
      <aside className="docs-note">
        Descriptions and schemas come from the repository’s OpenAPI contract.
        Exact signatures come from <code>DIAL_SDK</code>. Availability depends
        on your DIAL instance and permissions.
      </aside>
    </article>
  );
}

function collectSchemas(method: ApiMethod) {
  const names = new Set<string>();
  function visit(value: unknown) {
    if (!value || typeof value !== 'object') return;
    if ('$ref' in value && typeof value.$ref === 'string') {
      const name = value.$ref.split('/').at(-1)!;
      if (!names.has(name) && reference.schemas[name]) {
        names.add(name);
        visit(reference.schemas[name]);
      }
    }
    Object.values(value).forEach(visit);
  }
  visit(method);
  return Object.fromEntries(
    [...names].sort().map((name) => [name, reference.schemas[name]]),
  );
}

export default function ApiReference() {
  const { methodName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';
  const verb = searchParams.get('http') ?? '';
  const searchInput = useRef<HTMLInputElement>(null);
  const resultsHeading = useRef<HTMLDivElement>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(
    () => window.matchMedia('(min-width: 60rem)').matches,
  );
  const filtered = useMemo(
    () =>
      reference.methods.filter(
        (method) =>
          (!category || method.category === category) &&
          (!verb || method.httpMethod === verb) &&
          `${method.name} ${method.title} ${method.summary} ${method.description} ${method.endpoint} ${method.tags.join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [query, category, verb],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageNumber = Math.min(
    pages,
    Math.max(1, Math.floor(Number(searchParams.get('page')) || 1)),
  );
  const method = reference.methods.find((m) => m.name === methodName);
  const counts = useMemo(
    () =>
      Object.fromEntries(
        reference.categories.map((name) => [
          name,
          reference.methods.filter((m) => m.category === name).length,
        ]),
      ),
    [],
  );
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 60rem)');
    const update = () => setCategoriesOpen(desktop.matches);
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.title = `${method ? `${method.name} — ` : ''}API reference — DIAL SDK`;
  }, [method]);
  function update(key: string, value: string) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.delete('page');
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: key === 'q' },
    );
  }
  function goToPage(page: number) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set('page', String(page));
      return next;
    });
    requestAnimationFrame(() => {
      resultsHeading.current?.focus({ preventScroll: true });
      resultsHeading.current?.scrollIntoView({ behavior: 'instant' });
    });
  }
  return (
    <div className="container reference-page">
      <div className="reference-top">
        <Link to="/api" className="reference-wordmark">
          API reference
        </Link>
        <span>
          v{reference.version}{' '}
          <span className="subtle">/ {reference.methodCount} methods</span>
        </span>
      </div>
      <div className="reference-layout">
        <aside className="reference-sidebar">
          <Link to="/getting-started" className="sidebar-guide">
            Getting started <ArrowUpRight size={15} />
          </Link>
          <details
            className="category-disclosure"
            open={categoriesOpen}
            onToggle={(event) => setCategoriesOpen(event.currentTarget.open)}
          >
            <summary>Browse categories</summary>
            <nav aria-label="API categories">
              <Link
                className={
                  !category && !methodName
                    ? 'category-link active'
                    : 'category-link'
                }
                to="/api"
              >
                <span>All methods</span>
                <span>{reference.methodCount}</span>
              </Link>
              {reference.categories.map((name) => (
                <Link
                  className={
                    category === name || method?.category === name
                      ? 'category-link active'
                      : 'category-link'
                  }
                  to={`/api?category=${encodeURIComponent(name)}`}
                  key={name}
                >
                  <span>{name}</span>
                  <span>{counts[name]}</span>
                </Link>
              ))}
            </nav>
          </details>
        </aside>
        <div className="reference-main">
          {methodName ? (
            method ? (
              <MethodDetail key={methodName} method={method} />
            ) : (
              <div className="empty-state">
                <Search size={32} />
                <h1>Method not found.</h1>
                <p>
                  <code>{methodName}</code> is not in the current SDK interface.
                </p>
                <Link to="/api" className="button">
                  Browse all methods
                </Link>
              </div>
            )
          ) : (
            <>
              <div className="reference-intro">
                <h1>Find your next call.</h1>
                <p>
                  Every SDK method. The parameters, payloads and responses
                  behind it.
                </p>
              </div>
              <div className="reference-tools">
                <div className="search-field">
                  <label htmlFor="method-search">Search methods</label>
                  <div>
                    <Search size={18} />
                    <input
                      id="method-search"
                      ref={searchInput}
                      value={query}
                      onChange={(e) => update('q', e.target.value)}
                      placeholder="Method name, endpoint or keyword"
                      autoComplete="off"
                    />
                    {query ? (
                      <button
                        aria-label="Clear search"
                        onClick={() => update('q', '')}
                      >
                        <X size={16} />
                      </button>
                    ) : (
                      <kbd>⌘ K</kbd>
                    )}
                  </div>
                </div>
                <div className="verb-field">
                  <label htmlFor="http-method">HTTP method</label>
                  <select
                    id="http-method"
                    value={verb}
                    onChange={(e) => update('http', e.target.value)}
                  >
                    <option value="">All methods</option>
                    {verbs.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                className="results-heading"
                ref={resultsHeading}
                tabIndex={-1}
              >
                <p aria-live="polite">
                  {filtered.length}{' '}
                  {filtered.length === 1 ? 'method' : 'methods'}
                  {category && ` in ${category}`}
                </p>
                {(query || category || verb) && (
                  <button
                    className="reset-button"
                    onClick={() => setSearchParams({})}
                  >
                    Reset filters <X size={14} />
                  </button>
                )}
              </div>
              {filtered.length ? (
                <>
                  <div className="method-list">
                    {filtered
                      .slice(
                        (pageNumber - 1) * PAGE_SIZE,
                        pageNumber * PAGE_SIZE,
                      )
                      .map((item) => (
                        <Link
                          to={`/api/${item.name}`}
                          key={item.name}
                          className="method-row"
                        >
                          <div>
                            <div className="method-row-title">
                              <HttpBadge verb={item.httpMethod} />
                              <h2 title={item.name}>{item.name}</h2>
                              {item.deprecated && (
                                <span className="deprecated">Deprecated</span>
                              )}
                            </div>
                            <p>{item.summary}</p>
                            <span className="method-category">
                              {item.category}
                            </span>
                          </div>
                          <ArrowUpRight size={19} />
                        </Link>
                      ))}
                  </div>
                  <div className="pagination">
                    <button
                      disabled={pageNumber === 1}
                      onClick={() => goToPage(pageNumber - 1)}
                    >
                      <ArrowLeft size={16} />
                      Previous
                    </button>
                    <span>
                      Page {pageNumber} of {pages}
                    </span>
                    <button
                      disabled={pageNumber === pages}
                      onClick={() => goToPage(pageNumber + 1)}
                    >
                      Next
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <Search size={32} />
                  <h2>No matching methods.</h2>
                  <p>
                    Try a different keyword or clear the category and HTTP
                    filters.
                  </p>
                  <button
                    className="button"
                    onClick={() => setSearchParams({})}
                  >
                    Clear filters
                  </button>
                </div>
              )}
              <details className="sdk-options">
                <summary>Client configuration · createSDK</summary>
                <p>
                  Shared connection and transport settings for every method.
                </p>
                <CodeBlock code={reference.sdkOptions} label="SDKOptions" />
                <Link to="/getting-started">Read the setup guide →</Link>
              </details>
              <p className="reference-provenance">
                Generated from the SDK interface and DIAL OpenAPI.{' '}
                <a href={`${REPOSITORY}/blob/HEAD/open_api_core.yaml`}>
                  View the contract <ArrowUpRight size={13} />
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
