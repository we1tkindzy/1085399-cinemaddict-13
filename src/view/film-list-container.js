import AbstractView from "./abstract.js";

const createsFilmsListContainerTemplate = () => {
  return `<div class="films-list__container">

    </div>`;
};

export default class FilmsListContainer extends AbstractView {
  getTemplate() {
    return createsFilmsListContainerTemplate();
  }
}
