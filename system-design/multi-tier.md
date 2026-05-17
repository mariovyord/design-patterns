# Multi-tier Architecture

## Client-Server Model

A fundamental architectural pattern where responsibilities are split between service providers (servers) and service consumers (clients).

- The **client** initiates requests and handles presentation/interaction.
- The **server** processes requests and returns responses.
- Communication happens over a network using defined protocols (e.g. HTTP, TCP).

This separation allows servers to be scaled, updated, or replaced independently of clients.

## Not Skipping Tiers

Each request must pass through tiers in order — a tier cannot communicate directly with a non-adjacent tier.

- Enforces separation of concerns.
- Prevents tight coupling between presentation and data layers.
- Makes the system more maintainable and secure (e.g. clients never access the database directly).

## 3-Tier Architecture

The most common multi-tier pattern. Divides the system into three distinct layers.

### Presentation Tier

The topmost layer — what the user interacts with.

- Examples: web app, mobile app, desktop GUI.
- Responsible only for displaying data and capturing user input.
- Contains **no business logic** — delegates all processing to the application tier.

### Application Tier

The middle layer — the core of the system.

- Also called the **Logic Tier** or **Business Tier**.
- Processes requests from the presentation tier.
- Applies business rules, performs calculations, orchestrates workflows.
- Communicates with the data tier to read/write data.
- Acts as the single source of truth for all application behavior.

### Data Tier

The bottom layer — responsible for persistent storage.

- Examples: relational databases (PostgreSQL, MySQL), NoSQL stores, object/asset storage (S3).
- Receives queries/commands from the application tier only.
- Handles data persistence, retrieval, and integrity.

## Benefits

- **Scalability**: Each tier can be scaled independently based on load.
- **Maintainability**: Changes in one tier don't require changes in others, as long as interfaces remain stable.
- **Security**: Sensitive data is protected behind the application tier; clients never access the data tier directly.
- **Reusability**: Multiple presentation clients (web, mobile) can reuse the same application tier.
- **Separation of concerns**: Teams can work on different tiers independently.

## Trade-offs

- **Monolithic application tier**: The logic tier often runs as a single deployable unit, which can become large and hard to manage over time.
- **Single unit deployment**: The entire application tier must be deployed together, increasing risk and slowing release cycles (low velocity).
- **High CPU and memory consumption**: The application tier handles all business logic, which can become a bottleneck under heavy load.
- **Latency**: Requests pass through multiple layers, adding overhead compared to a simpler single-tier design.
- **Operational complexity**: More moving parts to deploy, monitor, and maintain.

## Summary

Multi-tier architecture separates a system into distinct layers — typically presentation, application, and data — each with a clear responsibility. This improves maintainability and scalability but introduces operational complexity and can result in a monolithic application tier. It is a foundational pattern that many modern architectures (e.g. microservices) evolved from.
