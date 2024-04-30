<script>
import FilterSearch from "@/components/FilterSearch.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import ListCountry from "@/components/ListCountry.vue";

export default {
  name: "MainContent",

  components: {
    FilterSearch,
    FilterSelect,
    ListCountry,
  },
};
</script>

<template>
  <div class="flex flex-col gap-y-20">
    <div class="mx-auto w-full max-w-[780px] relative">
      <FilterSearch />
      <FilterSelect />
    </div>
    <ListCountry />
  </div>
</template>
