import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import View1 from "../views/View1.vue";
import View2 from "../views/View2.vue";

const routes = [
  { path: "/", redirect: "/Home" },
  { path: "/Home", component: Home },
  { path: "/View-1", component: View1 },
  { path: "/View-2", component: View2 },
];

export default new VueRouter({
  mode: "history",
  routes,
});
