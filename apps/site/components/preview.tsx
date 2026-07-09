"use client";

import * as React from "react";
import { CodeBlock } from "./code-block";

interface PreviewProps {
  title?: string;
  code?: string;
  children: React.ReactNode;
}

/** A live component stage with an optional "show code" reveal. */
export function Preview({ title, code, children }: PreviewProps) {
  const [showCode, setShowCode] = React.useState(false);
  return (
    <div className="preview">
      {(title || code) && (
        <div className="preview-title">
          <h4>{title}</h4>
          {code && (
            <button
              className="copy-btn"
              onClick={() => setShowCode((s) => !s)}
              style={{ marginInlineStart: 0 }}
            >
              {showCode ? "Hide code" : "Show code"}
            </button>
          )}
        </div>
      )}
      <div className="preview-stage">{children}</div>
      {code && showCode && (
        <div style={{ borderBlockStart: "1px solid var(--border-subtle)" }}>
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
