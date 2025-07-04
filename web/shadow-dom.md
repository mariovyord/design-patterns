# Shadow DOM in Vanilla HTML Elements — Deep Dive

The Shadow DOM is not just for custom web components; it also powers many built-in HTML elements behind the scenes.

Shadow DOM is a web standard that enables encapsulation of DOM and CSS. It allows developers to create isolated and reusable components without affecting the global DOM or styles. By attaching a shadow root to an element, you can define its internal structure and styling independently from the rest of the document.

## What is Shadow DOM in Native HTML Elements?

Many standard HTML elements, such as `<input>`, `<video>`, `<details>`, `<progress>`, and `<select>`, come with an internal hidden DOM structure, implemented using closed or open Shadow DOM. This internal tree defines their visual appearance and behavior independently from your document's main DOM.

For example:

- `<input type="range">` contains a shadow tree that renders the slider track and thumb.

- `<video>` has a complex shadow tree implementing controls like play, pause, and volume.

- `<details>` uses Shadow DOM to manage its toggle triangle and open/close logic.

## Types of Shadow DOM: Open vs. Closed

Built-in elements typically use a closed Shadow DOM, meaning you cannot access their shadowRoot via JavaScript:

```js
const input = document.querySelector('input');
console.log(input.shadowRoot); // null
```

For custom elements, you can specify:

```js
this.attachShadow({ mode: 'open' }); // Accessible
this.attachShadow({ mode: 'closed' }); // Inaccessible
```
Native elements almost always use mode: 'closed', restricting direct script access for security and consistency.

## Real Examples of Native Shadow DOM Structures

### `<input type="range">` (Slider)

In DevTools (with Show User Agent Shadow DOM enabled), you may see:

```js
#shadow-root (closed)
  <div class="track"></div>
  <div class="thumb"></div>
```

### `<video controls>`

```js
#shadow-root (closed)
  <button class="play"></button>
  <input type="range" class="progress">
  <button class="fullscreen"></button>
```

These structures are browser-dependent and subject to change but illustrate the encapsulation concept.

## Advanced Styling: `::part`, `::slotted`, and the Limitations

### `::part`

Some native elements expose parts of their Shadow DOM for styling:

```html
<my-button part="button">
  Click me
</my-button>

<style>
  my-button::part(button) {
    background: red;
  }
</style>
```

Unfortunately, most default HTML elements do not expose parts, limiting your ability to style their internals.

### `::slotted`

Applies only to content projected via <slot> elements in custom components, not typically applicable to native elements.

## Styling Workarounds for Native Elements

You cannot style closed Shadow DOM internals directly, but there are some strategies:

Use browser-specific pseudo-elements, e.g.:

```css
input[type="range"]::-webkit-slider-thumb {
  background: blue;
}
```

⚠️ These are non-standard and vary between browsers. Always check compatibility on MDN.

## Browser Developer Tools for Inspecting Shadow DOM

To inspect the Shadow DOM:

1. Open DevTools (F12).

2. In Chrome, enable:

3. Settings → Preferences → "Show user agent shadow DOM."

Inspect native elements; their Shadow DOM will be visible.

Other browsers like Firefox expose Shadow DOM partially, but behavior differs.

## Why Native Elements Use Closed Shadow DOM

Reasons include:

- Security: Prevents scripts from tampering with critical UI.

- Consistency: Ensures cross-browser look and feel.

- Encapsulation: Avoids accidental CSS or JS interference.

Custom elements give you more control, but native elements intentionally limit access.

## Practical Implications for Developers

- You cannot fully restyle or manipulate internals of elements like `<input>`, `<select>`, `<video>`.

- For highly customized UI, consider:

    - Replacing native elements with accessible custom components.

    - Using provided styling hooks (`::part`, browser-specific pseudo-elements) cautiously.

- Be aware of browser differences when debugging.

## Limitations and Gotchas

| Limitation                          | Notes                                                                 |
|-------------------------------------|----------------------------------------------------------------------|
| Closed Shadow DOM inaccessible      | Can't modify or inspect via JS.                                     |
| Limited styling options             | Browser-specific pseudo-elements vary.                              |
| Internal structure is undocumented  | Can change across browser versions.                                 |
| Accessibility risks with custom replacements | Replacing native elements may harm accessibility if not done carefully. |

## Conclusion

The Shadow DOM is a critical, often invisible part of how browsers implement native elements. While it provides security and encapsulation, it also introduces limitations for customization. Understanding these mechanics helps developers debug, style, and decide when to embrace native elements versus building custom alternatives.

## Further Reading

- [Using Shadow DOM (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)