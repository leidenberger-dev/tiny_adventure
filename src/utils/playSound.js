export function playSound(soundFile, volume = 1, speed = 1) {
  this.currentSound = new Audio(soundFile);
  this.currentSoundName = soundFile;
  this.currentSound.volume = volume;
  this.currentSound.playbackRate = speed; // Setzt die Wiedergabegeschwindigkeit
  this.currentSound.play();
}
