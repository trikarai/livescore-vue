<template>
  <v-col :lg="lg" :md="md">
    <v-alert type="error">
      <v-row align="center" no-gutters>
        <v-col>
          {{ text }}
        </v-col>
        <v-col class="shrink">
          <v-btn x-small @click="$emit('retry')">retry</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-col>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "fail to get data",
      required: false,
    },
    xl: {
      type: Number,
      default: 8,
      required: false,
    },
    lg: {
      type: Number,
      default: 12,
      required: false,
    },
    md: {
      type: Number,
      default: 12,
      required: false,
    },
  },
};
</script>

<style></style>
