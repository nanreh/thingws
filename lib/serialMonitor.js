"use strict";

const EventEmitter = require('events');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

class PortMonitor extends EventEmitter {

  constructor (serialPortDetails) {
    super();
    this.serialPortDetails = serialPortDetails;
    this.serialPort = null;
    this.lastData = 0;
    this.start();
  }

  start() {
    const self = this;
    if (!this.serialPort) {
      this.serialPort = new SerialPort(this.serialPortDetails.comName, { autoOpen: false });
      this.serialPort.on('close', function() { self.emit('close'); })
    }
    if (!this.serialPort.isOpen) {
      this.serialPort.open(function(err) {
        if (err) {
          console.log(`Error opening port ${self.serialPortDetails.comName}: ${err}`);
          return;
        }
        console.log(`Serial port ${self.serialPortDetails.comName} is open`);
        const parser = self.serialPort.pipe(new Readline({ delimiter: '\r\n' }));
        parser.on('data', function(data) {
          //console.log(`data received from port ${self.serialPortDetails.comName}: ${data}`);
          self.emit('data', data);
          self.lastData = new Date().getTime();
        });
      });
    }
  }

  toString() {
    return `PortMonitor on ${this.serialPortDetails.comName}`;
  }
}

class SerialMonitor extends EventEmitter {

  constructor ( { portsToExclude = [], autoStart = true, scanIntervalSeconds = 10 } = {}) {
    super();
    this.scanIntervalSeconds = scanIntervalSeconds
    this.excludeSet = new Set();
    this.portMonitors = {};
    if (typeof portsToExclude !== "undefined") {
      portsToExclude.forEach((portName) => { this.excludeSet.add(portName); });
    }
    if (autoStart) {
      this.start();
    }
  }

  start() {
    console.log("Scanning serial ports...");
    const self = this;
    SerialPort.list(function(err, foundPorts) {
      if(err) {
        console.log(`Error listing ports: ${err}`);
        return;
      }
      foundPorts.forEach((port) => {
        if (!self.excludeSet.has(port.comName) && !(port.comName in self.portMonitors)) {
          console.log(`Adding port monitor for ${port.comName}`);
          const newPortMonitor = new PortMonitor(port);
          newPortMonitor.on('data', function(data) {
            //console.log(`Data from ${newPortMonitor}: ${data}`);
            self.emit('data', data);
          });
          newPortMonitor.on('close', function() {
            console.log(`${newPortMonitor} has closed`);
            delete self.portMonitors[port.comName];
          })
          self.portMonitors[port.comName] = newPortMonitor;
        }
      });
      console.log(`Current serial port monitors: [${Object.keys(self.portMonitors).join(",")}]`);
      setTimeout(() => { self.start() }, self.scanIntervalSeconds * 1000);
    });
  }

  get excludes() {
    return this.excludeSet;
  }
}

exports.SerialMonitor = SerialMonitor;
