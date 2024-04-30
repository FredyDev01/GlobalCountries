<script>
import MainContent from "../components/MainContent.vue";
import { mapActions, mapGetters } from "vuex/dist/vuex.common.js";
import graphql from "../graphql";
import { initialData } from "../graphql/query";

export default {
  components: {
    MainContent,
  },

  computed: {
    ...mapGetters(["getContriesWithFilters"]),
  },

  methods: {
    ...mapActions(["fetchInitialData"]),
  },

  mounted() {
    if (!graphql.cache.readQuery({ query: initialData })) {
      this.fetchInitialData();
    }
  },
};
</script>

<template>
  <MainContent />
</template>
