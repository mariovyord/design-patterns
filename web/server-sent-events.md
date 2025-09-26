# Server-Sent Events (SSE)

Server-Sent Events (SSE) is a browser API for receiving automatic updates from a server via HTTP. SSE is unidirectional: the server pushes data to the client, but the client cannot send data back over the same connection.


## Receiving Events from the Server

To open a connection, create a new `EventSource` object with the URL of the event stream:

```js
const evtSource = new EventSource('/events');
```

For cross-origin requests:
```js
const evtSource = new EventSource('https://api.example.com/events', { withCredentials: true });
```

### Listening for Message Events
Messages without an event field are received as `message` events:
```js
evtSource.onmessage = (event) => {
	console.log('message:', event.data);
};
```

### Listening for Custom Events
Messages with an event field are received as named events:
```js
evtSource.addEventListener('ping', (event) => {
	const time = JSON.parse(event.data).time;
	console.log('ping at', time);
});
```

## Error Handling

If a network error or server error occurs, an error event is generated:
```js
evtSource.onerror = (err) => {
	console.error('EventSource failed:', err);
};
```

## Closing Event Streams

To close the connection manually:
```js
evtSource.close();
```

## Event Stream Format

The server must respond with `Content-Type: text/event-stream`. Each message is separated by two newlines. Fields include:

- `event`: Event type (optional)
- `data`: Message data
- `id`: Event ID
- `retry`: Reconnection time in ms

Example:
```
event: ping
data: {"time": "2025-09-26T12:00:00Z"}

data: This is a message

event: usermessage
data: {"username": "bob", "text": "Hi"}

```

## Browser Connection Limits

When not used over HTTP/2, browsers limit the number of open SSE connections per domain (typically 6). With HTTP/2, the limit is negotiated and defaults to 100.

## Browser Compatibility

SSE is supported in most modern browsers except Internet Explorer. Features like custom events, error handling, and credentials vary by version. See [MDN compatibility tables](https://developer.mozilla.org/en-US/docs/Web/API/EventSource#browser_compatibility) for details.

## Features

- Simple, persistent connection over HTTP/1.1.
- Automatic reconnection on network failure.
- Message IDs for resuming missed events.
- Text-based protocol, easy to implement.

## Limitations

- Only server-to-client communication.
- No binary data support (text only).
- Not supported in all browsers.
- Works only over HTTP/HTTPS, not over WebSockets.

## Use Cases

- Live notifications
- Real-time feeds (news, stock prices)
- Monitoring dashboards


## Summary

SSE is a lightweight solution for streaming updates from server to browser. It is best suited for scenarios where only the server needs to push data and simplicity is preferred over bidirectional communication.

## Further reading

- [MDN: Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)