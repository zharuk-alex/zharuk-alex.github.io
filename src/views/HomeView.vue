<template>
  <main>
    <project-filters></project-filters>
    <v-row v-if="pageCount">
      <v-col>
        <v-spacer></v-spacer>
        <v-pagination v-model="pagCurrPage" :length="pageCount"></v-pagination>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        v-for="project in projects"
        :key="project.id"
        class="d-flex flex-column"
      >
        <v-hover v-slot="{ hover }">
          <project-item :item="project" :hover="hover" />
        </v-hover>
      </v-col>
    </v-row>
    <v-row v-if="pageCount">
      <v-col>
        <v-pagination
          class="ml-auto"
          v-model="pagCurrPage"
          :length="pageCount"
        ></v-pagination>
      </v-col>
    </v-row>
    <router-view />
  </main>
</template>
<script>
import ProjectFilters from "@/components/project-filters.vue";
import ProjectItem from "@/components/project-item.vue";

export default {
  data: () => ({}),
  components: {
    ProjectFilters,
    ProjectItem,
  },

  computed: {
    projects() {
      return this.$store.getters.paginatedProjects;
    },
    pagCurrPage: {
      get: function () {
        return this.$store.getters.page_number;
      },
      set: function (val) {
        this.$store.commit("SET_PAGINATION_PAGE_NUMBER", val);
      },
    },
    pageCount() {
      return this.$store.getters.pageCount;
    },
  },
  watch: {
    pageCount() {
      this.$store.commit("SET_PAGINATION_PAGE_NUMBER", 1);
    },
  },

  mounted() {
    this.$store.dispatch("fetchGithubProjects");
  },
};
</script>