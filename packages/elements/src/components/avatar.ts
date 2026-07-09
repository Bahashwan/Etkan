import { LitElement, html, css, nothing } from "lit";
import { base } from "../shared";

/**
 * `<etkan-avatar>` — a circular avatar showing an image or up to two initials.
 * Attributes: name (string → up to 2 uppercase initials), src (image url),
 * size (Number, px, default 40). When `src` fails to load it falls back to the
 * initials automatically. Dispatches `etkan-avatar-error` if the image errors.
 */
export class EtkanAvatar extends LitElement {
  static properties = {
    name: { type: String },
    src: { type: String },
    size: { type: Number },
    _failed: { state: true },
  };

  declare name: string;
  declare src: string;
  declare size: number;
  declare private _failed: boolean;

  constructor() {
    super();
    this.name = "";
    this.src = "";
    this.size = 40;
    this._failed = false;
  }

  static styles = [
    base,
    css`
      :host {
        display: inline-block;
      }
      .avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: var(--etkan-avatar-size, 40px);
        block-size: var(--etkan-avatar-size, 40px);
        border-radius: var(--radius-pill);
        overflow: hidden;
        background: var(--brand-primary-soft);
        color: var(--brand-primary-soft-text);
        font-family: var(--font-sans);
        font-weight: var(--fw-semibold);
        font-size: var(--etkan-avatar-font, 1rem);
        line-height: var(--leading-normal);
        user-select: none;
        -webkit-user-select: none;
      }
      img {
        inline-size: 100%;
        block-size: 100%;
        object-fit: cover;
        display: block;
      }
      .initials {
        text-transform: uppercase;
      }
    `,
  ];

  private _initials(): string {
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  private _onError(): void {
    this._failed = true;
    this.dispatchEvent(
      new CustomEvent("etkan-avatar-error", {
        bubbles: true,
        composed: true,
        detail: { src: this.src, name: this.name },
      }),
    );
  }

  render() {
    const size = Number.isFinite(this.size) && this.size > 0 ? this.size : 40;
    const style = `--etkan-avatar-size:${size}px;--etkan-avatar-font:${Math.round(size * 0.4)}px;`;
    const showImage = this.src && !this._failed;
    const label = this.name || undefined;

    return html`
      <div
        class="avatar"
        part="avatar"
        style=${style}
        role="img"
        aria-label=${label ?? nothing}
      >
        ${showImage
          ? html`<img
              part="image"
              src=${this.src}
              alt=${label ?? nothing}
              @error=${this._onError}
            />`
          : html`<span class="initials" part="initials" aria-hidden="true"
              >${this._initials()}</span
            >`}
      </div>
    `;
  }
}

if (!customElements.get("etkan-avatar")) {
  customElements.define("etkan-avatar", EtkanAvatar);
}
