var serial; // variable to hold an instance of the serialport library
var portName = "/dev/cu.usbmodem1421"; // fill in your serial port name here
var inData; // for incoming serial data

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
  text("incoming value: " + inData, 30, 30);
}

function keyTyped() {
    var outByte = key;
    console.log("Sending " + outByte);
    //serial.write(Number(outByte)); // Send as byte value
    serial.write(outByte); // Send as a string/char/ascii value
}

function dataHandler(data) {
  // read a byte from the serial port:
  println("data: " + data);
  inData = data;
}
