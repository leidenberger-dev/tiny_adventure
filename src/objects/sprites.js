export const boy = {
  img: "../assets/img/boy.png",
  frameWidth: 200,
  frameHeight: 250,
  maxColumns: 10,
  offsetX: 35,
  offsetY: 35,
  offsetWidth: 125,
  offsetHeight: 58,
  animationSpeed: 8,

  idle: {
    row: 1,
    maxColumns: 9,
  },
  walking: {
    row: 0,
    maxColumns: 9,
  },
  jumping: {
    row: 6,
    maxColumns: 9,
  },
  falling: {
    row: 7,
    maxColumns: 9,
  },

  attack: {
    row: 4,
    maxColumns: 9,
  },
};

export const pepe = {
  img: "../assets/img/pepe.png",
  position: {
    x: 3350,
    y: 1015,
  },
  frameWidth: 240.16,
  frameHeight: 472.44,
  maxColumns: 9,
  offsetX: -60,
  offsetY: 125,
  offsetWidth: 20,
  offsetHeight: 58,
  animationSpeed: 10,

  idle: {
    row: 1,
    maxColumns: 9,
  },
  sleep: {
    row: 2,
    maxColumns: 8,
  },

  walking: {
    row: 0,
    maxColumns: 6,
  },
};
