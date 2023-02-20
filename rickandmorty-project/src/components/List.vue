<script lang="ts" setup>
import {onMounted, computed} from "vue"
import { useStore } from "vuex";
import axios from "axios";
import jwt_decode from "jwt-decode";
import CardRickMorty from "./Card.vue";
import { key } from "../store";

const store = useStore(key);

onMounted(async () => {
  const token = localStorage.getItem("user_token");
    const { user } = jwt_decode(token as string) as {
        user: {
          op: number
        };
      };
    const response = await axios.get(`http://localhost:4000/api/rm?numberPage=1&op=${user.op}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 200) {
      store.dispatch("addListApi", response.data);
      console.log(response.data);
    }
});

const dataStore = computed(() => {
  return store.state.data
})


// return store.state.data
</script>
<template>
  <div>
    <v-container fluid class="bg-surface-variant">
      <h1 class="text-center mb-5">Rick and Morty</h1>
      <div></div>
      <v-row no-gutters v-for="(item, index) in dataStore" :key="index">
        <v-col class="pa-2" v-for="b in item" :key="`b_${b.id}`">
          <card-rick-morty :item="b" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
