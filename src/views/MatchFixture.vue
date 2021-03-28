<template>
  <v-container fill-height>
    <v-row>
      <v-progress-linear
        color="primary darken-2"
        absolute
        :indeterminate="true"
        v-if="loadingFilter"
      ></v-progress-linear>
      <alert-http
        :xl="6"
        :lg="12"
        :sm="12"
        v-if="httpError"
        @retry="getMatchFixtures"
      />
      <v-col v-if="loading">
        <v-skeleton-loader type="card@2"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" xl="6" lg="12" v-else>
        <span class="title">Today Games {{ today }}</span>
        <v-chip-group
          mandatory
          active-class="deep-purple accent-4 white--text"
          column
          v-model="statusMatch"
        >
          <v-chip value="running">Running</v-chip>
          <v-chip value="upcoming">Upcoming</v-chip>
          <v-chip value="finish">Finish</v-chip>
        </v-chip-group>
        <template v-if="filterMatch.length === 0">
          <v-alert type="info" :value="true">
            No {{ statusMatch }} Matches Found
          </v-alert>
        </template>
        <template v-for="data in filterMatch">
          <v-card class="mb-5" :key="data.id">
            <v-card-title>
              {{ data.eventName }}
            </v-card-title>
            <v-row no-gutters class="d-flex justify-center">
              <v-col cols="12" lg="12" class="text-center">
                <template v-if="data.statusName == 'Ending'">
                  <span class="display-1">
                    {{ data.homeTeamEvent.score }} -
                    {{ data.awayTeamEvent.score }}
                  </span>
                </template>
                <v-chip v-else :color="getColorStatus(data.statusName)">{{
                  data.statusName.replace(/([a-z])([A-Z])/g, "$1 $2")
                }}</v-chip>
              </v-col>
              <v-col lg="12" class="text-center ma-2">
                <v-chip>{{
                  data.matchTimeStamp
                    | luxon({
                      input: {
                        zone: "utc",
                        format: "seconds",
                      },
                      output: {
                        zone: "local",
                        format: "full",
                      },
                    })
                }}</v-chip>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-space-between mb-6 ma-2">
              <v-col class="d-flex justify-center">
                <v-row>
                  <v-col>
                    <v-img
                      class="mx-auto"
                      contain
                      width="100"
                      :src="data.homeTeamEvent.logoUrl"
                    />
                  </v-col>
                  <v-col lg="12" md="12" sm="12" class="text-center">
                    {{ data.homeTeamEvent.name }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="text-center"
                ><span class="display-1"> VS </span>
              </v-col>
              <v-col class="text-right">
                <v-row justify="center" align="center">
                  <v-col>
                    <v-img
                      class="mx-auto"
                      contain
                      lazy-src="/img/image-not-found.svg"
                      width="100"
                      :src="data.awayTeamEvent.logoUrl"
                    >
                    </v-img>
                  </v-col>
                  <v-col lg="12" md="12" sm="12" class="text-center">
                    {{ data.awayTeamEvent.name }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn
                depressed
                text
                :to="{ name: 'match-detail', params: { matchId: data.gameId } }"
                >Detail</v-btn
              >
            </v-card-actions>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span>
                    <v-icon left>mdi-chart-timeline-variant</v-icon>
                    Statistic</span
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col lg="12">
                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-row class="d-flex justify-space-between">
                              <v-col class="text-left">
                                {{ data.homeTeamEvent.score }}
                              </v-col>
                              <v-col class="text-center"> Score </v-col>
                              <v-col class="text-right">
                                {{ data.awayTeamEvent.score }}
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-row class="d-flex justify-space-between">
                              <v-col class="text-left">
                                {{ data.homeTeamEvent.halfTime }}
                              </v-col>
                              <v-col class="text-center"> Half Time </v-col>
                              <v-col class="text-right">
                                {{ data.awayTeamEvent.halfTime }}
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-row class="d-flex justify-space-between">
                              <v-col class="text-left">
                                {{ data.homeTeamEvent.redCard }}
                              </v-col>
                              <v-col class="text-center"> Red Card </v-col>
                              <v-col class="text-right">
                                {{ data.awayTeamEvent.redCard }}
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-row class="d-flex justify-space-between">
                              <v-col class="text-left">
                                {{ data.homeTeamEvent.yellowCard }}
                              </v-col>
                              <v-col class="text-center"> Yellow Card </v-col>
                              <v-col class="text-right">
                                {{ data.awayTeamEvent.yellowCard }}
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-row class="d-flex justify-space-between">
                              <v-col class="text-left">
                                {{ data.homeTeamEvent.cornerKick }}
                              </v-col>
                              <v-col class="text-center"> Corner Kick </v-col>
                              <v-col class="text-right">
                                {{ data.awayTeamEvent.cornerKick }}
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as config from "@/config/config";
import auth from "@/config/auth";
// import _ from "lodash";

export default {
  data() {
    return {
      httpError: false,
      statusMatch: "running",
      bottonNav: 1,
      loading: false,
      loadingFilter: false,
      fixtures: {
        result: [
          {
            gameId: 3524592,
            indexLeague: 99,
            eventId: 1682,
            status: 1,
            statusName: "NotStarted",
            matchTimeStamp: 1616803200,
            matchTime: "2021-03-27T00:00:00",
            teeTimeStamp: 1616803200,
            teeTime: "2021-03-27T00:00:00",
            homeTeamEvent: {
              id: 47534,
              leagueRank: "",
              score: 0,
              halfTime: 0,
              redCard: 0,
              yellowCard: 0,
              cornerKick: 0,
              overTimeScore: 0,
              penaltyShootOutScore: 0,
              logoUrl:
                "https://cdn.elevenscore.com/football/team/f0d3a582dd58fa6f57d145187653f0b5.png",
              name: "Costa Del Este Reserves",
            },
            awayTeamEvent: {
              id: 38166,
              leagueRank: "",
              score: 0,
              halfTime: 0,
              redCard: 0,
              yellowCard: 0,
              cornerKick: 0,
              overTimeScore: 0,
              penaltyShootOutScore: 0,
              logoUrl:
                "https://cdn.elevenscore.com/football/team/62e85975cce52e19800d7c325767257b.png",
              name: "CD Arabe Unido Reserves",
            },
            seasson: {
              id: 0,
              year: "",
              hasAnimation: true,
              hasInformation: false,
              hasLineUp: false,
              hasVideo: false,
            },
            eventName: "Panama Reserve League",
            eventShortName: "PRL",
            countryId: null,
            areaId: null,
            competitionLogo: null,
            countryLogo: null,
            countryName: null,
            leagueColour: {
              liga: "PRL",
              color: "#FDFD86",
              textColor: "#000000",
            },
            analysis: 1,
            oddsComp: 1,
            odds1x2: 1,
            odds3in1: 1,
          },
        ],
      },
      date: "",
      utc: "+7",
      today: "",
    };
  },
  created() {
    var today = new Date();
    // this.today = this.formatDate(today);
    this.date = this.formatDate(today);
  },
  mounted() {
    this.getMatchFixtures();
  },
  computed: {
    filterMatch() {
      if (this.statusMatch === "running") {
        return this.fixtures.result.filter(
          (o) => {
            if (o.statusName === "FirstHalf" || o.statusName === "SecondHalf") {
              return true;
            } else {
              return false;
            }
          }
          // o.statusName.includes("SecondHalf")
        );
      } else if (this.statusMatch === "upcoming") {
        return this.fixtures.result.filter((o) => {
          if (o.statusName === "NotStarted" || o.statusName === "Postponed") {
            return true;
          } else {
            return false;
          }
        });
      } else if (this.statusMatch === "finish") {
        return this.fixtures.result.filter((o) =>
          o.statusName.includes("Ending")
        );
      } else {
        return this.fixtures.result;
      }
    },
  },
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("");
    },
    // checkInclude(status) {},
    getColorStatus(status) {
      switch (status) {
        case "Ending":
          return "#ffcccb";
        case "NotStarted":
          return "#grey ";
        case "Postponed":
          return "#ffffed ";
        case "FirstHalf":
          return "#90ee90 ";
        case "SecondHalf":
          return "#90ee90 ";
        default:
          return "grey";
      }
    },
    getMatchFixtures() {
      this.httpError = false;
      this.loading = true;
      this.$http
        .get(config.baseUri.api + "/match/matchfixtures", {
          params: {
            date: this.date,
            utc: this.utc,
          },
          headers: auth.getAuthHeader(),
        })
        .then((res) => {
          this.fixtures = res.data;
        })
        .catch((error) => {
          console.log(error);
          this.httpError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
