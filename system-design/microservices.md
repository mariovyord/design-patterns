# Microservices

## Monolithic

A monolith bundles UI, backend logic, and data access into a single deployable unit.

### Benefits

- Simple to develop and reason about early on
- Easy to run and test locally
- Straightforward to deploy — one unit, one release
- No network overhead between internal components

### Trade-offs

- Change cycles are tied together — a small change requires rebuilding and redeploying the entire application
- Modular boundaries blur over time, making the codebase harder to maintain
- Scaling one part of the system means scaling everything
- Large teams stepping on each other's work; coordination overhead grows with size

## What is Microservices

An architectural approach where a single application is built as a collection of small, independently deployable services. Each service:

- Runs in its own process
- Communicates over lightweight protocols (e.g. HTTP/REST, message queues)
- Is built around a specific business capability
- Owns its own data and deployment lifecycle

Organized around business domains, not technical layers. Teams are cross-functional and own a service end-to-end ("you build it, you run it").

### Benefits

- **Independent deployability**: Services can be released on their own schedule
- **Targeted scalability**: Scale only the services under load, not the whole application
- **Fault isolation**: A failure in one service doesn't bring down the entire system
- **Technology flexibility**: Each service can use the best-fit language, framework, or database
- **Team autonomy**: Small teams move faster with clear ownership boundaries

### Trade-offs

- **Distributed systems complexity**: Network latency, partial failures, and eventual consistency become your problem
- **Operational overhead**: Many services to deploy, monitor, and debug
- **Data consistency**: No shared database means no simple transactions across service boundaries
- **Premature decomposition risk**: Splitting before domain boundaries are understood leads to wrong cuts that are expensive to fix
- **Testing complexity**: Integration testing across services is harder than testing a single process

## Summary

Microservices decompose a monolith into small, independently deployable services organized around business capabilities. This buys team autonomy and scalability but shifts complexity into the distributed systems layer. The pattern pays off when the system and organization are large enough to justify the overhead. A common recommendation: start with a well-structured monolith and extract services when boundaries become clear and the pain of coupling is real.
