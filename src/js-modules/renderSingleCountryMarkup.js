export default function renderSingleCountryMarkup(countries) {
  return countries.map(({ name: { official }, capital, flags: { svg, alt }, languages, population }) => {
      return `
      <ul class="country-info__card">
    <img class="country-info__svg" src="${svg}" alt="${alt}">
  <li class="country-info__name">Назва країни: ${official}</li>
  <li class="country-info__capital">Столиця: ${capital}</li>
  <li class="country-info__languages">Мова: ${Object.values(languages).join(', ')}</li>
  <li class="country-info__population">Населення: ${population}</li>
</ul>`})
      .join('');
};