import { AlertCircle, Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function CopyButton({
  text,
  label = 'Copy code',
}: {
  text: string;
  label?: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  );
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copy() {
    clearTimeout(timeout.current);
    setState('loading');
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
      timeout.current = setTimeout(() => setState('idle'), 1800);
    } catch {
      setState('error');
    }
  }
  return (
    <button
      className="copy-button"
      onClick={copy}
      disabled={state === 'loading'}
      aria-label={state === 'done' ? 'Copied' : label}
      title={
        state === 'error'
          ? 'Clipboard unavailable. Select and copy the code manually.'
          : label
      }
    >
      {state === 'done' ? (
        <Check size={16} />
      ) : state === 'error' ? (
        <AlertCircle size={16} />
      ) : (
        <Copy size={16} />
      )}
      <span aria-live="polite">
        {state === 'done'
          ? 'Copied'
          : state === 'error'
            ? 'Select & copy'
            : state === 'loading'
              ? 'Copying…'
              : 'Copy'}
      </span>
    </button>
  );
}

function highlight(code: string) {
  const parts = code.split(
    /(\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|`[^`]*`|\b(?:import|from|const|let|await|new|if|else|throw|return|async|type|satisfies|false|true|null|undefined)\b|\b\d+(?:\.\d+)?\b)/g,
  );
  return parts.map((part, index) => {
    const kind = part.startsWith('//')
      ? 'comment'
      : /^['"`]/.test(part)
        ? 'string'
        : /^(import|from|const|let|await|new|if|else|throw|return|async|type|satisfies|false|true|null|undefined)$/.test(
              part,
            )
          ? 'keyword'
          : /^\d+(\.\d+)?$/.test(part)
            ? 'number'
            : '';
    return kind ? (
      <span className={`syntax-${kind}`} key={index}>
        {part}
      </span>
    ) : (
      part
    );
  });
}

export function CodeBlock({
  code,
  label = 'TypeScript',
  copyText,
  className = '',
}: {
  code: string;
  label?: string;
  copyText?: string;
  className?: string;
}) {
  return (
    <div className={`code-block ${className}`}>
      <div className="code-label">
        <span>{label}</span>
        <CopyButton text={copyText ?? code} />
      </div>
      <pre tabIndex={0} aria-label={label}>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}
