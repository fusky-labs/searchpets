import React from "react"
import { createComponent } from "@lit-labs/react"
import { customElement } from "lit/decorators.js"
import { html, LitElement, TemplateResult } from "lit"

class MarginFiller extends LitElement {
  static get properties() {
    return {
      size: { type: String, reflect: true }
    }
  }

  size = "0"

  render(): TemplateResult {
    return html`<div style="width: ${this.size}px; height: 100%; transition: width 300ms;"></div>`
  }
}

customElement("margin-filler")(MarginFiller)

export default createComponent(React, "margin-filler", MarginFiller, {})
