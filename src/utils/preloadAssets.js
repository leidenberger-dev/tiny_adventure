export function preloadAssets() {
  const images = [
    "./assets/img/level1/css.png",
    "./assets/img/level1/html.png",
    "./assets/img/level1/javascript.png",
    "./assets/img/level1/step1.png",
    "./assets/img/level1/step2.png",
    "./assets/img/level1/step3.png",
    "./assets/img/level1/step4.png",
    "./assets/img/level1/mapLevel1.png",
    "./assets/img/level1/mapLevel1Foreground.png",
    "./assets/img/level2/mapLevel2.png",
    "./assets/img/level2/mapLevel2Foreground.png",
    "./assets/img/level2/arrows.png",
    "./assets/img/level2/health.png",
    "./assets/img/level2/point.png",
    "./assets/img/level3/mapLevel3.png",
    "./assets/img/level3/mapLevel3Foreground.png",
    "./assets/img/level3/boss.png",
    "./assets/img/arrow.png",
    "./assets/img/wolf.png",
    "./assets/img/arrows-amount.png",
    "./assets/img/arrows.png",
    "./assets/img/bars.png",
    "./assets/img/bear.png",
    "./assets/img/bg.png",
    "./assets/img/bison.png",
    "./assets/img/boy.png",
    "./assets/img/buttons.png",
    "./assets/img/clouds.png",
    "./assets/img/collisionblock.png",
    "./assets/img/door.png",
    "./assets/img/mainbuttons.png",
    "./assets/img/mobilebuttons.png",
    "./assets/img/pepe.png",
    "./assets/img/startscreen.png",
    "./assets/img/keys.png",
    "./assets/img/win_2.png",
    "./assets/img/youlost.png",
  ];

  const sounds = [
    "./assets/sounds/player/footstaps.mp3",
    "./assets/sounds/player/jump.mp3",
    "./assets/sounds/player/attack.mp3",
    "./assets/sounds/player/dead.mp3",
    "./assets/sounds/player/arrow.mp3",
    "./assets/sounds/player/hurt.wav",
    "./assets/sounds/pepe/snoring.mp3",
    "./assets/sounds/pepe/okay.mp3",
    "./assets/sounds/enemy/takeDamage.mp3",
    "./assets/sounds/enemy/chicken.mp3",
    "./assets/sounds/music.mp3",
    "./assets/sounds/health.mp3",
    "./assets/sounds/item.mp3",
  ];

  const imagePromises = images.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  });

  const soundPromises = sounds.map((src) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = resolve;
      audio.onerror = reject;
      audio.src = src;
      audio.load();
    });
  });

  return Promise.all([...imagePromises, ...soundPromises]);
}
