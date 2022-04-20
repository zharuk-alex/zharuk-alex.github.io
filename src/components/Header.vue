<template>
  <header>
    <v-row>
      <v-app-bar
        elevation="2"
        :class="{ 'rounded-tr': !isMobile }"
        :fixed="isMobile"
      >
        <v-app-bar-nav-icon
          v-show="isMobile"
          @click="$emit('drawer-updated')"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>
    </v-row>
    <div v-if="isMobile" style="margin-top: 70px"></div>
  </header>
</template>

<script>
export default {
  data: () => ({
    title: "Github projects",
  }),
};
</script>

<style>
</style>