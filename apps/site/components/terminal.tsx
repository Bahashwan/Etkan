"use client";

import * as React from "react";
import { CopyIcon, CheckIcon } from "./icons";

interface TerminalProps {
  title?: string;
  /** Each entry is a shell line. Lines starting with "#" render as comments. */
  commands: string[];
}

export function Terminal({ title = "bash", commands }: TerminalProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    const text = commands.filter((c) => !c.startsWith("#")).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: "#f0605c" }} />
        <span className="terminal-dot" style={{ background: "#f5bf4f" }} />
        <span className="terminal-dot" style={{ background: "#5ac05a" }} />
        <span className="terminal-title">{title}</span>
        <button className="copy-btn" onClick={copy} aria-label="Copy commands">
          {copied ? <CheckIcon width={13} height={13} /> : <CopyIcon width={13} height={13} />}
          {copied ? " Copied" : " Copy"}
        </button>
      </div>
      <div className="terminal-body" dir="ltr">
        {commands.map((line, i) =>
          line.startsWith("#") ? (
            <div key={i} className="comment">
              {line}
            </div>
          ) : (
            <div key={i}>
              <span className="prompt">$ </span>
              {line}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
