<template>
  <div class="home">
    <NavigationBar />
    <transition>
      <router-view />
    </transition>
    <v-spacer></v-spacer>
    <Footer />
    <!-- <v-bottom-navigation class="mt-5" fixed dark shift v-model="bottonNav">
      <v-btn value="1">
        <span>Match</span>
        <v-icon>mdi-soccer-field</v-icon>
      </v-btn>
      <v-btn value="2">
        <span>Music</span>
        <v-icon>mdi-music-note</v-icon>
      </v-btn>
      <v-btn value="3">
        <span>Book</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <v-btn value="4">
        <span>Image</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
  </div>
</template>

<script>
import Footer from "@/views/layout/Footer";

import NavigationBar from "./Navigation";
export default {
  components: {
    NavigationBar,
    Footer,
  },
};
</script>

<style></style>
