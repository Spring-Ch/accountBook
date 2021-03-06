import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Labels from "@/views/Labels.vue";
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";
import Item from "@/views/Item.vue";

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(
  location: import("vue-router").RawLocation
) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/item" },
  { path: "/labels", component: Labels },
  { path: "/money", component: Money },
  { path: "/statistics", component: Statistics },
  { path: "/item", component: Item },
  { path: "*", component: NotFound },
  { path: "/labels/edit/:id", component: EditLabel },
];

const router = new VueRouter({
  routes,
});

export default router;
