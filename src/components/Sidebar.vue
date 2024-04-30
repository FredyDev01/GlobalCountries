<script>
import CustomIcon from "@/components/CustomIcon.vue";

export default {
  name: "Sidebar",

  data() {
    return {
      open: false,
      navigation: [
        { to: "/Home", text: "Home" },
        { to: "/View-1", text: "Vista 1" },
        { to: "/View-2", text: "Vista 2" },
      ],
    };
  },

  components: {
    CustomIcon,
  },

  methods: {
    toggleSidebar() {
      this.open = !this.open;
      document.body.classList.toggle("overflow-hidden");
    },

    closeSidebar() {
      this.open = false;
    },
  },
};
</script>

<template>
  <div>
    <div
      :class="{ 'left-0': open, '-left-[270px]': !open }"
      class="bg-custom-gray-300 p-8 fixed top-0 lg:left-0 w-full max-w-[270px] lg:max-w-[320px] h-full z-40"
    >
      <div class="bg-custom-gray-100 py-4 text-center rounded-md">
        <h1 class="text-2xl text-custom-gray-200 font-bold">Logo</h1>
      </div>
      <ul class="flex mt-10 flex-col">
        <li
          @click="closeSidebar"
          v-for="(item, index) in navigation"
          :key="index"
        >
          <RouterLink :to="item.to">
            {{ item.text }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <div
      @click="closeSidebar"
      v-show="open"
      class="z-20 lg:hidden absolute inset-0 bg-black bg-opacity-50"
    />
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed right-5 top-5 bg-custom-gray-400 text-white w-12 h-12 rounded-full grid place-content-center z-40"
    >
      <CustomIcon
        :src="
          open
            ? require('@/assets/icons/x-mark.svg')
            : require('@/assets/icons/bars.svg')
        "
      />
    </button>
  </div>
</template>

<style scoped>
a {
  @apply block py-3.5 px-4 font-bold text-lg text-white;
}

.router-link-active {
  @apply bg-white rounded-md text-custom-gray-200;
}
</style>
