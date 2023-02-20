<script lang="ts">
import { useStore } from "vuex";
import axios from "axios";

import CardRickMorty from "./Card.vue";
import { key, store } from "../store";

export default {
  components: {
    "card-rick-morty": CardRickMorty,
  },

  async mounted() {
    const token = localStorage.getItem("user_token");
    const response = await axios.get("http://localhost:4000/api/rm", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 200) {
      store.dispatch("addListApi", response.data.results);
      console.log(response.data.results);
    }
  },

  setup() {
    const store = useStore(key);

    return { store };
  },
};
</script>
<template>
  <div>
    <v-container fluid class="bg-surface-variant">
      <h1 class="text-center mb-5">Rick and Morty</h1>
      <div></div>
      <v-row no-gutters v-for="(item, index) in store.state.data" :key="index">
        <v-col class="pa-2" v-for="b in item" :key="b.id">
          <card-rick-morty :item="b" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
