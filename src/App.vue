<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
  <div
    class="relative font-sans pl-[0px] lg:pl-[320px] max-w-[1680px] mx-auto min-h-screen h-full"
  >
    <Sidebar />
    <div class="p-8">
      <RouterView />
    </div>
  </div>
</template>
