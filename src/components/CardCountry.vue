<script>
import { mapState, mapMutations } from "vuex/dist/vuex.common.js";
import CustomImage from "./CustomImage.vue";

export default {
  name: "CardCountry",

  components: {
    CustomImage,
  },

  props: {
    countryInfo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(["countryShow"]),

    getIsActiveCountry() {
      return this.countryShow?.name === this.countryInfo.name;
    },
  },

  methods: {
    ...mapMutations(["setCountryShow"]),

    handleCountryShow() {
      this.setCountryShow(this.countryInfo);
      document.body.classList.add("overflow-hidden");
    },
  },
};
</script>

<template>
  <div
    class="cursor-pointer transition-transform duration-300 hover:-rotate-2 flex flex-col w-full rounded-3xl shadow-lg overflow-hidden"
    @click="handleCountryShow"
  >
    <div class="w-full shrink-0 h-[150px]">
      <CustomImage
        :src="countryInfo?.capitalImage"
        :alt="`image capital ${countryInfo.name}`"
      />
    </div>
    <div
      :class="{ '!bg-sky-500 ': getIsActiveCountry }"
      class="flex items-center h-full gap-x-4 p-4 bg-white"
    >
      <div class="w-14 h-8">
        <CustomImage
          :src="countryInfo?.flagImage"
          :alt="`image flag ${countryInfo.name}`"
        />
      </div>
      <div class="text-lg">
        <h3
          :class="{ 'text-white': getIsActiveCountry }"
          class="font-bold text-sky-500"
        >
          {{ countryInfo.name }}
        </h3>
        <h3
          :class="{ 'text-white': getIsActiveCountry }"
          class="text-custom-gray-200"
        >
          {{ countryInfo.continent.name }}
        </h3>
      </div>
    </div>
  </div>
</template>
