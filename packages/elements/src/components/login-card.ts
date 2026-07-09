import { LitElement, html, css } from "lit";
import { base } from "../shared";

/**
 * `<etkan-login-card>` — a ready-made, self-contained sign-in panel.
 *
 * Renders an ETKAN card-styled surface containing a heading, a native email
 * field, a native password field, and a full-width primary submit button — all
 * styled purely with ETKAN design tokens. On submit it calls `preventDefault`
 * and dispatches `etkan-submit` (bubbles + composed) with `{ email, password }`.
 *
 * Attributes: heading (default "Sign in"), email-label (default "Email"),
 * password-label (default "Password"), submit-label (default "Sign in").
 * Labels are plain-English defaults that can be overridden for any locale.
 */
export interface EtkanLoginSubmitDetail {
  email: string;
  password: string;
}

export class EtkanLoginCard extends LitElement {
  static properties = {
    heading: { type: String },
    emailLabel: { type: String, attribute: "email-label" },
    passwordLabel: { type: String, attribute: "password-label" },
    submitLabel: { type: String, attribute: "submit-label" },
  };

  declare heading: string;
  declare emailLabel: string;
  declare passwordLabel: string;
  declare submitLabel: string;

  constructor() {
    super();
    this.heading = "Sign in";
    this.emailLabel = "Email";
    this.passwordLabel = "Password";
    this.submitLabel = "Sign in";
  }

  static styles = [
    base,
    css`
      :host {
        display: block;
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        inline-size: 100%;
        max-inline-size: 24rem;
        margin-inline: auto;
        padding: var(--space-6);
        background: var(--surface-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
      }

      .heading {
        margin: 0;
        font-size: var(--text-xl);
        font-weight: var(--fw-semibold);
        line-height: var(--leading-normal);
        color: var(--text-strong);
      }

      form {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      label {
        font-size: var(--text-sm);
        font-weight: var(--fw-medium);
        color: var(--text-body);
      }

      input {
        inline-size: 100%;
        block-size: var(--control-height-md);
        padding-inline: var(--field-padding-x);
        background: var(--surface-page);
        color: var(--text-strong);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        font-family: inherit;
        font-size: var(--text-md);
        line-height: var(--leading-normal);
        transition:
          border-color var(--duration-fast) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      input::placeholder {
        color: var(--text-subtle);
      }
      input:hover {
        border-color: var(--border-strong);
      }
      input:focus-visible {
        outline: none;
        border-color: var(--border-focus);
        box-shadow: var(--focus-ring);
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 100%;
        block-size: var(--control-height-md);
        padding-inline: var(--space-4);
        margin-block-start: var(--space-1);
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        background: var(--brand-primary);
        color: var(--text-on-primary);
        font-family: inherit;
        font-size: var(--text-md);
        font-weight: var(--fw-medium);
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        transition:
          background var(--duration-fast) var(--ease-standard),
          transform var(--duration-instant) var(--ease-standard),
          box-shadow var(--duration-fast) var(--ease-standard);
      }
      button:hover {
        background: var(--brand-primary-hover);
      }
      button:active {
        transform: translateY(0.5px) scale(0.99);
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
      }
    `,
  ];

  private handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;
    const detail: EtkanLoginSubmitDetail = {
      email: emailInput?.value ?? "",
      password: passwordInput?.value ?? "",
    };
    this.dispatchEvent(
      new CustomEvent<EtkanLoginSubmitDetail>("etkan-submit", {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="card" part="card">
        <h2 class="heading" part="heading">${this.heading}</h2>
        <form part="form" novalidate @submit=${this.handleSubmit}>
          <div class="field">
            <label for="email">${this.emailLabel}</label>
            <input
              id="email"
              name="email"
              part="input"
              type="email"
              autocomplete="email"
              inputmode="email"
            />
          </div>
          <div class="field">
            <label for="password">${this.passwordLabel}</label>
            <input
              id="password"
              name="password"
              part="input"
              type="password"
              autocomplete="current-password"
            />
          </div>
          <button type="submit" part="button">${this.submitLabel}</button>
        </form>
      </div>
    `;
  }
}

if (!customElements.get("etkan-login-card")) {
  customElements.define("etkan-login-card", EtkanLoginCard);
}
