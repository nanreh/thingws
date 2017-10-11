var latestMessage = "None yet!";

function setup() {
  createCanvas(400, 300);
  thingWs = new ThingWs(); // make a new instance of the ThingWs library
  thingWs.on('data', dataHandler); // callback for when new data arrives
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("latest message: " + latestMessage, 30, 30);
}

function dataHandler(data) {
  // Pretend we're only interested in "drone" messages. We check each incoming
  // message and if it begins with the characters we're expecting we process
  // it, otherwise we ignore it.
  // This is also important in case we get an incomplete or nonsense message,
  // which can happen if we connect to a port mid-message. In that case, we also
  // ignore the partial message.
  if (data.startsWith("drone:")) {
    latestMessage = data;
  } else {
    //println("ignoring message: " + data);
  }
}
