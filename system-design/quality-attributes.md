# Quality Attributes

## Performance

### Response Time

Response time = Processing Time + Wasting time (Latency)

Response time is the time it takes for a system to respond to a request. It consists of two components: processing time, which is the time taken to execute the necessary operations, and latency, which is the time spent waiting for resources or data.

Response time is a critical quality attribute that directly impacts user experience. A system with low response time is perceived as fast and responsive, while a system with high response time can lead to frustration and dissatisfaction.

### Throughput

Amount of work done in a given time period. For example, the number of requests processed per second.

Measured in requests per second (RPS) or transactions per second (TPS). High throughput indicates that the system can handle a large volume of work efficiently.

## Measuring Response Time Correctly

## Response time distribution

What is the metric?

The average response time can be misleading because it doesn't capture the variability in response times. Instead, it's important to look at the distribution of response times, including percentiles (e.g., 95th percentile) to understand how the system performs under different conditions.

Percentile distribution helps identify outliers and understand the tail latency, which can significantly impact user experience.

Tail Latency - The small percentage of response times from a system, that take the longest in comparison to the rest of the values.

Performance degradation point - The point at which the system's performance starts to degrade significantly, often due to increased load or resource contention.

## Scalability

The measure of a system's ability to handle increasing amount of work in an easy and cost-effective manner by adding resources to the system.

Types of scalability:

- Vertical scalability - adding resources ir updating existing resources on a single machine (e.g., upgrading CPU, adding more RAM).
- Horizontal scalability - adding more machines to the system (e.g., adding more servers to a cluster).
- Team scalability - the ability of a team to grow and manage a larger codebase or project effectively.

## Availability

The proportion of time a system is operational and accessible when required for use. It is often expressed as a percentage, with higher percentages indicating greater availability.

> Availability = Uptime / (Uptime + Downtime)

- Uptime - The amount of time a system is operational and accessible.
- Downtime - The amount of time a system is not operational or accessible.
- MTTR (Mean Time to Recovery) - The average time it takes to recover from a failure or downtime.
- MTBF (Mean Time Between Failures) - The average time between failures of a system.

Another formula for calculating availability is:

> Availability = MTBF / (MTBF + MTTR) 

## Fault Tolerance and High Availability

Sources of failure:

- Human error
- Software error 
- Hardware failure

Fault tolerance is the ability of a system to continue operating properly in the event of a failure. It involves designing the system to handle and recover from failures gracefully, minimizing downtime and ensuring that critical functions remain available.

Tactics for achieving fault tolerance include:
- Failure prevention:
    - Redundancy and Replication - Implementing redundant components or systems to ensure that if one fails, another can take over.
- Failure detection and Isolation:
    - Monitoring
- Recovery:
    - Stop sending traffic to the failed component
    - Restart the system
    - Rollback to a previous stable state

## SLA, SLO, and SLI

- SLA (Service Level Agreement) - A formal agreement between a service provider and a customer that defines the expected level of service, including performance metrics, availability, and other quality attributes.
- SLO (Service Level Objective) - A specific, measurable goal that a service provider aims to achieve in terms of performance, availability, or other quality attributes. SLOs are often defined as part of an SLA.
- SLI (Service Level Indicator) - A specific metric used to measure the performance or availability of a service. SLIs are used to track progress towards meeting SLO targets and to ensure that the service is meeting the agreed-upon levels of service defined in the SLA.

Important considerations: 

- We should't take every SLI that we can measure in our system and define an objective for it. We should focus on the most critical SLIs that directly impact user experience and business goals.
- Promising fewer SLOs is better
- Set realistic goals with a budget for error
- Create a recovery plan for when SLOs are not met, including clear communication with stakeholders and customers about the issue and the steps being taken to resolve it.