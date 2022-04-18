<template>
  <v-card>
    <div class="d-flex">
      <aside-component v-model="drawer"></aside-component>
      <v-container>
        <header-component @drawer-updated="drawer = !drawer"></header-component>
        <content-component></content-component>
      </v-container>
    </div>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>@zzharuk</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>
<script>
import AsideComponent from "@/components/Aside";
import HeaderComponent from "@/components/Header";
import ContentComponent from "@/components/Content";

export default {
  data: () => ({
    drawer: false,
  }),
  components: {
    AsideComponent,
    HeaderComponent,
    ContentComponent,
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  mounted() {
    this.$store.dispatch("fetchGithubProjects");
  },
};
</script>