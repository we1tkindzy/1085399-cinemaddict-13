import AbstractView from "./abstract.js";

const createsListTemplate = () => {
  return `<section class="films">


  </section>`;
};

export default class List extends AbstractView {
  getTemplate() {
    return createsListTemplate();
  }
}
