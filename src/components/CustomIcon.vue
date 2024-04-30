<script>
import InlineSvg from "vue-inline-svg";

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  components: {
    InlineSvg,
  },
};
</script>

<template>
  <InlineSvg class="h-[1em] w-[1em] fill-current" :src="src" />
</template>
