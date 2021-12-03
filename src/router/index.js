import Vue from "vue";
import VueRouter from "vue-router";
import AuthRoutes from "./auth-routes";
import store from "@/store/index";
import middlewarePipeline from "@/router/middleware-pipeline";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Splash",
    component: () => import("../views/Splash"),
  },
  ...AuthRoutes,
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () => import("../views/Splash"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
