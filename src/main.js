import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

import VueLuxon from "vue-luxon";
Vue.use(VueLuxon);

// global component
import AlertHttp from "@/components/AlertHttp";
Vue.component("alert-http", AlertHttp);

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
