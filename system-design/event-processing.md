# Event Processing Strategies

## Tumbling Window

A fixed-size, non-overlapping window. Time is divided into equal, consecutive chunks and each event belongs to exactly one window.

- Windows do not overlap
- No event is counted twice
- Example: aggregate metrics every 5 minutes — `[0:00–5:00)`, `[5:00–10:00)`, `[10:00–15:00)`
- Use case: hourly reports, periodic billing summaries

## Sliding Window

A fixed-size window that moves continuously forward in time. Windows overlap, so an event can appear in multiple windows.

- Window size is fixed, but it slides with every new event (or at a fixed interval)
- Captures recent activity at any point in time
- Example: "requests in the last 60 seconds" — recalculated every second
- Use case: real-time rate limiting, rolling averages, anomaly detection

## Hopping Window

A fixed-size window that advances by a set hop interval smaller than the window size. A hybrid between tumbling and sliding.

- Windows overlap by `(window size − hop size)`
- Each event can appear in multiple windows
- Example: 10-minute window, hopping every 5 minutes — `[0:00–10:00)`, `[5:00–15:00)`, `[10:00–20:00)`
- Use case: smoothed metrics where full overlap of a sliding window is too expensive

## Session Window

A dynamic window that groups events by activity, with no fixed size. A new window opens when an event arrives and closes after a configurable period of inactivity (the session gap).

- Window size varies — determined by actual user/system activity
- Two events are in the same session if the gap between them is less than the session timeout
- Example: group a user's clicks into sessions with a 30-minute inactivity timeout
- Use case: user session analytics, tracking workflows with variable duration

## Time in Stream Processing and Handling Late Arrival of Events

Stream processing involves two distinct notions of time:

- **Event time**: when the event actually occurred, recorded in the event payload
- **Processing time**: when the event arrives at the processing system

These diverge due to network delays, retries, and out-of-order delivery. Processing based on event time is more accurate but harder, because events can arrive late.

### Watermarks

A watermark is a marker that estimates how far behind real time the event stream is. It signals: "all events up to time T have likely arrived."

- When the watermark advances past a window's end time, that window is finalized and emitted
- Watermarks are a trade-off between latency (emit early) and completeness (wait longer)

### Late Arrivals

Events that arrive after the watermark has passed their window are considered late.

Strategies for handling late events:

- **Drop**: ignore events that arrive too late — simple but loses data
- **Recompute**: update the window result when a late event arrives — more accurate but complex
- **Side output**: route late events to a separate stream for separate handling or auditing

The acceptable lateness threshold is a tunable parameter balancing result accuracy against output delay.

## Summary

Event processing strategies define how a stream of events is grouped into meaningful units for computation. Tumbling windows divide time into equal non-overlapping buckets. Sliding windows provide continuously updated views of recent activity. Hopping windows balance overlap and cost. Session windows adapt dynamically to user activity patterns. Across all strategies, the distinction between event time and processing time is critical — watermarks and late-arrival handling are the primary tools for producing accurate results despite out-of-order and delayed events.
