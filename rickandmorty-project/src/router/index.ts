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

  console.log(isAuthenticated);
  console.log(authRequired);

  // if (to.matched.some((route) => route.meta.requiresAuth)) {
  // if (authRequired && isAuthenticated) {
  //   if (!isAuthenticated) {
  //     console.log("entro 1");
  //     next("/login");
  //   } else {
  //     console.log("entro 2");
  //     next("/login");
  //   }
  // } else {
  //   console.log("entro 3");
  //   next();
  // }

  // if (authRequired && isAuthenticated) {
  //   next({ path: "/login" });
  // } else if (!isAuthenticated) {
  //   next();
  // } else {
  //   next();
  // }

  if (authRequired && isAuthenticated) {
    console.log("entro 1");
    // next({ path: "/login" });
    next("/login");
  }
  // Si el token no ha expidado y la ruta no es la esperada, entonces que redireccione al /
  else if (to.path !== "/" && !isAuthenticated) {
    console.log("entro 5");
    next("/");
  }
  //
  else {
    console.log("entro 3");
    next();
  }
});

export default router;
