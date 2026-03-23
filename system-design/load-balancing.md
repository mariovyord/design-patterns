# Large Scale Systems Architectural Building Blocks Notes

## Load Balancing

### What is Load Balancing?

Load balancing is the practice of distributing incoming network traffic across multiple servers or resources to ensure no single server becomes overwhelmed. The goal is to optimize resource use, maximize throughput, minimize response time, and ensure high availability.

TL;DR: Balance the load among group of servers.

### Types of Load Balancing

- DNS Load Balancing: Distributes traffic by resolving domain names to different IP addresses.
- Hardware Load Balancing: Uses dedicated hardware appliances to manage traffic distribution.
- Software Load Balancing: Uses software-based solutions (like Nginx, HAProxy) to distribute traffic.
- Global Server Load Balancing: Distributes traffic across geographically dispersed data centers.

## Message Brokers

Definition: A software architectural block that uses a queue data structure to store messages between producers and consumers. It decouples the sender and receiver, allowing for asynchronous communication.

Used inside our system and not externally.

Services can:
- Publish messages to a particular channel.
- Subscribe to channels to receive messages.
- Get notified when new messages arrive.

## API Gateways

Definition: A server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.

Follows a software architectural pattern called "API composition".

The client apps can call one single service

Benefits:
- Seamless internal modification of back-end services without affecting clients.
- Consolidating all security, authentication and authorization logic in one place.
- Request routing, composition and protocol translation.
- Static content and response caching.
- Monitoring and alerting.

Considerations:
- API Gateway should not contain any business logic.
- It can become a bottleneck if not designed properly.
- Avoid bypassing the API Gateway, as it can lead to security and maintenance issues.

## Content Delivery Networks (CDNs)

Definition: A globally distributed network of servers located in strategic places.
Main purpose: Speeding up the delivery of content to users by caching it closer to them.
Content publishing strategies:
- Pull: CDN fetches content from the origin server when a user requests it for the first time, then caches it for subsequent requests.
- Push: Content is proactively pushed to the CDN by the content provider.
