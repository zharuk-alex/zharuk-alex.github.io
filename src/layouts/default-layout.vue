<template>
  <v-container>
    <v-card>
      <div class="d-flex">
        <aside-component v-model="drawer"></aside-component>
        <v-container>
          <header-component
            @drawer-updated="drawer = !drawer"
          ></header-component>
          <slot name="content"></slot>
        </v-container>
      </div>
      <footer-component></footer-component>
    </v-card>
  </v-container>
</template>

<script>
import AsideComponent from "@/components/Aside";
import FooterComponent from "@/components/Footer";
import HeaderComponent from "@/components/Header";

export default {
  name: "DefaultLayout",
  components: {
    AsideComponent,
    FooterComponent,
    HeaderComponent,
  },
  data: () => ({
    drawer: false,
  }),
};
</script>