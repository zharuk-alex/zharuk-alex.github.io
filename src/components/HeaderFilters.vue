<template>
  <v-row class="mt-4" :class="{ 'filters-disabled': disabled }">
    <v-col>
      <v-btn-toggle
        v-model="model_filter_ghpages"
        color="primary"
        dense
        group
        mandatory
        @change="FilterUpdated($event)"
      >
        <v-btn small value="all"> all </v-btn>
        <v-btn small value="gh_p"> ghpages </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="8" md="4" class="d-flex">
      <v-select
        v-model="model_sort"
        :items="sortByItems"
        label="Sort by"
        solo
        dense
        hide-details
      ></v-select>
      <v-btn
        icon
        color="primary"
        class="ml-1"
        @click="ChangeSortDirection"
        :title="model_sort_direction"
      >
        <v-icon v-if="model_sort_direction == 'desc'">
          mdi-sort-descending
        </v-icon>
        <v-icon v-else>mdi-sort-ascending</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" sm="8" md="4">
      <v-text-field
        v-model="model_search"
        label="Search project"
        solo
        dense
        hide-details
        @input="SearchUpdated"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProjectsFilters",
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: () => ({
    model_filter_ghpages: "all",
    model_search: "",
    sortByItems: [
      {
        text: "sort by pushed",
        value: "pushed",
      },
      {
        text: "sort by created",
        value: "created",
      },
      {
        text: "sort by repo name",
        value: "reponame",
      },
    ],
    model_sort_direction: "desc",
  }),
  computed: {
    model_sort: {
      get: function () {
        return this.$store.getters.sortby_value;
      },
      set: function (val) {
        this.$store.commit("SET_PROJECT_SORT_VAL", val);
      },
    },
  },
  methods: {
    FilterUpdated() {
      this.$store.commit("SET_PROJECT_FILTER_VAL", this.model_filter_ghpages);
    },
    SearchUpdated() {
      this.$store.commit("SET_PROJECT_SEARCH_VAL", this.model_search);
    },
    ChangeSortDirection() {
      this.model_sort_direction =
        this.model_sort_direction == "desc" ? "asc" : "desc";
      this.$store.commit(
        "SET_PROJECT_SORT_DIRECTION",
        this.model_sort_direction
      );
    },
  },
};
</script>

<style scoped>
.filters-disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>
