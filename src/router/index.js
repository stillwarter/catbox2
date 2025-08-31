import { createRouter, createWebHashHistory } from "vue-router";
import { baseRouter } from "./base";
const routes = [baseRouter];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
