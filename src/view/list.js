import AbstractView from "./abstract.js";

const createListTemplate = () => {
  return `<section class="films">


  </section>`;
};

export default class List extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}
