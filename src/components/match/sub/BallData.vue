<template>
  <v-list-item>
    <v-list-item-content>
      <v-row>
        <v-col cols="12" lg="12"> </v-col>
        <v-col lg="12">
          <v-row class="d-flex justify-space-between">
            <v-col class="text-left">
              {{ tech.home }}
            </v-col>
            <v-col class="text-center"> {{ tech.typeName }} </v-col>
            <v-col class="text-right">
              {{ tech.away }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    tech: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
