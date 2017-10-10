function ThingWs() {
  var self = this;
  self.events = {};

  const socket = new WebSocket('ws://localhost:8081');
  // Connection opened
  socket.addEventListener('open', function (event) {
      console.log("websocket is open");
  });
  // Listen for messages
  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      self.emit('data', event.data);
  });
}

ThingWs.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = [];
    }
    this.events[event].push(listener);
};

ThingWs.prototype.emit = function (event) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
            listeners[i].apply(this, args);
        }
    }
};
