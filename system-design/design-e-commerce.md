# Design an e-commerce marketplace platform

## High level overview

Highly scalable e-commerce marketplace with two distinct user roles:

- **Merchants** can:
  - Sign up and manage their store
  - Upload and manage products
  - Sell products and track orders
  - View analytics on their storefront

- **Buyers** can:
  - Browse and search products
  - Purchase products (checkout)
  - Receive order updates and notifications

## Gathering Functional Requirements

Two separate solutions for merchants and buyers due to different access patterns and consistency requirements.

### Clarifying questions and decisions

**Merchants:**
- What type of products? -> Physical products only (title, description, categories, price, images, inventory count)
- Do merchants need real-time analytics? -> Yes, real-time visitors + historical/projected stats

**Buyers:**
- Can anyone buy without an account? -> No, account required for checkout; browsing is public
- Reviews and ratings? -> Out of scope for v1
- Platforms? -> Web and mobile (iOS/Android)

### Merchant requirements

- Account: signup, login
- Product management: create, read, update, delete products
- Inventory management: track stock levels
- Product assets: image upload to object store
- Analytics: real-time visitor counts, historical and projected sales stats

### Buyer requirements

- Web UI + mobile app
- Storefront: browse products, view product detail
- Search: full-text product search with filters (category, price range)
- Checkout:
  - View cart and bill with taxes
  - Complete purchase (integrate external payment provider)
  - Order confirmation
  - Order status updates via push notifications
- Delivery: integrate external shipping/delivery provider

### Sequence diagram

**Checkout flow:**
```
Buyer -> API Gateway -> Webapp Service -> Order Service
Order Service -> Payment Service (external) -> [payment confirmed]
Order Service -> Inventory Service        -> [decrement stock]
Order Service -> Shipping Service (ext.)  -> [create shipment]
Order Service -> Notifications Service    -> [push notification to buyer]
Order Service -> Orders DB (event log)    -> [persist event]
```

## Gathering Non-functional Requirements

### Merchants (write-intensive, consistency-critical)

| Requirement | Decision | Rationale |
|---|---|---|
| Scalability | Lower priority | Merchant count grows slowly vs buyer traffic |
| Performance (latency) | Lower priority | Merchants tolerate slightly slower writes |
| Consistency vs Availability | **Consistency** (CP) | Inventory and product data must be accurate |
| High Availability | Required | Merchants should not lose data on failure |

### Buyers (read-intensive, availability-critical)

| Requirement | Decision | Rationale |
|---|---|---|
| Scalability | High priority | Traffic spikes (sales, holidays) |
| Performance (latency) | High priority | Slow storefront = lost sales |
| Consistency vs Availability | **Availability** for storefront, **Consistency** for checkout | Stale product listings are acceptable; stale inventory/payment data is not |
| High Availability | Required | Storefront downtime = direct revenue loss |

## Defining the System API

### Merchant API

```
POST   /merchants/signup
POST   /merchants/login

POST   /products                  - create product
GET    /products/:id              - get product
PUT    /products/:id              - update product
DELETE /products/:id              - delete product

POST   /products/:id/images       - upload product image

GET    /analytics/visitors        - real-time visitor count
GET    /analytics/sales           - historical + projected sales stats
```

### Buyer API

```
GET    /products                  - browse products (paginated)
GET    /products/:id              - product detail
GET    /products/search?q=...     - full-text search with filters

POST   /cart                      - add item to cart
GET    /cart                      - view cart
DELETE /cart/:itemId              - remove item from cart

POST   /checkout                  - initiate checkout (returns bill + taxes)
POST   /orders                    - confirm and place order
GET    /orders/:id                - get order status
```

## Architecture: Functional Requirements

### Merchant side (write-intensive)

```
Merchant App
  -> API Gateway
     -> Product Management Service -> SQL DB (source of truth for products)
        -> Object Store             (product images/assets)
        -> Inventory Service        -> Key/Value Store (fast stock reads/writes)
        -> [on product change] -> Message Broker -> Product Service (read model)
```

### Buyer storefront (read-intensive)

```
Web App / Mobile App
  -> API Gateway
     -> Webapp Service
        -> Product Search Service -> Document Store + Search Engine (e.g. Elasticsearch)
```

### CQRS pattern

```
Merchants = write-intensive + consistency  -->  SQL DB (CP)
Buyers    = read-intensive  + availability -->  Document Store (AP)

Sync: Message Broker propagates product changes from SQL DB to Document Store
```

### Checkout pipeline

```
Buyer
  -> Checkout Service -> Taxes Service      -> NoSQL DB
                      -> Payment Service    -> External Payment Provider
                      -> Order Service      -> Orders DB (event sourcing)
                      -> Shipping Service   -> External Shipping Provider
                      -> Notifications Service -> Push Notification Provider
```

### Merchant analytics

```
Events (page views, purchases)
  -> Message Broker
     -> Analytics Service (Lambda Architecture)
        -> Speed layer:  streaming processor -> real-time metrics store
        -> Batch layer:  batch processor     -> historical/projected stats store
```

### Summary of architectural decisions

| Decision | Rationale |
|---|---|
| Microservice architecture | Independent scaling and deployment per domain (products, orders, payments, etc.) |
| CQRS | Separates write-intensive CP database (merchants) from read-intensive AP database (buyers) |
| Document store + search engine | Flexible schema for product catalog; full-text search capability |
| Event sourcing for orders | Failure recovery, audit trail, and replay capability |
| Async processing via message broker | Decouples services; improves resilience (e.g. notifications don't block checkout) |
| Synchronous calls for payment/inventory | Consistency required — must confirm payment and decrement stock before confirming order |
| Lambda architecture for analytics | Combines real-time (speed layer) with accurate historical (batch layer) data |

## Architecture: Non-functional Requirements

| Concern | Solution |
|---|---|
| Traffic spikes (buyers) | Horizontal auto-scaling on storefront and search services |
| Load distribution | Load balancer in front of all services |
| Static asset latency | CDN for product images and frontend static assets |
| Search/browse latency | In-memory cache (e.g. Redis) for hot product queries |
| Fault tolerance / geo-redundancy | Multi data center deployment with failover |
| Merchant data durability | SQL DB with replication; event sourcing for orders |

## Summary

This design separates merchant (write-heavy, consistency-first) and buyer (read-heavy, availability-first) workloads using **CQRS**, with a message broker syncing data between them. The storefront is optimized for low latency via caching and CDN. The checkout pipeline is synchronous where correctness matters (payment, inventory) and asynchronous where it does not (notifications, analytics). **Event sourcing** on orders provides auditability and failure recovery. A **lambda architecture** powers merchant analytics with both real-time and batch-processed data.
