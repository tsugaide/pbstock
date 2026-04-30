import { createRouter, createWebHistory } from "vue-router";

import Index from "../pages/Index.vue";
import Riwayat from "../pages/Riwayat.vue";
import Admin from "../pages/Admin.vue";

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/history",
    component: Riwayat,
  },
  {
    path: "/admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
