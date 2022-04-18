<template>
  <v-navigation-drawer
    :floating="!isMobile"
    :permanent="!isMobile"
    dark
    :width="isMobile ? '80%' : 350"
    class="rounded-0 rounded-l white--text pa-2"
    v-model="localDrawer"
    :absolute="isMobile"
    :temporary="isMobile"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ subtext }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-btn class="my-2" href="https://github.com/zzharuk/" target="_blank" text>
      github profile
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: { value: { type: Boolean } },
  data: () => ({
    localDrawer: false,
    title: "zzharuk.github.io",
    subtext: "javascript developer",
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  mounted() {
    this.localDrawer = this.value;
  },
  watch: {
    value: function () {
      this.localDrawer = this.value;
    },
    localDrawer: function () {
      this.$emit("input", this.localDrawer);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  min-height: 100%;
  height: auto !important;
}
</style>