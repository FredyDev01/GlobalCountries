<script>
import { mapState, mapMutations } from "vuex";
import CustomImage from "@/components/CustomImage.vue";
import CustomIcon from "@/components/CustomIcon.vue";

export default {
  name: "InfoCountry",

  components: {
    CustomImage,
    CustomIcon,
  },

  computed: {
    ...mapState(["countryShow"]),
  },

  methods: {
    ...mapMutations(["setCountryShow"]),

    handleCountryShow() {
      this.setCountryShow(null);
      document.body.classList.remove("overflow-hidden");
    },
  },
};
</script>

<template>
  <div v-show="countryShow" class="fixed lg:relative inset-0 z-50">
    <div
      @click="handleCountryShow"
      class="z-20 lg:hidden absolute inset-0 bg-black bg-opacity-50"
    />
    <div
      class="z-30 bg-white w-[90%] sm:w-full max-w-[340px] mx-auto p-10 relative top-1/2 -translate-y-1/2 lg:sticky lg:translate-y-0 lg:top-10 h-max rounded-md max-h-[80vh] overflow-auto"
    >
      <button
        @click="handleCountryShow"
        class="absolute top-3 right-3 transition-colors duration-300 text-gray-400 hover:text-gray-500"
      >
        <CustomIcon :src="require('@/assets/icons/x-mark.svg')" />
      </button>
      <CustomImage
        :src="countryShow?.capitalImage"
        :alt="`image country ${countryShow?.name}`"
      />
      <div class="flex items-center h-full gap-x-4 p-4 bg-white">
        <div class="w-14 h-8">
          <CustomImage
            :src="countryShow?.flagImage"
            :alt="`image flag ${countryShow?.name}`"
          />
        </div>
        <div class="text-lg">
          <h3 class="font-bold text-sky-500">
            {{ countryShow?.name }}
          </h3>
          <h3 class="text-custom-gray-200">
            {{ countryShow?.continent?.name }}
          </h3>
        </div>
      </div>
      <div class="flex flex-col gap-y-2.5 mt-2">
        <h3 class="description">
          <strong class="mr-2">Capital: </strong>
          {{ countryShow?.capital }}
        </h3>
        <h3 class="description">
          <strong class="mr-2">Language: </strong>
          {{ countryShow?.languages?.[0]?.name }}
        </h3>
        <h3 class="description">
          <strong class="mr-2">Currency: </strong>
          {{ countryShow?.currencies?.join(", ") }}
        </h3>
        <h3 class="description">
          <strong class="mr-2">Regions:</strong>
          <div
            v-if="countryShow?.subdivisions?.length"
            class="mt-2.5 max-h-40 overflow-auto"
          >
            <span
              class="block"
              v-for="(item, index) in countryShow?.subdivisions"
              :key="index"
            >
              {{ item?.name }}
            </span>
          </div>
          <template v-else> not regions </template>
        </h3>
      </div>
    </div>
  </div>
</template>
