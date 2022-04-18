<template>
  <v-app>
    <v-container v-if="!isMobile">
      <Home />
    </v-container>
    <Home v-else />
  </v-app>
</template>

<script>
import Home from "@/views/Home";

export default {
  name: "App",

  components: {
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
