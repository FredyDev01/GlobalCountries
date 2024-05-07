import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import View1 from "../views/View1.vue";
import View2 from "../views/View2.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/Home",
    },
    {
      path: "/Home",
      component: Home,
      meta: {
        title: "Home",
        description: `
        Find the list with the most relevant information about each country in the world.
      `,
      },
    },
    {
      path: "/View-1",
      component: View1,
      meta: {
        title: "View 1",
        description: "All relevant information about view 1 will be here soon",
      },
    },
    {
      path: "/View-2",
      component: View2,
      meta: {
        title: "View 2",
        description: "All relevant information about view 2 will be here soon",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const metaDescription = document.querySelector('meta[name="description"]');

  document.title = `Global Countries - ${to.meta.title}`;
  metaDescription.setAttribute("content", to.meta.description);

  next();
});

export default router;
