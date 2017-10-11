# ThingWS

Simple proof-of-concept for a "websocket of things connected to serial ports". The idea is that these things require no input. On launch they immediately begin to send messages. In general, these messages will be from sensors. The goal of thingws is to find these things on local serial ports and funnel their messages to a websocket that any interested apps can connect to.

First thing to do is create things that connect to a serial port. Using an Arduino is one good way of doing this and there's a test sketch for such a thing included in `examples/arduinoThing`. Load that sketch on an Arduino.

Next, start the thingws server.
```
npm install
node thingwsserver
```

The server will automatically look for and continuously scan local serial ports for things that might be connected. If you have serialports you want thingws to ignore, just edit `thingwsserver.js` and pass them in like this:
```
const serialMonitor = new SerialMonitor.SerialMonitor( {portsToExclude:['/dev/tty.Bluetooth-Incoming-Port', '/dev/tty.JaybirdX3-SPPDev']} );
```

When you connect your Arduino to the computer thingws server is running on, it will automatically find it and begin processing messages from it.

There are two p5-based examples you can open in a browser. Open each example in a different browser tab. The two examples are identical except that the "drone" example filters for "drone" messages from thingws and the "synth" example filters for "synth" messages.
```
file:///path/to/thingws/examples/p5.droneSketch/index.html
file:///path/to/thingws/examples/p5.synthSketch/index.html
```
