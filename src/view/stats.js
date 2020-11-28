export const createsStatisticsTemplate = (countsFilms) => {
  const {count} = countsFilms;

  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};
