import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import AllStudents from "../views/AllStudents.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AllStudents",
    component: AllStudents,
  },
  {
    path: "/students",
    name: "All Students",
    component: AllStudents,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
