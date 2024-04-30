<script>
import { mapState, mapMutations } from "vuex/dist/vuex.common.js";
import CardContinent from "./CardContinent.vue";

export default {
  name: "FilterSelect",

  components: {
    CardContinent,
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutsideFilters);
  },

  unmounted() {
    document.removeEventListener("click", this.handleClickOutsideFilters);
  },

  computed: {
    ...mapState({
      continents: (state) => state.continents,
      filtersOpen: (state) => state.filters.open,
    }),
  },

  methods: {
    ...mapMutations(["setFiltersOpen", "setFiltersFields"]),

    handleClickOutsideFilters(event) {
      const elements = document.querySelectorAll(".item-filter");
      const elementClicked = event.target;
      let isInside = false;
      elements.forEach((element) => {
        if (element.contains(elementClicked)) {
          isInside = true;
        }
      });
      if (!isInside) {
        this.setFiltersOpen(false);
      }
    },

    handleClearFilters() {
      this.setFiltersFields({ continents: [] });
    },
  },
};
</script>

<template>
  <div
    v-show="filtersOpen"
    class="z-10 item-filter absolute top-[130%] w-full max-w-[540px] max-h-[60vh] overflow-auto bg-white p-6 rounded-2xl"
  >
    <div class="flex justify-between text-xl">
      <h4 class="text-custom-gray-200">Filtrar por continentes</h4>
      <button @click="handleClearFilters" class="text-sky-500">Limpiar</button>
    </div>
    <div class="flex gap-8 mt-14 flex-wrap justify-center">
      <CardContinent
        v-for="(item, index) in continents"
        :key="index"
        v-bind="item"
      />
    </div>
  </div>
</template>
