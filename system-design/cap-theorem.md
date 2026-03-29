## CAP Theorem

In a distributed system, when a network partition happens, you cannot guarantee both consistency and availability. You have to choose one.

The CAP theorem (also known as Brewer’s theorem) was introduced by Eric Brewer in 1998 and later formally proven in 2002.

### The Three Parts of CAP

**Consistency (C)**  
Every read returns the most recent write or an error. All clients see the same data regardless of which node they connect to.  
In practice, this often requires data to be replicated across nodes before a write is considered successful.

**Availability (A)**  
Every request receives a response, even if it does not contain the most recent data.  
This definition is specific to CAP and is different from “high availability” in general system design.

**Partition Tolerance (P)**  
The system continues to operate despite network issues such as dropped or delayed messages between nodes.  
In distributed systems, this is not optional—network failures will happen.

### The Trade-off

When a partition occurs, a system must choose:

- Cancel the operation → preserve consistency, lose availability
- Proceed with the operation → preserve availability, risk inconsistency

In normal conditions (no partition), systems can provide both consistency and availability.

### CP vs AP Systems

- **CP (Consistency + Partition Tolerance)**  
  Prioritizes correct data. May return errors or timeouts during network issues.

- **AP (Availability + Partition Tolerance)**  
  Always responds, but data may be stale.

Examples often cited:
- CP: systems that prioritize correctness (e.g. some RDBMS setups, MongoDB/Redis in certain modes)
- AP: Cassandra, CouchDB, ScyllaDB

There are no real-world systems that are strictly CA in distributed environments.

### Additional Notes

- CAP consistency is different from ACID consistency in relational databases.
- Modern distributed databases often allow tuning between consistency and availability.
- Brewer later clarified that the “pick 2 of 3” idea is misleading — the trade-off only matters during partitions.

### Related Idea: PACELC

The PACELC theorem extends CAP:

- If a Partition (P) happens → trade-off between Availability (A) and Consistency (C)
- Else (E) → trade-off between Latency (L) and Consistency (C)

This better reflects real-world systems, where trade-offs exist even without failures.
