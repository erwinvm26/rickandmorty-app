<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="props.item.image" height="200px" cover></v-img>

    <v-card-title> {{ props.item.name }} </v-card-title>
    <div class="ml-4">
      <p>{{ props.item.lastknownLocation }}</p>
      <p>{{ props.item.status }}</p>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- <v-btn
        variant="plain"
        :icon="show ? 'mdi-star' : 'mdi-star-off'"
        @click="show = !show"
      ></v-btn> -->
      <v-btn
        :icon="props.item.fav ? 'mdi-heart' : 'mdi-heart-outline'"
        @click="changeFavorites(!props.item.fav, props.item)"
        color="secondary"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "../axios";
import jwt_decode from "jwt-decode";

import { store } from "../store";

interface Items {
  id: number;
  name: string;
  image: string;
  status: string;
  lastknownLocation: string;
  firstSeenIn: string;
  fav: boolean;
};

const props = defineProps<{item: Items}>();
const show = ref<boolean>(false)

const changeFavorites = async (value: boolean, items: Items) => {
  
  const token = localStorage.getItem("user_token");
  const { user } = jwt_decode(token as string) as {
    user: {
      op: number
    };
  };

  const response = await axios.post("api/rm/addfav?numberPage=1", {
    idCharacter: items.id,
    fav: value,
    details: JSON.stringify(items),
    userId: user.op
  },{
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  store.dispatch("addListApi", response.data);      
}
</script>
