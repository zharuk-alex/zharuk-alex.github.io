<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          README.md / {{ repoName }}
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" icon><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <div class="my-4 d-flex align-center">
            <span class="text-h6 mr-4"> Branches: </span>
            <v-select
              v-model="selectedBranch"
              :width="280"
              hide-details
              solo
              dense
              :items="branches"
              style="max-width: 280px"
              @change="loadReadme"
            ></v-select>
          </div>
          <hr />
          <template>
            <div
              v-if="showMarkdownReadme"
              class="pa-2"
              v-html="repoReadmeHTML"
            ></div>
            <v-alert v-else-if="showMarkdownError" class="pa-2" type="error">
              README.md not exist in
              <span class="subtitle-2 text-uppercase font-weight-medium">
                {{ selectedBranch }}
              </span>
              branch
            </v-alert>
            <readme-skeleton v-else></readme-skeleton>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import showdown from "showdown";
import ReadmeSkeleton from "@/components/readme-skeleton";

export default {
  components: {
    ReadmeSkeleton,
  },
  data() {
    return {
      isLoaded: false,
      dialog: true,
    };
  },
  computed: {
    selectedBranch: {
      get: function () {
        return this.$store.getters.repoBranch;
      },
      set: function (val) {
        this.$store.commit("SET_REPO_BRANCH", val);
        return val;
      },
    },
    branches() {
      return this.$store.getters.repoBranches;
    },
    repoName() {
      return this.$route.params.id;
    },
    repoReadmeHTML() {
      let markdown = this.$store.getters.repoReadme;
      return markdown ? new showdown.Converter().makeHtml(markdown) : false;
    },
    showMarkdownReadme() {
      let markdown = this.$store.getters.repoReadme;
      return this.isLoaded && this.selectedBranch != undefined && markdown;
    },
    showMarkdownError() {
      let markdown = this.$store.getters.repoReadme;
      return this.isLoaded && this.selectedBranch != undefined && !markdown;
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$store.commit("SET_REPO_README", null);
      setTimeout(() => this.$router.push({ path: "/" }), 300);
    },
    loadReadme() {
      this.isLoaded = false;
      this.$store
        .dispatch("fetchGithubReadme", {
          repo: this.repoName,
          branch: this.selectedBranch,
        })
        .then(() => {
          this.isLoaded = true;
        });
    },
    fetchData() {
      this.$store
        .dispatch("fetchRepoBranches", this.$route.params.id)
        .then(() => this.loadReadme());
    },
  },
  mounted() {
    this.$nextTick(() => this.fetchData());
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