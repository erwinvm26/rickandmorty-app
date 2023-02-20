import { createApp } from "vue";
import Vuex from "vuex";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import axios from "./axios";
import router from "./router";
import { store, key } from "./store";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(axios, {
  baseUrl: "http://localhost:4000/",
});
app.use(Vuex);
// pass the injection key
app.use(store, key);

app.mount("#app");
