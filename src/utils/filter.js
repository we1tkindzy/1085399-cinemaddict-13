import { FilterType } from "../utils/const.js";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) =>
    films.filter((film) => film.isAddToWatchlist),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.isFavorite),
};
