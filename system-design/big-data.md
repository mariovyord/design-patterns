# Big Data

## Introduction

Big Data refers to datasets so large or complex that traditional databases and tools can't handle them efficiently.

### Volume
The sheer amount of data — think billions of rows, terabytes or petabytes of logs, transactions, or events generated daily.

### Velocity
The speed at which data is generated and must be processed — e.g. stock prices, IoT sensors, or social media feeds updating thousands of times per second.

### Visualizations
Raw big data is useless without insight. Dashboards, charts, and reports turn processed data into decisions. Tools like Grafana or Kibana are common examples.

## Big Data Processing Strategies

### Introduction
There are two main ways to process big data: wait and process in bulk (batch), or process immediately as it arrives (real-time). The right choice depends on how fresh the data needs to be.

### Batch Processing
- Process large chunks of data at scheduled intervals (e.g. every hour, nightly).
- Simple and cost-effective, but results are delayed.
- Example: generating a daily sales report from all transactions.
- Tools: Apache Hadoop, Apache Spark.

**Data Fusion**
Batch jobs often combine data from multiple sources (databases, logs, third-party feeds) into a single unified dataset. This is called data fusion.
- Example: merging customer records from a CRM with purchase history from an e-commerce DB to build a complete user profile.
- The batch window gives enough time to join, clean, and reconcile data from slow or mismatched sources.

**Search Indexing**
Batch processing is commonly used to build or rebuild search indexes over large datasets.
- After processing, the output is loaded into a search engine so users can query it.
- Example: nightly re-indexing of product catalog changes into Elasticsearch or Apache Solr.
- This is why search results on some platforms can lag by hours after a change is made.

### Real-Time Processing
- Process each event the moment it arrives, with very low latency.
- More complex and expensive, but results are immediate.
- Example: detecting a fraudulent transaction as it happens.
- Tools: Apache Kafka, Apache Flink, Apache Storm.

## Lambda Architecture

### Introduction
Lambda Architecture combines batch and real-time processing to get the best of both worlds — accuracy from batch and speed from real-time. It was designed to handle massive data while keeping results up to date.

```
Raw Data
   │
   ├──► Batch Layer  ──► Pre-computed views  ──┐
   │                                           ├──► Serving Layer ──► Query
   └──► Speed Layer  ──► Real-time views    ──┘
```

### Batch Layer
- Stores the full, immutable history of raw data.
- Periodically reprocesses everything to produce accurate, comprehensive views.
- Slow to update (hours/days), but highly accurate and fault-tolerant.
- Example tool: Hadoop MapReduce.

### Speed Layer
- Handles only the most recent data that the batch layer hasn't processed yet.
- Produces approximate or incremental results with very low latency.
- Gets replaced by the next batch run, so errors are self-correcting.
- Example tool: Apache Storm, Kafka Streams.

### Serving Layer
- Merges the output of the batch and speed layers.
- Responds to queries by combining pre-computed batch views with recent real-time views.
- Example tool: Apache HBase, Cassandra.


## Summary

| Concept | Key Point |
|---|---|
| Big Data | Too large/fast for traditional tools |
| Volume | How much data |
| Velocity | How fast data arrives |
| Batch Processing | Process in bulk, delayed results |
| Real-Time Processing | Process instantly, higher complexity |
| Lambda Architecture | Combines batch + real-time for accuracy and speed |
| Batch Layer | Full history, slow but accurate |
| Speed Layer | Recent data only, fast but approximate |
| Serving Layer | Merges both layers to answer queries |
