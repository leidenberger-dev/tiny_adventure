export const boy = {
  img: "../assets/img/boy.png",
  frameWidth: 200,
  frameHeight: 250,
  maxColumns: 10,
  offsetX: 35,
  offsetY: 35,
  offsetWidth: 125,
  offsetHeight: 58,
  animationSpeed: 5,

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
