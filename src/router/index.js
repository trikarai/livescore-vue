import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/layout/Main";

import MatchFixture from "../views/MatchFixture";
import MatchDetail from "../components/match/MatchDetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/match",
    children: [
      {
        path: "/match",
        component: MatchFixture,
        name: "match-fixture",
        meta: {
          level: 0,
        },
      },
      {
        path: "/match/:matchId",
        component: MatchDetail,
        name: "match-detail",
        meta: {
          level: 1,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
