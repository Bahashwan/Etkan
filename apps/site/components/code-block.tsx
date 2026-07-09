"use client";

import * as React from "react";
import { CopyIcon, CheckIcon } from "./icons";

export function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };
  return (
    <div className="code-block">
      <div className="preview-title" style={{ borderBlockEnd: "1px solid var(--border-subtle)" }}>
        <span className="terminal-title" style={{ margin: 0 }}>
          {lang}
        </span>
        <button className="copy-btn" onClick={copy} aria-label="Copy code" style={{ marginInlineStart: 0 }}>
          {copied ? <CheckIcon width={13} height={13} /> : <CopyIcon width={13} height={13} />}
          {copied ? " Copied" : " Copy"}
        </button>
      </div>
      <pre dir="ltr">
        <code>{code}</code>
      </pre>
    </div>
  );
}
