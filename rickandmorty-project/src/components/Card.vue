<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="items.image" height="200px" cover></v-img>

    <v-card-title> {{ items.name }} </v-card-title>
    <div class="ml-4">
      <p>{{ items.lastknownLocation }}</p>
      <p>{{ items.status }}</p>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- <v-btn
        variant="plain"
        :icon="show ? 'mdi-star' : 'mdi-star-off'"
        @click="show = !show"
      ></v-btn> -->
      <v-btn
        :icon="items.fav ? 'mdi-heart' : 'mdi-heart-outline'"
        @click="changeFavorites(!items.fav, items)"
        color="secondary"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { store } from "../store";

type Items = {
  id: number,
  name: string;
  image: string;
  status: string;
  lastknownLocation: string;
  firstSeenIn: string;
  fav: boolean;
};

export default {
  props: ["item"],
  setup(props) {
    const show = ref<boolean>(false)
    const items = reactive<Items>({
      id: props.item.id,
      name: props.item.name,
      image: props.item.image,
      status: `${props.item.status} - ${props.item.species}`,
      lastknownLocation: props.item.location.name,
      firstSeenIn: "",
      fav: props.item.fav
    });

    const changeFavorites = async (value: boolean, items: Items) => {
      
      const token = localStorage.getItem("user_token");
      const { user } = jwt_decode(token as string) as {
        user: {
          op: number
        };
      };

      const response = await axios.post("http://localhost:4000/api/rm/addfav?numberPage=1", {
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

      console.log(':: ',response.data);
      
    }

    return {
      items,
      show,
      changeFavorites
    };
  },
};
</script>
