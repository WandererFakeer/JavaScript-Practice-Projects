import NOTE_DETAILS from "./data.js";

const audioContext = new AudioContext();

// Render
function render() {
  NOTE_DETAILS.forEach((obj) => {
    const noteEl = document.querySelector(`[data-note=${obj.note}]`);
    noteEl.classList.toggle("active-key", obj.active);
  });
}

// Get the details of the pressed key
function getPressedKeyDetails(array, keyboardKey) {
  return array.find((obj) => obj.key.toLowerCase() === keyboardKey.toLowerCase());
}

// Create and attach audio
function attachAudio(activeNote, volume) {
  // Create volume controller
  const volumeNode = audioContext.createGain();

  // Set volume level
  volumeNode.gain.value = volume;

  // Create oscillator (tone genrator)
  const oscillator = audioContext.createOscillator();

  // Set oscillator frequency
  oscillator.frequency.setValueAtTime(activeNote.frequency, audioContext.currentTime);

  // Adjust oscillator periodic waveform
  oscillator.type = "sine";

  // Connect to audio destination
  oscillator.connect(volumeNode).connect(audioContext.destination);

  // Start producing sound
  oscillator.start();

  // Add the oscillator reference
  activeNote.oscillator = oscillator;
}

// Play the tune
function playAudio(array) {
  array.forEach((obj) => {
    // If any of the object has a set "oscillator", stop all of the "oscillator" and disconnect the audio destination
    if (obj.oscillator != null) {
      obj.oscillator.stop();
      obj.oscillator.disconnect();
    }
  });

  // Get all of the active notes
  const activeNotes = array.filter((obj) => obj.active);

  // Set a volume / gain to always be 100%
  const gain = 1 / activeNotes.length;

  activeNotes.forEach((obj) => {
    attachAudio(obj, gain);
  });
}

// Handle any Key Press or Release
function handleKey(array, e) {
  // If a key is pressed continuously, then return
  if (e.repeat) {
    return;
  }

  // Get the details of the pressed key
  const keyDetails = getPressedKeyDetails(array, e.key);

  // If a key is pressed, which is not inside "array", then return
  if (keyDetails == null) {
    return;
  }

  return keyDetails;
}

// Handle Key Down
function handleKeyDown(e) {
  const keyDownDetails = handleKey(NOTE_DETAILS, e);

  // If Key Down details is not null, set its "active" property to true, i.e. the key is active
  if (keyDownDetails != null) {
    keyDownDetails.active = true;
  }

  playAudio(NOTE_DETAILS);

  render();
}

// Handle Key Up
function handleKeyUp(e) {
  const keyUpDetails = handleKey(NOTE_DETAILS, e);

  // If Key Up details is not null, set its "active" property to false, i.e. the key is inactive
  if (keyUpDetails != null) {
    keyUpDetails.active = false;
  }

  playAudio(NOTE_DETAILS);

  render();
}

// Event listeners
document.addEventListener("keydown", handleKeyDown);

document.addEventListener("keyup", handleKeyUp);
