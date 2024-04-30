<script>
import notImage from "@/assets/images/not-image.jpg";

export default {
  name: "CustomImage",

  data() {
    return {
      notImage,
    };
  },

  props: {
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      required: true,
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    fullHeight: {
      type: Boolean,
      default: true,
    },
    object: {
      type: String,
      default: "cover",
      validator: (value) => ["none", "contain", "cover"].includes(value),
    },
  },

  computed: {
    getSrc() {
      return this.src ?? require("@/assets/images/not-image.jpg");
    },
  },
};
</script>

<template>
  <img
    :class="{
      'w-full': fullWidth,
      'h-full': fullHeight,
      'object-contain': object === 'contain',
      'object-cover': object === 'cover',
    }"
    :src="getSrc"
    :alt="alt"
  />
</template>
