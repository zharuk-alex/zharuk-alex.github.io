<template>
  <main>
    <HeaderFilters :disabled="!isLoaded" />
    <v-row v-if="showPagination">
      <v-col>
        <v-pagination
          class="ml-auto"
          v-model="pagCurrPage"
          :length="pageCount"
        ></v-pagination>
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
        <v-hover v-if="isLoaded" v-slot="{ hover }">
          <component
            :is="'project-item'"
            :item="project"
            :hover="hover"
          ></component>
        </v-hover>
        <component v-else :is="'project-skeleton'"></component>
      </v-col>
    </v-row>
    <v-row v-if="showPagination">
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
import HeaderFilters from "@/components/HeaderFilters.vue";
import ProjectItem from "@/components/project-item.vue";
import ProjectSkeleton from "@/components/project-skeleton.vue";

export default {
  data: () => ({
    isLoaded: false,
  }),
  components: {
    HeaderFilters,
    ProjectItem,
    ProjectSkeleton,
  },

  computed: {
    projects() {
      let projects = this.$store.getters.paginatedProjects,
        projects_loaded = projects.length > 0,
        projects_per_page = this.$store.getters.projectsPerPage;
      return projects_loaded
        ? projects
        : [...Array(10).keys(projects_per_page)];
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
    showPagination() {
      return this.isLoaded && this.pageCount;
    },
  },
  watch: {
    pageCount() {
      this.$store.commit("SET_PAGINATION_PAGE_NUMBER", 1);
    },
  },

  mounted() {
    this.$store
      .dispatch("fetchGithubProjects")
      .then(() => (this.isLoaded = true));
  },
};
</script>