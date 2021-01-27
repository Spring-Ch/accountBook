import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Labels from "@/views/Labels.vue";
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/money" },
  { path: "/labels", component: Labels },
  { path: "/money", component: Money },
  { path: "/statistics", component: Statistics },
  { path: "*", component: NotFound },
  { path: "/labels/edit/:id", component: EditLabel },
];

const router = new VueRouter({
  routes,
});

export default router;
