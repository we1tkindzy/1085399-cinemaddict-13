import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import SmartView from "./smart.js";
import {getWatchedFilms, getTotalDuration, getGenresStats, getTopGenre} from "../utils/statistics.js";

dayjs.extend(duration);


const StatsFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};


const filter = {
  [StatsFilter.ALL_TIME]: (films) => films,

  [StatsFilter.TODAY]: (films) => films.
    filter((film) => dayjs(film.watchingDate).isAfter(dayjs().subtract(1, `day`))),

  [StatsFilter.WEEK]: (films) => films.
    filter((film) => dayjs(film.watchingDate).isAfter(dayjs().subtract(1, `week`))),

  [StatsFilter.MONTH]: (films) => films.
    filter((film) => dayjs(film.watchingDate).isAfter(dayjs().subtract(1, `month`))),

  [StatsFilter.YEAR]: (films) => films.
    filter((film) => dayjs(film.watchingDate).isAfter(dayjs().subtract(1, `year`))),
};


const renderGenresChart = (statisticCtx, films) => {
  if (films.length === 0) {
    return false;
  }

  const BAR_HEIGHT = 50;

  const labels = [];
  const counts = [];

  Object
    .entries(getGenresStats(films))
    .sort((a, b) => b[1] - a[1])
    .forEach(([label, count]) => {
      labels.push(label);
      counts.push(count);
    });

  statisticCtx.height = BAR_HEIGHT * Object.values(labels).length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: counts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};


const createsStatsTemplate = (localData) => {
  const {films, currentFilter, userRank} = localData;
  const countWatchedFilms = getWatchedFilms(films);
  const {hours, minutes} = getTotalDuration(films);
  const topGenre = getTopGenre(films);

  const userRankTemplate = userRank || ``;

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRankTemplate}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${StatsFilter.ALL_TIME === currentFilter ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${StatsFilter.TODAY === currentFilter ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${StatsFilter.WEEK === currentFilter ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${StatsFilter.MONTH === currentFilter ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${StatsFilter.YEAR === currentFilter ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${countWatchedFilms} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};


export default class UsersRank extends SmartView {
  constructor(films, userRank) {
    super();

    this._allFilms = films;
    this._data.userRank = userRank;
    this._data.films = films;
    this._genresChart = null;

    this._data.currentFilter = StatsFilter.ALL_TIME;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._setChart();
    this._setInnerHandler();
  }

  getTemplate() {
    return createsStatsTemplate(this._data);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();
    const newFilter = evt.target.value;

    if (this._data.currentFilter === newFilter) {
      return;
    }


    const filteredFilms = filter[newFilter](this._allFilms);


    this.updateData({films: filteredFilms, currentFilter: newFilter});
  }

  _setInnerHandler() {
    this.getElement()
      .querySelector(`.statistic__filters`)
      .addEventListener(`change`, this._filterChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandler();
    this._setChart();
  }

  _setChart() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    this._genresChart = renderGenresChart(statisticCtx, this._data.films);
  }
}
