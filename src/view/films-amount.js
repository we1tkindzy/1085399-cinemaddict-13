import AbstractView from "./abstract.js";

const createsStatisticsTemplate = (countsFilms) => {
  const count = countsFilms;

  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class Statistics extends AbstractView {
  constructor(countsFilms) {
    super();
    this._countsFilms = countsFilms;
  }

  getTemplate() {
    return createsStatisticsTemplate(this._countsFilms);
  }
}
