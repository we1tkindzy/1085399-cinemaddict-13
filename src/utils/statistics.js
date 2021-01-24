import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getWatchedFilms = (films) => {
  return films.length;
};

export const getTotalDuration = (films) => {
  const totalDuration = films.reduce((acc, film) => acc + Number(film.viewingTime), 0);
  const hours = dayjs.duration(totalDuration, `m`).hours();
  const minutes = dayjs.duration(totalDuration, `m`).minutes();

  return {hours, minutes};
};

export const getGenresStats = (films) => {
  const genresStats = {};

  films
  .reduce((acc, film) => acc.concat(film.genre), [])
  .forEach((genre) => {
    if (genresStats[genre]) {
      genresStats[genre]++;
      return;
    }
    genresStats[genre] = 1;
  });

  return genresStats;
};

export const getTopGenre = (films) => {
  if (films.length === 0) {
    return ``;
  }

  const genresStats = getGenresStats(films);
  return Object.entries(genresStats).sort((a, b) => b[1] - a[1])[0][0];
};
