const createMainNavigationItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<a href="#watchlist" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

export const cratesMainNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createMainNavigationItemTemplate(filter, index === 0))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">

      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};


// `<a href="" class="main-navigation__item
//     ${isChecked ? `main-navigation__item--active` : ``}
//     ">${name}
//       <span class="main-navigation__item-count">${count}</span>
//     </a>`

// export const cratesMainNavigationTemplate = () => {
//   return `<nav class="main-navigation">
//     <div class="main-navigation__items">
// <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
// <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
// <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
// <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
//     </div>
//     <a href="#stats" class="main-navigation__additional">Stats</a>
//   </nav>`;
// };
// {/* <a href="#watchlist" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
// <a href="#history" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
// <a href="#favorites" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a> */}
