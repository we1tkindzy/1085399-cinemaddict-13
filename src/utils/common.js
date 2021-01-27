import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const sortFilmDateUp = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

export const sortFilmRating = (filmA, filmB) => {
  return dayjs(filmB.rating * 10).diff(dayjs(filmA.rating * 10));
};

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60) + `h `;
  if (hours === 0 + `h `) {
    hours = ``;
  }
  const minutes = mins % 60;
  return hours + minutes + `m`;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
