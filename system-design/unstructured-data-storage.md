# Unstructured Data Storage

**Definition**\
Data that does not follow a predefined schema, structure, or model.

**Blob (Binary Large Object)**\
A collection of binary data stored as a single entity.


## Solutions

### Distributed File System (DFS)

A system that stores and manages files across multiple machines,
providing scalability and redundancy.

### Object Storage

Stores data as objects rather than files or blocks.

**Object structure:** - Identifier - Value (data) - Metadata - ACL
(Access Control List)

**Key concepts:** - Objects are stored in **containers** (also called
buckets) - Cloud solutions typically offer **storage tiers / classes**
based on access frequency and cost


## Azure Blob Storage

Azure Blob Storage is Microsoft's cloud-based object storage solution,
optimized for storing large amounts of unstructured data (e.g., text or
binary).

### Key Characteristics

**Scalable, durable, and highly available** - Designed for massive
scale - \~16 nines durability with geo-replication options

**Highly secure** - Integration with Microsoft Entra ID - Role-Based
Access Control (RBAC) - Encryption at rest - Advanced threat protection

**Optimized for data lakes** - Supports hierarchical namespace -
Multi-protocol access for analytics workloads

**Comprehensive data management** - Lifecycle management policies -
Fine-grained access control - WORM (Write Once, Read Many) support


## Common Use Cases

-   Serving images or documents directly to browsers
-   Storing files for distributed access
-   Video and audio streaming
-   Logging (append scenarios)
-   Backup, restore, and disaster recovery
-   Data storage for analytics workloads


## Access Methods

Data in Blob Storage can be accessed globally via HTTP/HTTPS using:

-   Azure Storage REST API
-   Azure CLI / PowerShell
-   SDKs (client libraries) for:
    -   .NET
    -   Java
    -   Node.js
    -   Python
    -   Go

Additional access options: - **SFTP** (SSH File Transfer Protocol) -
**NFS 3.0** (mounting containers as file systems)


## Core Resources

Azure Blob Storage is built around three main resource types:

### 1. Storage Account

-   Provides a unique namespace in Azure
-   Forms the base of all object URLs

### 2. Container

-   Logical grouping of blobs (similar to a directory)
-   Unlimited containers per account
-   Unlimited blobs per container

### 3. Blob

The actual stored data. Three types:

-   **Block blobs**
    -   Store text and binary data
    -   Composed of blocks
    -   Max size: \~190.7 TiB
-   **Append blobs**
    -   Optimized for append operations
    -   Ideal for logging scenarios
-   **Page blobs**
    -   Support random access
    -   Max size: 8 TiB
    -   Used for virtual machine disks (VHDs)


## Notes on...

-   Object storage ≠ file system --- it's flat, not hierarchical (unless
    layered like in data lakes)
-   Great for scalability and durability, not low-latency file
    operations
-   Storage tiers matter a lot for cost optimization


## Read More

-   https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction
