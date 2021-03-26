<template>
  <v-footer class="subtitle-1 mt-1" color="grey lighten-3" height="auto" app>
    <!-- <v-bottom-navigation
      class="mt-5"
      hide-on-scroll
      fixed
      dark
      v-model="bottonNav"
    >
      <v-btn>
        <span>Match</span>
        <v-icon>mdi-soccer-field</v-icon>
      </v-btn>
      <v-btn>
        <span>Player</span>
        <v-icon>mdi-shoe-cleat</v-icon>
      </v-btn>
      <v-btn>
        <span>Book</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <v-btn>
        <span>Image</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
    <div class="grey--text subtitle-2 ml-auto">
      &copy;2021,
      <strong>Version | {{ appVersion }}</strong>
    </div>
  </v-footer>
</template>
<script>
import { version } from "../../../package.json";

export default {
  data() {
    return {
      appVersion: "",
      bottonNav: 1,
    };
  },
  created() {
    this.appVersion = version;
  },
};
</script>
