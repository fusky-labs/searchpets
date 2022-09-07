import React from "react"
import { createComponent } from "@lit-labs/react"
import { customElement } from "lit/decorators.js"
import { css, html, LitElement, TemplateResult } from "lit"

const styles = css`
  :host,
  #wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
    row-gap: 0.5rem;
    height: 100%;
  }

  :host[hidden] {
    display: none;
  }

  #fox-speen {
    animation: speen 7s linear infinite;
  }

  @keyframes speen {
    100% {
      transform: rotate(360deg);
    }
  }
`

class LoadingThingy extends LitElement {
  static styles = styles

  static get properties() {
    return {
      hidden: { type: Boolean, reflect: true }
    }
  }

  hidden = false

  render(): TemplateResult {
    return html`
      <div id="wrapper">
        <img
          id="fox-speen"
          src="/static/foxplushie_loading.png"
          width="100"
          height="100"
        />
        <strong>Loading...</strong>
      </div>
    `
  }
}

customElement("loading-fox-plush")(LoadingThingy)

export default createComponent(React, "loading-fox-plush", LoadingThingy, {})
