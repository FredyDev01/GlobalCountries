<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CustomIcon from "./CustomIcon.vue";

export default {
  name: "FilterSearch",

  components: {
    CustomIcon,
  },

  computed: {
    ...mapState({
      filtersOpen: (state) => state.filters.open,
      filtersName: (state) => state.filters.fields.name,
    }),
  },

  methods: {
    ...mapMutations(["setFiltersOpen", "setFiltersFields"]),
    ...mapActions(["fetchInitialData"]),

    openFilters() {
      this.setFiltersOpen(true);
    },

    handleChangeInput({ target: { value: name } }) {
      this.setFiltersFields({ name });
    },

    handleReloadSearch() {
      this.fetchInitialData();
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col gap-y-4 items-stretch xs:flex-row xs:items-center justify-between bg-white px-10 py-3 rounded-3xl xs:rounded-full shadow-lg"
  >
    <div
      class="item-filter mx-auto xs:mx-0 flex items-start w-[250px] flex-col"
    >
      <label class="text-xl text-custom-gray-200" for="txtCountry">Pais</label>
      <input
        @focus="openFilters"
        @input="handleChangeInput"
        :value="filtersName"
        id="txtCountry"
        type="text"
        autocomplete="off"
        class="text-sm w-full focus:outline-none border-b-2 border-white text-gray-400 placeholder:text-gray-400 py-1"
        :class="{ '!border-sky-300': filtersOpen }"
        placeholder="Escribe el pais que deseas ver"
      />
    </div>
    <button
      @click="handleReloadSearch"
      class="flex justify-center items-center gap-x-4 transition-colors duration-300 bg-sky-500 hover:bg-sky-600 text-white text-xl py-3 px-5 rounded-full"
    >
      <span class="text-2xl text-white">
        <CustomIcon :src="require('@/assets/icons/search.svg')" />
      </span>
      Buscar
    </button>
  </div>
</template>
