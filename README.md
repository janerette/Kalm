<img align="left" src="http://i231.photobucket.com/albums/ee109/FeD135/kalm_logo_bolded.png">
# Kalm
*The Socket Optimizer*

[![Kalm](https://img.shields.io/npm/v/kalm.svg)](https://www.npmjs.com/package/kalm)
[![Build Status](https://travis-ci.org/fed135/Kalm.svg?branch=master)](https://travis-ci.org/fed135/Kalm)
[![Dependencies Status](https://david-dm.org/fed135/Kalm.svg)](https://www.npmjs.com/package/kalm)
[![Code Climate](https://codeclimate.com/github/fed135/Kalm/badges/gpa.svg)](https://codeclimate.com/github/fed135/Kalm)
[![Gitter](https://img.shields.io/gitter/room/fed135/kalm.svg)](https://gitter.im/fed135/Kalm)

---

Simplify and optimize your Socket communications with:

- Easy-to-use single syntax for all protocols
- Configurable packet bundling (High-level Naggle's algorith implementation)
- Multiplexing for all protocols
- Ultra-flexible and extensible, load your own adapters and encoders

---

## Compatibility

 * NODE >= 6.0.0


## Installation

    npm install kalm


## Usage

**Server**

```node
    var Kalm = require('Kalm');

    // Create a server, a listener for incomming connections
    var server = new Kalm.Server({
      port: 6000,
      adapter: 'udp',
      encoder: 'json',
      channels: {
        messageEvent: function(data) {               // Handler - new connections will register to these events
          console.log('User sent message ' + data.body);
        }
      }
    });

    // When a connection is received, send a message to all connected users
    server.on('connection', function(client) {    // Handler, where client is an instance of Kalm.Client
      server.broadcast('userEvent', 'A new user has connected');  
    });
    
```

**Client**

```node
    // Create a connection to the server
    var client = new Kalm.Client({
      hostname: '0.0.0.0', // Server's IP
      port: 6000, // Server's port
      adapter: 'udp', // Server's adapter
      encoder: 'json', // Server's encoder
      channels: {
        'userEvent': function(data) {
          console.log('Server: ' + data);
        }
      }
    });

    client.send('messageEvent', {body: 'This is an object!'});	// Can send Objects, Strings or Buffers 
    client.subscribe('someOtherEvent', function() {}); // Can add other handlers dynamically 

```
## Documentation

[API docs](https://fed135.github.io/kalm.github.io)


## Performance analysis

**Requests per minute**

<img src="http://i231.photobucket.com/albums/ee109/FeD135/perf_v1.png">

*Benchmarks based on a single-thread queue test with Kalm default bundling settings*

**Bytes transfered**

<img src="http://i231.photobucket.com/albums/ee109/FeD135/transfered_v1.png">

*Number of protocol overhead bytes saved per request*


## Adapters

Allow you to easily use different socket types, hassle-free

- ipc (bundled)
- tcp (bundled)
- udp (bundled)
- [kalm-websocket](https://github.com/fed135/kalm-websocket)
- [kalm-webrtc](https://github.com/fed135/kalm-webrtc)


## Encoders

Encodes/Decodes the payloads

- json (bundled)
- [kalm-msgpack](https://github.com/fed135/kalm-msgpack)
- [kalm-snappy](https://github.com/fed135/kalm-snappy)
- [kalm-protocol-buffer](https://github.com/fed135/kalm-msgpack)


## Loading custom adapters

The framework is flexible enough so that you can load your own custom adapters, encoders or middlewares - say you wanted support for protocols like zmq, WebSockets or have yaml encoding.

```node
    // Custom adapter loading example
    var Kalm = require('Kalm');
    var WebRTC = require('kalm-webrtc');
    var msgpack = require('kalm-msgpack');

    Kalm.adapters.register('webrtc', WebRTC);
    Kalm.encoders.register('msg-pack', msgpack);

    var server = new Kalm.Server({
      port: 3000,
      adapter: 'webrtc',
      encoder: 'msg-pack'
    });
```


## Run tests

    npm test


## Logging

By default, all Kalm logs are hidden. They can be enabled through the DEBUG environement variable. See [debug](https://github.com/visionmedia/debug) for more info.

    export DEBUG=kalm

You can dump the unsent packets for recovery purposes by calling

    <Server>.dump();

You can also gather Naggling optimization statistics by piping `kalm:stats`

    export DEBUG=kalm:stats myApp.js > stats.log

To calculate Naggling gains alone in bytes, you can multiply the `packets` property by the full protocol header.


## Roadmap

[Milestones](https://github.com/fed135/Kalm/milestones)


## Contributing

I am looking for contributors to help improve the codebase and create adapters, encoders and middleware.
Email me for details.


## Presentations

- [JS Montreal](http://www.meetup.com/js-montreal/events/224538913/) - June 14th 2016