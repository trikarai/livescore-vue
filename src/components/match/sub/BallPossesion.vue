<template>
  <v-list-item>
    <v-list-item-content>
      <v-row>
        <v-col lg="12">
          <v-col class="text-center">
            {{ tech.typeName.replace(/([a-z])([A-Z])/g, "$1 $2") }}
          </v-col>
        </v-col>
        <v-col cols="12" lg="12" xs="12">
          <v-progress-linear
            rounded
            :color="getColorData(tech.home, tech.away, 'left')"
            :background-color="getColorData(tech.away, tech.home, 'right')"
            height="20"
            :value="tech.home"
            ><template v-slot:default="{ value }">
              <strong style="color: #000"
                >{{ Math.ceil(value) }}% - {{ Math.ceil(tech.away) }}%</strong
              >
            </template></v-progress-linear
          >
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
  methods: {
    getColorData(val1, val2, pos) {
      let color;
      if (val1 > val2) {
        color = "red darken-2";
      } else if (val1 < val2) {
        color = "grey";
      } else {
        pos === "left" ? (color = "red") : (color = "blue");
      }
      return color;
    },
  },
};
</script>

<style></style>
