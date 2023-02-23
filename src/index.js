import './css/styles.css';
import getRefs from './js-modules/get-refs';
import { fetchCountries } from './js-modules/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import renderSingleCountryMarkup from './js-modules/renderSingleCountryMarkup'
import renderMultiCountriesMarkup from './js-modules/renderMultiCountriesMarkup';


const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function checkInputValue(countries) {

  if (countries.length > 10) {

    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    clearCountryList();
    clearCountryInfo();

  } else if (countries.length > 2) {
    // console.log(countries);
  refs.countryList.innerHTML = renderMultiCountriesMarkup(countries);
    clearCountryInfo();

  } else if (countries.length === 1) {
    refs.countryInfo.innerHTML = renderSingleCountryMarkup(countries);
    clearCountryList();
  };
};

async function onSearch(e) {
  e.preventDefault();

  const valueInput = e.target.value;

  if (valueInput.trim()) {
    try {
      const response = await fetchCountries(valueInput.trim());
      const checked = await checkInputValue(response);
      return checked;
    } catch (error) {
    inputError();
    clearCountryInfo();
    clearCountryList();
    }
  } else if (valueInput.trim() === '') {
    clearCountryInfo();
    clearCountryList();
  };
};

function inputError() {
  Notiflix.Notify.failure("Oops, there is no country with that name");
};

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
};

function clearCountryList() {
refs.countryList.innerHTML = '';
};