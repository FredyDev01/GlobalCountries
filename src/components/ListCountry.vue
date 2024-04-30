<script>
import CardCountry from "@/components/CardCountry.vue";
import InfoCountry from "@/components/InfoCountry.vue";
import CustomIcon from "@/components/CustomIcon.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "ListCountry",

  components: {
    CardCountry,
    InfoCountry,
    CustomIcon,
  },

  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["getContriesWithFilters"]),
  },
};
</script>

<template>
  <div class="flex gap-x-8">
    <h3 v-if="loading" class="text-notify text-center mx-auto">
      <CustomIcon
        class="mx-auto mb-3 animate-[spin_1.6s_linear_infinite] text-3xl"
        :src="require('@/assets/icons/spinner.svg')"
      />
      Obteniendo paises
    </h3>
    <div
      v-else-if="getContriesWithFilters.length"
      class="flex-auto grid grid-cols-[repeat(auto-fill,minmax(220px,280px))] place-content-center gap-8"
    >
      <CardCountry
        v-for="(item, index) in getContriesWithFilters"
        :key="index"
        :countryInfo="item"
      />
    </div>
    <h3 v-else class="text-notify text-center mx-auto">
      No hay paises con los filtros seleccionados
    </h3>
    <InfoCountry />
  </div>
</template>
