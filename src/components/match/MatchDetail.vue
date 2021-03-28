<template>
  <v-container fill-height>
    <v-row>
      <v-col lg="12" v-if="loading">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
      <v-col v-else cols="12" xs="12">
        <v-card>
          <v-card-title>{{ match.matchevent.name_en }} </v-card-title>
          <v-row class="d-flex justify-space-between mb-6 ma-2">
            <v-col class="d-flex justify-center">
              <v-row>
                <v-col>
                  <v-img
                    class="mx-auto"
                    contain
                    width="100"
                    :src="match.home_team.logo"
                  />
                </v-col>
                <v-col lg="12" md="12" sm="12" class="text-center">
                  {{ match.home_team.name_en }}
                </v-col>
              </v-row>
            </v-col>
            <v-col class="text-center">Vs</v-col>
            <v-col class="text-right">
              <v-row>
                <v-col>
                  <v-img
                    class="mx-auto"
                    contain
                    lazy-src="/img/image-not-found.svg"
                    width="100"
                    :src="match.away_team.logo"
                  >
                  </v-img>
                </v-col>
                <v-col lg="12" md="12" sm="12" class="text-center">
                  {{ match.away_team.name_en }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="12">
              <v-list>
                <v-subheader>Score</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-row class="d-flex justify-space-between">
                      <v-col class="text-left">
                        {{ match.home_team.score }}
                      </v-col>
                      <v-col class="text-center"> Full Time </v-col>
                      <v-col class="text-right">
                        {{ match.away_team.score }}
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-row class="d-flex justify-space-between">
                      <v-col class="text-left">
                        {{ match.home_team.half_score }}
                      </v-col>
                      <v-col class="text-center"> Half Time </v-col>
                      <v-col class="text-right">
                        {{ match.away_team.half_score }}
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list subheader>
                <v-subheader>Technical Stats</v-subheader>
                <template v-for="(tech, index) in match.techStats">
                  <ball-possesion
                    :key="index"
                    :tech="tech"
                    v-if="tech.typeName === 'BallPossession'"
                  />
                  <ball-data :key="index" :tech="tech" v-else />
                </template>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
        <!-- <pre> {{ match }}</pre> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
import BallPossesion from "./sub/BallPossesion.vue";
import BallData from "./sub/BallData.vue";

export default {
  components: { BallPossesion, BallData },
  data() {
    return {
      loading: false,
      match: "",
    };
  },
  mounted() {
    this.getMatchDetail();
  },
  methods: {
    getMatchDetail() {
      this.loading = true;
      this.$http
        .get(
          config.baseUri.api +
            "/match/matchdetail/" +
            this.$route.params.matchId,
          {
            headers: auth.getAuthHeader(),
          }
        )
        .then((res) => {
          this.match = res.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
