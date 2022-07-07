// CheckIcon
class CheckIcon extends HTMLElement {
   constructor() {
      super()

      this._checked = false

      const shadow = this.attachShadow({mode: "open"})
      shadow.appendChild(this.style())
      shadow.appendChild(this.markup())
   }

   static observedAttributes = ["checked"]

   attributeChangedCallback(name, oldValue, newValue) {
      this._checked = newValue === "true"
      this._updateRendering()
   }

   get checked() {
      return this._checked;
   }

   set checked(value) {
      this.setAttribute("checked", value)
   }

   _updateRendering() {
      if (this._checked)
         this.shadowRoot.children[1].classList.add("check-icon-selected")
      else
         this.shadowRoot.children[1].classList.remove("check-icon-selected")
   }

   markup() {
      const icon = document.createElement("div")
      icon.classList.add("check-icon")
      icon.innerHTML = `
         <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path class="check-icon__check" d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
         </svg>
      `
      return icon
   }

   style() {
      const layout = document.createElement("style")
      layout.textContent = `
         .check-icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
         }
         .check-icon svg {
            width: 20px;
            height: 20px;
            fill: var(--color-text-2);
         }
         .check-icon__check {
            visibility: hidden;
            fill: #08E;
         }
         .check-icon-selected svg .check-icon__check {
            visibility: visible;
            fill: #08E;
         }
      `
      return layout
   }
}

// PenButton
class PenButton extends HTMLElement {
   constructor() {
      super()

      const shadow = this.attachShadow({mode: "open"})
      shadow.appendChild(this.style())
      shadow.appendChild(this.markup())
   }

   markup() {
      const button = document.createElement("div")
      button.classList.add("pen-button")
      button.innerHTML = `
         <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
         </svg>
      `
      return button
   }

   style() {
      const layout = document.createElement("style")
      layout.textContent = `
         .pen-button {
            width: 20px;
            height: 20px;
            padding: 8px;
            border-radius: 4px;
            background-color: var(--color-base-2);
            cursor: pointer;
         }
         .pen-button svg {
            width: 20px;
            height: 20px;
            fill: #08E;
         }
         .pen-button:hover svg {
            fill: var(--color-text-1);
         }
      `
      return layout
   }
}

// TrashButton
class TrashButton extends HTMLElement {
   constructor() {
      super()

      const shadow = this.attachShadow({mode: "open"})
      shadow.appendChild(this.style())
      shadow.appendChild(this.markup())
   }

   markup() {
      const button = document.createElement("div")
      button.classList.add("trash-button")
      button.innerHTML = `
         <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
         </svg>
      `
      return button
   }

   style() {
      const layout = document.createElement("style")
      layout.textContent = `
         .trash-button {
            width: 20px;
            height: 20px;
            padding: 8px;
            border-radius: 4px;
            background-color: var(--color-base-2);
            cursor: pointer;
         }
         .trash-button svg {
            width: 20px;
            height: 20px;
            fill: #E22;
         }
         .trash-button:hover svg {
            fill: var(--color-text-1);
         }
      `
      return layout
   }
}

export const components = () => {
   customElements.define("check-icon", CheckIcon)
   customElements.define("pen-button", PenButton)
   customElements.define("trash-button", TrashButton)
}