import Vue from "vue";
import Vuex from "vuex";
import graphql from "../graphql";
import { initialData } from "../graphql/query";
import wikiapi from "../config/wikiapi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      open: false,
      fields: {
        name: "",
        continents: [],
      },
    },
    loading: false,
    continents: [],
    countries: [],
    countryShow: null,
  },

  mutations: {
    setFiltersOpen(state, payload) {
      state.filters.open = payload;
    },
    setFiltersFields(state, payload) {
      state.filters.fields = { ...state.filters.fields, ...payload };
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setContinents(state, payload) {
      state.continents = payload;
    },
    setCountries(state, payload) {
      state.countries = payload;
    },
    setCountryShow(state, payload) {
      state.countryShow = payload;
    },
  },

  getters: {
    getContriesWithFilters({ countries, filters }) {
      const { name: filtersName, continents: filtersContinents } =
        filters.fields;
      const formatFilterName = filtersName.trim().toLocaleLowerCase();
      const isEmptyFilterName = formatFilterName === "";
      const isEmptyFilterContinents = filtersContinents.length === 0;

      return countries.filter((country) => {
        const {
          name,
          continent: { name: continentName },
        } = country;
        const formattedName = name.toLocaleLowerCase();
        const passesNameFilter =
          isEmptyFilterName || formattedName.includes(formatFilterName);
        const passesContinentFilter =
          isEmptyFilterContinents || filtersContinents.includes(continentName);

        return passesNameFilter && passesContinentFilter;
      });
    },
  },

  actions: {
    async fetchInitialData({ commit, dispatch }) {
      try {
        commit("setLoading", true);
        const { data, error } = await graphql.query({
          query: initialData,
          fetchPolicy: "network-only",
        });
        if (!error) {
          const { continents, countries } = data;
          await dispatch("fetchImagesContinents", continents);
          await dispatch("fetchImagesCountries", countries);
        } else {
          throw new Error(`Error during fetchInitialData: ${error}`);
        }
      } catch (error) {
        console.error(error);
      }
      commit("setLoading", false);
    },

    async fetchImagesContinents({ commit }, payload) {
      try {
        let continents = [...payload];
        let storageImages = {};

        if ((storageImages = localStorage.getItem("continentsImages"))) {
          const object = JSON.parse(storageImages);
          continents = continents.map((continent) => ({
            ...continent,
            ...object[continent.name],
          }));
        } else {
          const listPromise = continents.map(async (continent, index) => {
            const { name: continentName } = continent;
            if (continentName) {
              const consult = await wikiapi.get(null, {
                params: { gsrsearch: continentName },
              });
              const firstPage = Object.values(consult.data.query.pages)?.[0];
              const image = firstPage?.thumbnail?.source;
              continents[index] = { ...continents[index], image };
              storageImages = { ...storageImages, [continentName]: { image } };
            }
          });
          await Promise.all(listPromise);
          localStorage.setItem(
            "continentsImages",
            JSON.stringify(storageImages)
          );
        }
        commit("setContinents", continents);
      } catch (error) {
        throw new Error("Error during fetchImagesContinents: ", error.message);
      }
    },

    async fetchImagesCountries({ commit }, payload) {
      try {
        let countries = [...payload];
        let storageImages = {};

        if ((storageImages = localStorage.getItem("countriesImages"))) {
          const object = JSON.parse(storageImages);
          countries = countries.map((country) => ({
            ...country,
            ...object[country.name],
          }));
        } else {
          const listPromise = countries.map(async (country, index) => {
            const { name: countryName, capital: countryCapital } = country;
            let flagImage, capitalImage;
            if (countryName) {
              const consult = await wikiapi.get(null, {
                params: { gsrsearch: `flag ${countryName}` },
              });
              const firstPage = Object.values(consult.data.query.pages)?.[0];
              flagImage = firstPage?.thumbnail?.source;
              countries[index] = { ...countries[index], flagImage };
            }
            if (countryCapital) {
              const consult = await wikiapi.get(null, {
                params: { gsrsearch: countryCapital },
              });
              const firstPage = Object.values(consult.data.query.pages)?.[0];
              capitalImage = firstPage?.thumbnail?.source;
              countries[index] = { ...countries[index], capitalImage };
            }
            storageImages = {
              ...storageImages,
              [countryName]: { flagImage, capitalImage },
            };
          });
          await Promise.all(listPromise);
          localStorage.setItem(
            "countriesImages",
            JSON.stringify(storageImages)
          );
        }
        commit("setCountries", countries);
      } catch (error) {
        throw new Error("Error during fetchImagesCountries: ", error.message);
      }
    },
  },
});
