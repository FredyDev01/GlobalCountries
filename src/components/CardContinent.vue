<script>
import { mapMutations, mapState } from "vuex/dist/vuex.common.js";
import CustomImage from "@/components/CustomImage.vue";

export default {
  name: "CardContinent",

  components: {
    CustomImage,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapState({
      filtersContinents: (state) => state.filters.fields.continents,
    }),
  },

  methods: {
    ...mapMutations(["setFiltersFields"]),

    handleActiveContinent(name) {
      let continents = [...this.filtersContinents];

      if (continents.includes(name)) {
        continents = continents.filter((continent) => continent !== name);
      } else {
        continents.push(name);
      }

      this.setFiltersFields({ continents });
    },
  },
};
</script>

<template>
  <div>
    <div
      @click="handleActiveContinent(name)"
      :class="{
        'shadow-[0_0_10px_3px] shadow-sky-600':
          filtersContinents.includes(name),
      }"
      class="w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer"
    >
      <CustomImage
        object="contain"
        :src="image"
        :alt="`image continent ${name}`"
      />
    </div>
    <h4 class="mt-2 text-center text-custom-gray-300 text-base">{{ name }}</h4>
  </div>
</template>
