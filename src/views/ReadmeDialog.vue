<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          README.md: {{ $route.params.id }} / master<br />
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <div class="pa-2" v-html="repoReadme"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import showdown from "showdown";
export default {
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    repoReadme() {
      let markdown = this.$store.getters.repoReadme;
      let converter = new showdown.Converter();
      let html = converter.makeHtml(markdown);
      return html;
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$store.commit("SET_REPO_README", null);
      setTimeout(() => this.$router.push({ path: "/" }), 300);
    },
  },
  mounted() {
    this.$store.dispatch("fetchGithubReadme", this.$route.params.id);
  },
  watch: {
    dialog(newval) {
      if (newval == false) {
        this.closeDialog();
      }
    },
  },
};
</script>

<style>
</style>