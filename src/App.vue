<template>
  <v-app>
    <default-layout>
      <template v-slot:content>
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
