
# Custom Elements — Building Your Own HTML Elements with Web Components

Custom Elements are a key part of the **Web Components** standard, empowering developers to create their own reusable, encapsulated HTML elements with custom behavior and appearance.

They allow you to build native-like UI components that integrate seamlessly into your applications — without external libraries.

---

## What Are Custom Elements?

**Custom Elements** extend the capabilities of HTML by allowing you to define entirely new tags or enhance existing ones with custom logic.

Examples:

```html
<user-profile></user-profile>
<app-modal open></app-modal>
<my-button variant="primary">Click me</my-button>
```

These look like built-in HTML tags but are fully controlled by your JavaScript logic.

---

## Anatomy of a Custom Element

To create a custom element, you:

✅ Define a class that extends `HTMLElement` (or a subclass).  
✅ Use `customElements.define()` to register it.  
✅ Optionally, attach a Shadow DOM for encapsulation.  

### Basic Example

```js
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <button><slot></slot></button>
    `;
  }
}

customElements.define('my-button', MyButton);
```

Now you can use:

```html
<my-button>Click Me</my-button>
```

---

## Lifecycle Callbacks

Custom elements have special lifecycle methods similar to component frameworks:

| Method                       | When It Runs                                 |
|------------------------------|----------------------------------------------|
| `connectedCallback()`        | Element added to the DOM                     |
| `disconnectedCallback()`     | Element removed from the DOM                 |
| `attributeChangedCallback()` | An observed attribute changed                |
| `adoptedCallback()`          | Element moved to a new document (rare)       |

Example:

```js
class MyLogger extends HTMLElement {
  connectedCallback() {
    console.log('MyLogger added to page');
  }

  disconnectedCallback() {
    console.log('MyLogger removed from page');
  }
}

customElements.define('my-logger', MyLogger);
```

---

## Observing Attributes

To react to attribute changes:

```js
class MyToggle extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed to ${newValue}`);
  }
}

customElements.define('my-toggle', MyToggle);
```

---

## Extending Built-in Elements

You can create **autonomous** custom elements (new tags) or **customized built-in** elements (extend existing tags).

### Example: Extending `<button>`

```js
class FancyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.style.background = 'gold';
  }
}

customElements.define('fancy-button', FancyButton, { extends: 'button' });
```

Usage:

```html
<button is="fancy-button">Gold Button</button>
```

⚠️ Note: Customized built-in elements have limited browser support compared to autonomous ones.

---

## Shadow DOM Integration

Most real-world custom elements use Shadow DOM for encapsulation:

```js
this.attachShadow({ mode: 'open' });
```

This keeps styles and markup isolated, preventing conflicts with the main page.

---

## Styling with `::part` and `::slotted`

If you want consumers of your component to style internals:

### Expose Parts:

```html
<my-card part="container">
  <slot></slot>
</my-card>

<style>
  my-card::part(container) {
    border: 1px solid black;
  }
</style>
```

### Style Slotted Content:

```css
::slotted(h1) {
  color: red;
}
```

---

## Best Practices

✅ Use lowercase, hyphenated names (e.g., `my-widget`).  
✅ Keep internal logic encapsulated.  
✅ Provide styling hooks via `::part`.  
✅ Design for accessibility (use ARIA, semantic roles).  
✅ Avoid overcomplicating — not every element needs to be a Web Component.  

---

## Benefits of Custom Elements

- Reusable, encapsulated UI components.
- Native browser support (no build tools required).
- Can work alongside frameworks or plain HTML.
- Integrate naturally with form elements (with care).
- Promote consistent design and behavior across projects.

---

## Limitations

| Limitation                           | Notes                                        |
|--------------------------------------|----------------------------------------------|
| Requires modern browsers             | IE11 unsupported; good support in modern browsers. |
| Shadow DOM styling requires care     | Global CSS doesn't penetrate Shadow DOM.     |
| Forms integration is tricky          | Native form participation requires extra work. |
| Overuse can harm accessibility       | Be cautious when replacing semantic elements. |

---

## Conclusion

Custom Elements unlock the ability to craft your own HTML building blocks, backed by browser-native features like Shadow DOM and slots. They offer a powerful, framework-agnostic way to build reusable UI components with predictable behavior and appearance.

For advanced UI development — whether in large apps or design systems — understanding and leveraging Custom Elements is a modern web development essential.

---

## Suggested Next Steps

✅ Build a simple custom element from scratch.  
✅ Experiment with Shadow DOM and styling via `::part`.  
✅ Explore libraries like [Lit](https://lit.dev) to simplify complex components.  
✅ Review accessibility guidelines for custom components.  
✅ Consider when native elements suffice to avoid unnecessary complexity.  

## Further Reading

- [Web Components (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

