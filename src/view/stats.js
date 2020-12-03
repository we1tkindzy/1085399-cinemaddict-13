import {createElement} from "../utils.js";

const createsStatisticsTemplate = (countsFilms) => {
  const {count} = countsFilms;

  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};

export default class Statistics {
  constructor(countsFilms) {
    this._countsFilms = countsFilms;

    this._element = null;
  }

  getTemplate() {
    return createsStatisticsTemplate(this._countsFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
