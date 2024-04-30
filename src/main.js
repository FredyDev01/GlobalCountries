import Vue, { provide } from "vue";
import VueRouter from "vue-router";
import Router from "./routes";
import graphql from "./graphql";
import { DefaultApolloClient } from "@vue/apollo-composable";
import store from "./store";
import App from "./App.vue";
import "./assets/css/main.css";

Vue.use(VueRouter);

new Vue({
  setup() {
    provide(DefaultApolloClient, graphql);
  },
  router: Router,
  store,
  render: (h) => h(App),
}).$mount("#app");
