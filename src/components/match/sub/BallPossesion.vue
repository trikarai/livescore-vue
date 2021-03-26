<template>
  <v-list-item>
    <v-list-item-content>
      <v-row>
        <v-col lg="12">
          <v-col class="text-center"> {{ tech.typeName }} </v-col>
        </v-col>
        <v-col cols="12" lg="12" xs="12">
          <v-progress-linear
            rounded
            background-color="yellow darken-1"
            color="pink darken-1"
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
};
</script>

<style></style>
