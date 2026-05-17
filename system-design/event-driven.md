# Event-Driven Architecture

## What is an Event?

An event is a record of something that happened in the system — a fact, not a command.

- Immutable: it describes what occurred, not what should happen next
- Examples: `OrderPlaced`, `UserRegistered`, `PaymentFailed`

## What is Event-Driven Architecture?

An architectural style where components communicate by producing and consuming events rather than calling each other directly.

- Services are decoupled — producers don't know who consumes their events
- Communication is asynchronous
- The system reacts to things that happen rather than being driven by direct requests

## Core Components

### Emitters / Producers

Services that detect a state change and publish an event to a channel.

- Do not know who (if anyone) is listening
- Only responsible for emitting accurate, well-defined events

### Event Channel

The medium through which events travel from producers to consumers.

- Can be a message broker, event bus, or streaming platform (e.g. Kafka, RabbitMQ)
- Decouples producers and consumers in time and space

### Consumers

Services that subscribe to an event channel and react to relevant events.

- Can be one or many consumers per event
- Each consumer processes events independently

### Message Broker

Infrastructure that manages event channels.

- Stores messages in a queue between producers and consumers
- Handles delivery guarantees, retries, and routing
- Examples: RabbitMQ, Apache Kafka, AWS SQS

## CQRS (Command Query Responsibility Segregation)

Separates the read model from the write model.

- **Commands** — change state (write side)
- **Queries** — read state (read side)
- Often used alongside event-driven systems: writes emit events, read models are updated by consuming those events
- Allows each side to be optimized and scaled independently

## Event Sourcing

Instead of storing only the current state, the system stores the full sequence of events that led to it.

- Current state is derived by replaying events
- Provides a complete audit log by default
- Enables rebuilding state at any point in time
- Often paired with CQRS: events are the write side, projections are the read side

## Benefits

- **Loose coupling**: Producers and consumers evolve independently
- **Scalability**: Consumers can be scaled independently based on event volume
- **Resilience**: Producers are unaffected if a consumer is temporarily down; events queue up
- **Auditability**: Event logs provide a natural history of what happened in the system

## Trade-offs

- **Eventual consistency**: State changes propagate asynchronously — consumers may lag behind
- **Debugging complexity**: Tracing a flow across producers and consumers is harder than following a direct call chain
- **Ordering guarantees**: Ensuring events are processed in the correct order adds complexity
- **Duplicate handling**: Networks and retries can deliver events more than once; consumers must be idempotent

## Summary

Event-driven architecture decouples services by having them communicate through events rather than direct calls. Producers emit facts; consumers react to them asynchronously via a message broker. This enables loose coupling, independent scalability, and resilience at the cost of eventual consistency and increased observability complexity. CQRS and event sourcing are common companion patterns that extend this model to the data layer.
