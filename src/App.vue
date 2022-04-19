<template>
  <v-app>
    <default-layout>
      <template v-slot:content>
        <Home />
      </template>
    </default-layout>
  </v-app>
</template>

<script>
import DefaultLayout from "@/layouts/default-layout";
import Home from "@/views/Home";

export default {
  name: "App",

  components: {
    DefaultLayout,
    Home,
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  data: () => ({
    //
  }),
  mounted() {},
};
</script>
<style scoped>
