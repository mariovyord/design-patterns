# Micro-Frontends with Angular Native Federation: A Domain-Driven Architecture for Scalable Frontend Platforms

As frontend applications grow in size and organizational complexity, teams often reach a point where a single monolithic SPA becomes difficult to scale — not only technically, but also in terms of ownership and delivery speed.

To address this, our team designed a micro-frontend architecture that enables independent development, deployment, and evolution of frontend domains while still delivering a seamless user experience.

Our approach is built around a few key principles:

- **Runtime federation using Angular Native Federation**
- **Encapsulation via Web Components**
- **Optional Shadow DOM style isolation**
- **Shared services through lightweight abstract contracts**
- **Domain-based application boundaries**
- **Minimal cross-app communication through global utilities**

Let’s walk through how it works.

---

## Why Micro-Frontend Federation?

Micro-frontends extend the same philosophy as microservices into the UI layer.

Instead of one large frontend application, the platform is split into multiple independently owned applications, each responsible for a specific business domain — such as:

- Flights  
- Maintenance  
- Analytics  
- Documentation  

Each micro-frontend can be:

- Developed and tested independently  
- Released without coordinating a full frontend redeploy  
- Composed into a unified UI at runtime  

This provides clear ownership boundaries and enables frontend teams to scale efficiently.

---

## Angular Native Federation

**Angular Native Federation**  brings federation into Angular using:

- Browser-native ES modules  
- Standard `import()` loading  
- Import Maps  
- Angular’s default esbuild builder  

This gives us the benefits of micro-frontends *and* the benefits of using modern Angular tooling.

---

## Core Architecture: Host + Remotes

At runtime, the platform consists of:

### Host Application (Shell)

The host acts as the orchestrator:

- Loads remote applications dynamically  
- Owns global routing and layout  
- Provides shared configuration and services  
- Contains minimal business logic  

### Remote Applications (Micro-Frontends)

Each remote:

- Owns a domain or feature set  
- Is deployed independently  
- Exposes UI as Web Components  
- Can run standalone or embedded  

The result: the user experiences one unified SPA, while teams work in parallel.

---

## Encapsulation with Web Components

A key architectural decision is that **every remote is exposed as a Web Component** using `@angular/elements`.

This provides strong isolation:

- Framework boundaries disappear  
- Different Angular versions can coexist  
- The host integrates MFEs like standard HTML elements  

Example remote registration:

```ts
await createApplication({
  providers: [...providers],
});

const customElement = createCustomElement(EntryComponent, {
  injector: app.injector,
});

if (!customElements.get(elementName)) {
  customElements.define(elementName, customElement);
}
```

The host consumes it like this:

```html
<mfe-wrapper
  [source]="remoteId"
  [props]="props"
  [eventHandlers]="handlers">
</mfe-wrapper>
```

This keeps integration clean and browser-native.

---

## Shared UI Components

While remotes are isolated, we can still share common UI components via a shared library as a best practice.

This allows us to maintain a consistent design system across the platform without tightly coupling remotes together.

---

## Optional Style Isolation with Shadow DOM

CSS leakage is one of the most common pain points in micro-frontends.

To prevent remotes from interfering with host styling (or vice versa), we support **Shadow DOM encapsulation** when needed.

This is especially important when remotes include global frameworks like Bootstrap.

With Shadow DOM:

- Styles remain scoped inside the micro-frontend  
- The host UI remains unaffected  
- Each MFE can safely ship its own design system if required  

---

## Shared Services via Abstract Contracts

Micro-frontends should not tightly share implementation details, but some platform-wide services must remain consistent:

- Authentication  
- Language selection  
- Global context  

Our solution: a shared platform library providing **lightweight abstract service contracts**, such as:

- `LanguageService`
- `AuthService`

The host provides the concrete implementation, and remotes consume it automatically.

Host publishes shared services:

```ts
window.__platform_context__ = {
  languageService: inject(LanguageService),
  authService: inject(AuthService),
};
```

Remotes reuse them instead of creating duplicates.

---

## Domain-Based Splitting

A major rule in our architecture is:

> Micro-frontends are split by business domain, not by technical components.

Each remote owns:

- Its routes  
- Its services  
- Its internal state  
- Its deployment lifecycle  

This avoids the trap of “micro-components” and keeps boundaries meaningful.

---

## Minimal Cross-App Communication

Micro-frontends should stay autonomous. Communication is intentionally limited.

When data sharing is required, we rely on browser-native mechanisms:

- CustomEvents  
- URLs  
- SessionStorage / LocalStorage  
- Lightweight global utilities  

For example, a small shared global context can be exposed via:

```ts
window.__platform_context__
```

Remotes can safely access slices of shared state:

```ts
window.__platform_context__.languageService.getCurrentLanguage();
```

This avoids heavy event buses or tightly coupled shared state.

---

## Embedded vs Standalone Mode

Each micro-frontend can run:

- Standalone (local development)
- Embedded inside a host

This can be supported via a simple injection token:

```ts
readonly isEmbedded =
  inject(IS_EMBEDDED, { optional: true }) ?? false;
```

This enables clean branching:

- Standalone → provide services locally  
- Embedded → reuse host-provided services  

---

## Summary: A Future-Proof Micro-Frontend Platform

Our architecture combines modern federation standards with strong encapsulation:

✅ Native Federation for runtime composition  
✅ Web Components for clean integration  
✅ Shadow DOM when style isolation is needed  
✅ Shared contracts for auth + language consistency  
✅ Domain ownership boundaries  
✅ Lightweight global utilities instead of tight coupling  

The result is a scalable frontend platform where teams can move independently — without sacrificing cohesion or maintainability.
