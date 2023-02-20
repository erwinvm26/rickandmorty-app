<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="items.image" height="200px" cover></v-img>

    <v-card-title> {{ items.name }} </v-card-title>

    <v-card-subtitle> {{ items.lastknownLocation }}</v-card-subtitle>

    <v-card-actions>
      <span class="ml-2">{{ items.status }}</span>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { reactive, toRef } from "vue";

type Items = {
  name: string;
  image: string;
  status: string;
  lastknownLocation: string;
  firstSeenIn: string;
};

export default {
  props: ["item"],
  data: () => ({
    show: false,
  }),
  setup(props) {
    const items = reactive<Items>({
      name: props.item.name,
      image: props.item.image,
      status: `${props.item.status} - ${props.item.species}`,
      lastknownLocation: props.item.location.name,
      firstSeenIn: "",
    });

    return {
      items,
    };
  },
};
</script>
