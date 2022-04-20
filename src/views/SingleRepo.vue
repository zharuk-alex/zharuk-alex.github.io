<template>
  <div>
    this is Single repo page
    {{ Repo }}
  </div>
</template>

<script>
export default {
  name: "SingleRepo",
  computed: {
    Repo() {
      return this.$route.params.id;
    },
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style>
</style>