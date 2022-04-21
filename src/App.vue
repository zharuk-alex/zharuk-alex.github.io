<template>
  <v-app>
    <default-layout>
      <template #content>
        <router-view />
      </template>
    </default-layout>
  </v-app>
</template>

<script>
import DefaultLayout from "@/layouts/default-layout";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
};
</script>