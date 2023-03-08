import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import authService from "../services/auth.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("../components/List.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      name: "error-page",
      component: () => import("../components/List.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = authService.isTokenExpired();

  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && isAuthenticated) {
    next("/login");
  }
  // Si el token no ha expidado y la ruta no es la esperada, entonces que redireccione al /
  else if (to.path !== "/" && !isAuthenticated) {
    next("/");
  }
  //
  else {
    next();
  }
});

export default router;
