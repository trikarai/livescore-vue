<template>
  <nav>
    <v-app-bar app class="elevation-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title> elevenscore</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$store.commit('setRightDrawer', true)">
        <v-icon class="">mdi-cogs</v-icon>
      </v-btn>
    </v-app-bar>
    <v-btn
      style="margin-left: 10px"
      icon
      v-if="$route.meta.level !== 0"
      @click="$router.go(-1)"
    >
      <v-icon>mdi-keyboard-backspace</v-icon>
    </v-btn>
    <v-navigation-drawer app v-model="drawer" :mini-variant="miniVariant">
      <!-- list head-->
      <v-list>
        <v-list-item
          class="pa-1"
          v-if="miniVariant"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-list-item-action>
            <v-icon small>mdi-arrow-expand-right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-avatar style="right: 11px !important">
            <div class="icon colored"></div>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>elevenscore</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon small>mdi-arrow-collapse-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item router :to="{ name: 'match-fixture' }">
          <v-list-item-action>
            <v-icon>mdi-soccer-field</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="">Match</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-shoe-cleat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="">Player</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <RightDrawer :rightDrawer.sync="rightDrawer" />
  </nav>
</template>
<script>
import RightDrawer from "@/components/drawer/RightDrawer";
export default {
  components: {
    RightDrawer,
  },
  data() {
    return {
      rightDrawer: false,
      drawer: false,
      miniVariant: false,
    };
  },
};
</script>
<style></style>
