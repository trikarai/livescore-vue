<template>
  <v-list-item>
    <v-list-item-content>
      <v-row>
        <v-col cols="12" lg="12"> </v-col>
        <v-col lg="12">
          <v-row class="d-flex justify-space-between">
            <v-col class="text-left">
              <v-progress-linear
                :color="getColorData(tech.home, tech.away)"
                background-color="grey lighten-3"
                reverse
                :value="getPercent(tech.home)"
                height="20"
                ><template v-slot:default="{}">
                  <span style="color: #000"> {{ tech.home }}</span>
                </template></v-progress-linear
              >
            </v-col>
            <v-col class="text-center">
              {{ tech.typeName.replace(/([a-z])([A-Z])/g, "$1 $2") }}</v-col
            >
            <v-col class="text-right">
              <v-progress-linear
                :color="getColorData(tech.away, tech.home)"
                background-color="grey lighten-3"
                :value="getPercent(tech.away)"
                height="20"
                ><template v-slot:default="{}">
                  <span style="color: #000"> {{ tech.away }}</span>
                </template></v-progress-linear
              >
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
  computed: {
    buffer() {
      return this.tech.home + this.tech.away;
    },
  },
  methods: {
    getPercent(val) {
      return (val / (this.tech.home + this.tech.away)) * 100;
    },
    getColorData(val1, val2) {
      let color;
      if (val1 > val2) {
        color = "red darken-2";
      } else if (val1 < val2) {
        color = "grey";
      } else {
        color = "blue";
      }
      return color;
    },
  },
};
</script>

<style></style>
