export default function renderMultiCountriesMarkup(countries) {
  return countries.map(({ flags: { svg, alt }, name: { official } }) => {
      return `
      <li class="country-list__item">
      <img class="country-list__img" src="${svg}" alt="${alt}">
      ${official}
  </li>`})
      .join('');
};