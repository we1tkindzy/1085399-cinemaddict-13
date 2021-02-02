import AbstractView from "./abstract.js";

const createStatisticsTemplate = (countsFilms) => {
  const count = countsFilms;

  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class FilmsAmount extends AbstractView {
  constructor(countsFilms) {
    super();
    this._countsFilms = countsFilms;
  }

  getTemplate() {
    return createStatisticsTemplate(this._countsFilms);
  }
}
