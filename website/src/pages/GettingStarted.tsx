import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CodeBlock } from '../components/CodeBlock';
import { customFetch, discover, setup, snippets } from '../data/examples';

export default function GettingStarted() {
  return (
    <article className="container guide-page">
      <div className="page-intro">
        <Link to="/" className="breadcrumb">
          Overview /
        </Link>
        <h1>Your first DIAL request.</h1>
        <p>Configure a client, choose a deployment, and start building.</p>
      </div>
      <div className="guide-layout">
        <aside className="guide-nav" aria-label="On this page">
          <p>On this page</p>
          <a href="#install">Install</a>
          <a href="#configure">Configure</a>
          <a href="#discover">Find a deployment</a>
          <a href="#request">Send a request</a>
          <a href="#errors">Handle errors</a>
          <a href="#custom-fetch">Custom fetch</a>
        </aside>
        <div className="guide-content">
          <section id="install">
            <h2>Install the SDK</h2>
            <p>
              You need a DIAL Core URL, credentials, and a deployment available
              to your account. These examples run on a Node.js server with
              native fetch.
            </p>
            <CodeBlock
              label="Terminal"
              code="npm install @epam/ai-dial-typescript-sdk"
            />
          </section>
          <section id="configure">
            <h2>Configure once</h2>
            <p>
              Set <code>DIAL_URL</code> and <code>DIAL_API_KEY</code> in your
              server environment. Validate them when your application starts.
            </p>
            <CodeBlock code={setup} />
            <p>
              Use <code>token</code> for bearer authentication instead of{' '}
              <code>apiKey</code>. Shared <code>headers</code> and a custom{' '}
              <code>fetch</code> are also supported. Keep credentials on your
              server; do not put long-lived secrets in a browser bundle.
            </p>
            <CodeBlock
              code={`createSDK({\n  baseUrl: process.env.DIAL_URL!,\n  token: process.env.DIAL_TOKEN!,\n  headers: { 'X-Request-Source': 'my-application' },\n});`}
            />
          </section>
          <section id="discover">
            <h2>Find your deployment</h2>
            <p>
              Use an identifier returned by your DIAL instance. Configure{' '}
              <code>DIAL_API_VERSION</code> with a version supported by the
              selected deployment.
            </p>
            <CodeBlock code={discover} />
            <Link to="/api/getDeployments" className="text-link">
              getDeployments reference <ArrowRight size={16} />
            </Link>
          </section>
          <section id="request">
            <h2>Send a chat request</h2>
            <p>
              Replace <code>your-chat-deployment</code> with your deployment ID.
              The fields below are required by the current generated TypeScript
              schema. Adapt numeric settings to the model.
            </p>
            <CodeBlock
              code={`const apiVersion = process.env.DIAL_API_VERSION!;\n\n${snippets.Chat}`}
            />
            <p>
              SDK calls return <code>{'{ data, error, response }'}</code>.{' '}
              <code>response</code> is the original Fetch Response. The example
              uses <code>stream: false</code> for a JSON response.
            </p>
          </section>
          <section id="errors">
            <h2>Handle both failure paths</h2>
            <p>
              HTTP errors return an error result. Network failures, cancellation
              and response parsing can throw.
            </p>
            <CodeBlock
              code={`try {\n  const result = await sdk.getDeployments();\n  if (!result.response.ok) {\n    console.error(result.response.status, result.error);\n  } else {\n    console.info(result.data);\n  }\n} catch (cause) {\n  console.error('Transport or response parsing failed', cause);\n}`}
            />
          </section>
          <section id="custom-fetch">
            <h2>Use your own transport</h2>
            <p>
              This example returns a controlled response without making a
              network request. The same extension point can support tracing and
              application-specific policies.
            </p>
            <CodeBlock code={customFetch} />
          </section>
          <div className="guide-next">
            <h2>Find your next method.</h2>
            <p>
              Explore parameters, request bodies, response schemas and exact SDK
              signatures.
            </p>
            <Link className="button" to="/api">
              Open API reference <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
