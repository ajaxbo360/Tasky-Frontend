import http from "@/helpers/http";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import TaskList from "@/views/Task/TaskList.vue";

import TaskCreate from "@/views/Task/TaskCreate.vue";
import TaskEdit from "@/views/Task/TaskEdit.vue";
import NotFound from "@/views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/tasks", // Redirect root URL to /tasks
    },
    {
      path: "/tasks",
      name: "dashboard",

      component: () => import("../views/Task/TaskList.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/Auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Auth/RegisterView.vue"),
    },

    {
      path: "/task/create",
      name: "TaskCreate",
      component: () => import("../views/Task/TaskCreate.vue"),
    },
    {
      path: "/task/:id/edit",
      name: "TaskEdit",
      component: () => import("../views/Task/TaskEdit.vue"),
      props: true,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});
// Check if the user is authenticated.
router.beforeEach((to, from) => {
  if (to.name === "login") {
    return true;
  }
  if (to.name === "register") {
    return true;
  }

  if (!localStorage.getItem("token")) {
    return {
      name: "login",
    };
  }

  checkTokenAuthenticity();
});

const checkTokenAuthenticity = () => {
  http()
    .get("/api/user", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((response) => {})
    .catch((error) => {
      localStorage.removeItem("token");
      router.push({
        name: "login",
      });
    });
};
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
