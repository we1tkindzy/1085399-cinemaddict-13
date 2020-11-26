const filmToFilterMap = {
  Allmovies: (films) => films.filter((film) => film).length,
  Watchlist: (films) => films
    .filter((film) => film)
    .filter((film) => film.isAddToWatchlist).length,
  History: (films) => films
    .filter((film) => film)
    .filter((film) => film.isWatched).length,
  Favorites: (films) => films
    .filter((film) => film)
    .filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
