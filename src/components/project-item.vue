<template>
  <v-card
    class="flex d-flex flex-column transition-swing"
    :elevation="hover ? 6 : 2"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 mb-1 align-self-start">
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-chip v-if="item.language" class="ma-2" x-small>
        {{ item.language }}
      </v-chip>
      <div class="px-2">
        <div>
          <small>
            created:
            <strong>{{ formatDate(item.created_at) }}</strong>
          </small>
        </div>
        <div>
          <small>
            pushed_at:
            <strong>{{ formatDate(item.pushed_at) }}</strong>
          </small>
        </div>
      </div>
      <div class="d-flex">
        <!-- :to="{
            path: `/readme/${item.name}`,
            params: { id: item.id },
          }" -->
        <v-btn
          @click="showDialog(item)"
          class="my-5 ml-auto text-none"
          text
          small
        >
          README.md
        </v-btn>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="'gh_pages' in item && item.gh_pages"
        x-small
        dark
        color="green"
        :href="item.gh_pages"
        target="_blank"
      >
        <v-icon>mdi-eye</v-icon>
        <span style="font-size: 10px; text-transform: lowercase">gh-pages</span>
      </v-btn>
      <div class="mx-1"></div>
      <v-btn
        dark
        x-small
        :href="item.html_url"
        color="secondary"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
        <span style="font-size: 10px; text-transform: lowercase">github</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(created_at) {
      return new Date(created_at).toISOString().split("T")[0];
    },
    showDialog(item) {
      this.$router.push({
        path: `/readme/${item.name}`,
      });
    },
  },
};
</script>

<style>
</style>