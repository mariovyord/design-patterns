# API Design Basics

## Why API Design Matters

An API is a contract between the system builders and the clients using that system. Good API design makes that contract clear, stable, and easy to evolve.

## API Categories (Quick Recap)

- Public APIs: Exposed to external developers.
- Private/Internal APIs: Used inside an organization.
- Partner APIs: Shared with selected business partners.

## API Best Practices 

- Encapsulate internal implementation details.
- Keep the interface simple and predictable.
- Design idempotent operations where possible.
	Idempotent means calling the same operation multiple times leads to the same final state as calling it once.
- Add pagination for list endpoints.
- Version APIs (`v1`, `v2`, etc.) to support change safely.
- Use async workflows for long-running operations.
- Return clear errors with proper HTTP status codes.
- Document everything well (Swagger/OpenAPI helps a lot).

## RPC Notes

RPC (Remote Procedure Call) lets a program execute a procedure on another machine as if it were local.

### Why teams use RPC

- Developer-friendly abstraction over network calls.
- Hides transport details so clients focus on business logic.
- Can support graceful error handling and retries.

### Trade-offs

- Can be slower due to network/serialization overhead.
- Reliability depends heavily on network behavior and infrastructure.

## REST API Notes

REST (Representational State Transfer) is an architectural style for web APIs, usually over HTTP, with a strong focus on resources and stateless communication.

### Core REST principles

- HATEOAS (Hypermedia as the Engine of Application State): clients navigate through links/actions provided by the server at runtime.
- Statelessness: each request contains all information needed to process it.
- Cacheability: responses should define whether they can be cached.
- Named resources: resources are identified with URIs and organized as collections/items.

### Resource design guidelines

- Use nouns, not verbs (`/users`, not `/getUsers`).
- Separate collections from single items (`/users` vs `/users/{id}`).
- Choose meaningful, consistent names.
- Keep identifiers unique and stable.

### Common HTTP methods

- `POST`: create a new resource.
- `GET`: read one resource or a collection.
- `PUT`: replace/update a resource (or create if absent, depending on design).
- `PATCH`: partially update a resource.
- `DELETE`: remove a resource.

## REST Design Flow (Lecture Checklist)

- Identify entities.
- Map entities to URIs.
- Define representations (usually JSON, sometimes XML).
- Assign HTTP methods to each operation.

## Final Takeaway

The best API designs are boring in a good way: consistent naming, predictable behavior, clear errors, and strong documentation. That combination improves developer experience and keeps systems maintainable as they scale.