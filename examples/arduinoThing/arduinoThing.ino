/**
 * Simple Arduino sketch that sends messages on serial. We have two possible
 * message types: drone and synth. We loop forever, flipping a coin and sending
 * one of our two message types.
 */

void setup()
{
  Serial.begin(9600);
  randomSeed(analogRead(0));
}

/**
 * Our message format is simple: each message consists of one or more values separated by a : character.
 * The first value in any message is a message type string which tells us what kind of message we
 * are parsing.
 * The following values will vary depending on the type of message we are parsing.
 * I've included two made up message types to exercise the system a bit.
 */

/**
 * Pretend we have a message type "drone" that includes four float values.
 */
String buildDroneMessage(float x, float y, float z, float cap) {
  String buf;
  buf += "drone:";      // Our message type string
  buf += String(x, 1);
  buf += ":";
  buf += String(y, 1);
  buf += ":";
  buf += String(z, 1);
  buf += ":";
  buf += String(cap, 1);
  return buf;
}

/**
 * Pretend we have a message type "synth" that includes three float values.
 */
String buildSynthMessage(float sample1, float sample2, float sample3) {
  String buf;
  buf += "synth:";      // Our message type string
  buf += String(sample1, 1);
  buf += ":";
  buf += String(sample2, 1);
  buf += ":";
  buf += String(sample3, 1);
  return buf;
}

void loop()
{
  /**
   * In practice, a single Arduino sketch might send only one type of message... but for the sake of
   * testing things out, this sketch flips a coin and chooses between two of our made up message types.
   */
  if( 0 == random(0,2) ) {
    // Send a fake drone message
    float x = random(1, 1000) / 100.0;
    float y = random(1, 1000) / 100.0;
    float z = random(1, 1000) / 100.0;
    float cap = random(1, 1000) / 100.0;
    Serial.println(buildDroneMessage(x, y, z, cap));
  } else {
    // send a fake synth message
    float sample1 = random(1, 1000) / 100.0;
    float sample2 = random(1, 1000) / 100.0;
    float sample3 = random(1, 1000) / 100.0;
    Serial.println(buildSynthMessage(sample1, sample2, sample3));
  }
  delay(50);
}
