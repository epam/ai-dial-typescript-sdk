import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Layers3,
  Workflow,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { CodeBlock, CopyButton } from '../components/CodeBlock';
import { REPOSITORY } from '../components/Layout';
import { customFetch, setup, snippets } from '../data/examples';
import summary from '../data/sdk-summary.json';

const tabs = ['Chat', 'Embeddings', 'Resources'] as const;
const methodLinks = {
  Chat: 'sendChatCompletionRequest',
  Embeddings: 'createEmbedding',
  Resources: 'savePrompt',
};

function ExampleSwitcher() {
  const [active, setActive] = useState<(typeof tabs)[number]>('Chat');
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="example-switcher">
      <div className="example-tabs" role="tablist" aria-label="SDK examples">
        {tabs.map((name, index) => (
          <button
            ref={(el) => {
              buttons.current[index] = el;
            }}
            role="tab"
            id={`tab-${name}`}
            aria-controls={`panel-${name}`}
            aria-selected={active === name}
            tabIndex={active === name ? 0 : -1}
            key={name}
            onClick={() => setActive(name)}
            onKeyDown={(e) => {
              if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key))
                return;
              e.preventDefault();
              const next =
                e.key === 'Home'
                  ? 0
                  : e.key === 'End'
                    ? tabs.length - 1
                    : (index +
                        (e.key === 'ArrowRight' ? 1 : -1) +
                        tabs.length) %
                      tabs.length;
              setActive(tabs[next]);
              buttons.current[next]?.focus({ preventScroll: true });
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        <CodeBlock
          code={snippets[active]}
          label="TypeScript"
          copyText={`${setup}\n\nconst apiVersion = process.env.DIAL_API_VERSION!;\n\n${snippets[active]}`}
        />
      </div>
      <div className="example-caption">
        <span>
          <span className="status-dot" />
          Typed against the SDK
        </span>
        <Link to={`/api/${methodLinks[active]}`}>
          Method reference <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}

const groups = [
  {
    name: 'Models & inference',
    desc: 'Chat completions, embeddings and available deployments.',
    category: 'LLM',
    icon: Braces,
  },
  {
    name: 'Files & conversations',
    desc: 'Keep your application’s resources in DIAL.',
    category: 'Files',
    icon: Layers3,
  },
  {
    name: 'Apps & tools',
    desc: 'Applications, toolsets and their configuration.',
    category: 'Applications',
    icon: Workflow,
  },
  {
    name: 'Sharing & access',
    desc: 'Resource sharing, permissions and publications.',
    category: 'Sharing',
    icon: Code2,
  },
];

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Link to="/getting-started" className="release-link">
            <span className="release-dot" />
            TypeScript SDK <span>v{summary.version}</span>
            <ChevronRight size={14} />
          </Link>
          <h1>
            Your AI stack.
            <br />
            <span className="hero-accent">Typed.</span>
          </h1>
          <p className="hero-description">
            Models, conversations, files.
            <br />
            One TypeScript client for DIAL Core.
          </p>
          <p className="hero-detail">
            Write your application. Let the SDK handle the API contract, request
            paths and shared authentication.
          </p>
          <div className="actions">
            <Link to="/getting-started" className="button">
              Start building <ArrowUpRight size={17} />
            </Link>
            <Link to="/api" className="text-link">
              Explore the API <ArrowRight size={16} />
            </Link>
          </div>
          <div className="install-command">
            <code>npm i @epam/ai-dial-typescript-sdk</code>
            <CopyButton
              text="npm install @epam/ai-dial-typescript-sdk"
              label="Copy install command"
            />
          </div>
          <p className="hero-footnote">Open source · Apache-2.0 · ESM + CJS</p>
        </div>
        <ExampleSwitcher />
      </section>
      <section className="facts container" aria-label="SDK facts">
        <div>
          <strong>{summary.methodCount}</strong>
          <span>SDK methods</span>
        </div>
        <div>
          <strong>OpenAPI</strong>
          <span>The source of the contract</span>
        </div>
        <div>
          <strong>{summary.runtimeDependencyCount}</strong>
          <span>
            {summary.runtimeDependencyCount === 1
              ? 'Runtime dependency'
              : 'Runtime dependencies'}
          </span>
        </div>
        <div>
          <strong>TypeScript</strong>
          <span>From request to response</span>
        </div>
      </section>
      <section className="container story-section">
        <div
          className="type-proof"
          aria-label="Example of type-guided development"
        >
          <div className="type-proof-call">
            <span className="syntax-keyword">sdk</span>
            .sendChatCompletionRequest(
            <span className="syntax-string">deployment</span>, {'{'}
          </div>
          <div className="completion-row">
            <span>body</span>
            <span>ChatCompletionRequest</span>
          </div>
          <div className="completion-row selected">
            <span>messages</span>
            <span>ChatCompletionRequestMessage[]</span>
            <Check size={16} />
          </div>
          <div className="completion-row">
            <span>temperature</span>
            <span>number</span>
          </div>
          <div className="completion-row">
            <span>stream</span>
            <span>boolean | null</span>
          </div>
          <div className="type-proof-end">{'})'}</div>
          <p>
            <Braces size={18} />A contract your editor understands.
          </p>
        </div>
        <div className="story-copy">
          <h2>
            Stay in your editor.
            <br />
            Stay in the flow.
          </h2>
          <p>
            Discover methods and request fields where you already work. Types
            generated from OpenAPI bring the DIAL contract directly into your
            code.
          </p>
          <ul className="check-list">
            <li>
              <Check size={17} />
              Named methods with typed parameters
            </li>
            <li>
              <Check size={17} />
              Request and JSON response types
            </li>
            <li>
              <Check size={17} />A shared client for your DIAL resources
            </li>
          </ul>
          <Link to="/api/sendChatCompletionRequest" className="text-link">
            Inspect the chat contract <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="surface-section">
        <div className="container">
          <div className="section-heading">
            <h2>Beyond the model call.</h2>
            <p>The same client connects the rest of your application.</p>
          </div>
          <div className="capability-list">
            {groups.map(({ name, desc, category, icon: Icon }) => (
              <Link
                key={name}
                to={`/api?category=${encodeURIComponent(category)}`}
                className="capability"
              >
                <Icon size={23} />
                <div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                <ArrowUpRight size={21} />
              </Link>
            ))}
          </div>
          <Link to="/api" className="text-link section-link">
            Browse all {summary.methodCount} methods <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="container story-section integration-section">
        <div className="story-copy">
          <h2>
            Your transport.
            <br />
            Your policies.
          </h2>
          <p>
            Bring a custom fetch implementation. Test with predictable
            responses, add tracing or implement the retry policy your
            application needs.
          </p>
          <p className="subtle">
            The SDK stays focused on the API. You own the application around it.
          </p>
          <Link to="/getting-started#custom-fetch" className="text-link">
            Configure your client <ArrowRight size={16} />
          </Link>
        </div>
        <CodeBlock
          code={customFetch}
          label="Custom fetch · no network required"
        />
      </section>
      <section className="container faq-section">
        <div>
          <h2>A few useful details.</h2>
          <p>Before your first request.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>Is this a client or a model runtime?</summary>
            <p>
              A client for DIAL Core. You connect it to an existing DIAL
              instance and use deployments available in that environment.
            </p>
          </details>
          <details>
            <summary>Does it work with my deployment?</summary>
            <p>
              Available operations and model parameters depend on your DIAL
              configuration. Use getDeployments to discover deployments and
              select an API version supported by your environment.
            </p>
          </details>
          <details>
            <summary>What does type safety cover?</summary>
            <p>
              The SDK provides compile-time request and JSON response types. It
              does not validate server responses at runtime. Required fields
              follow the generated TypeScript schema.
            </p>
          </details>
          <details>
            <summary>What about streaming and retries?</summary>
            <p>
              You can request a raw stream through parseAs. SSE parsing,
              retries, token refresh and timeout policies belong to your
              application. The current response type does not change with
              parseAs.
            </p>
          </details>
        </div>
      </section>
      <section className="container closing-cta">
        <div>
          <h2>Make your first call.</h2>
          <p>One connection. A whole API to build with.</p>
        </div>
        <Link to="/getting-started" className="button">
          Get started <ArrowUpRight size={18} />
        </Link>
        <a href={REPOSITORY} className="visually-hidden">
          View SDK source on GitHub
        </a>
      </section>
    </>
  );
}
