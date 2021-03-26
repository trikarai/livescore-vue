<template>
  <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Dark Theme</v-list-item-content>
        <v-list-item-action>
          <v-switch inset color="black" @change="switchTheme"></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    rightDrawer: {
      get() {
        return this.$store.state.rightDrawer;
      },
      set(val) {
        this.$store.commit("setRightDrawer", val);
      },
    },
  },
  methods: {
    switchTheme: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style></style>
