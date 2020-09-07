<template>
  <b-container class="py-5">
    <b-row>
      <b-col cols="12">
        <h1>Buffalo, NY</h1>
        <p>
          This is Buffalo, NY's RateMyStop. See below for how well each stop is
          rated
        </p>
      </b-col>
      <!-- <b-col cols="12">
        <div class="p-4 shadow-sm rounded mb-4 bg-white">
          <div class="embed-responsive embed-responsive-21by9">
            <client-only>
              <l-map
                class="embed-responsive-item"
                :zoom="12"
                :center="[42.8864, -78.8784]"
              >
                <l-tile-layer
                  :url="`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapbox.accessToken}`"
                ></l-tile-layer>
                <l-feature-group ref="features">
                  <l-popup>
                    <span>{{ mapbox.caller }}</span>
                  </l-popup>
                </l-feature-group>
                <l-circle-marker
                  v-for="(stop, idx) in stopScores"
                  :key="idx"
                  :lat-lng="[stop.stopLat, stop.stopLon]"
                  :radius="5"
                  :weight="0"
                  :fillOpacity="1"
                  :fillColor="getColor(stop.overall)"
                  @click="
                    markerClick([stop.stopLat, stop.stopLon], stop.stopName)
                  "
                />
              </l-map>
            </client-only>
          </div>
        </div>
      </b-col> -->
      <b-col cols="12">
        <div class="p-4 shadow-sm rounded bg-white">
          <b-row>
            <b-col cols="6">
              <b-form-group
                label="Search"
                label-cols="auto"
                label-for="filterInput"
                class="mb-0"
              >
                <b-input-group>
                  <b-form-input
                    v-model="table.filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      :disabled="!table.filter"
                      @click="table.filter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-pagination
                v-model="table.currentPage"
                :total-rows="stopScores.length"
                :per-page="table.perPage"
                align="right"
              ></b-pagination>
            </b-col>
            <b-col cols="12" class="mt-4">
              <b-table
                hover
                small
                :items="stopScores"
                :fields="fields"
                :per-page="table.perPage"
                :current-page="table.currentPage"
                :filter="table.filter"
              >
                <template v-slot:cell(safety)="data">
                  <b-badge :variant="getVariant(data.item.safety)">
                    {{ data.item.safety }}%
                  </b-badge>
                </template>
                <template v-slot:cell(accessibility)="data">
                  <b-badge :variant="getVariant(data.item.accessibility)">
                    {{ data.item.accessibility }}%
                  </b-badge>
                </template>
                <template v-slot:cell(sanitary)="data">
                  <b-badge :variant="getVariant(data.item.sanitary)">
                    {{ data.item.sanitary }}%
                  </b-badge>
                </template>
                <template v-slot:cell(wayfinding)="data">
                  <b-badge :variant="getVariant(data.item.wayfinding)">
                    {{ data.item.wayfinding }}%
                  </b-badge>
                </template>
                <template v-slot:cell(comfort)="data">
                  <b-badge :variant="getVariant(data.item.comfort)">
                    {{ data.item.comfort }}%
                  </b-badge>
                </template>
                <template v-slot:cell(overall)="data">
                  <b-badge :variant="getVariant(data.item.overall)">
                    {{ data.item.overall }}%
                  </b-badge>
                </template>
                <template v-slot:cell(link)="data">
                  <router-link :to="`/stops/${data.item.id}`">
                    Details
                  </router-link>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getColorByNumber } from "@/functions/index";

export default {
  name: "HomePage",
  async asyncData({ $axios, route, error, env }) {
    return $axios.$get(`${$axios.defaults.baseURL}/stops`).then((res) => {
      return { stops: res };
    });
  },
  data() {
    return {
      table: {
        perPage: 25,
        filter: "",
        currentPage: 1,
      },
      mapbox: {
        caller: "",
        accessToken:
          "pk.eyJ1IjoiamJodXRjaCIsImEiOiJjamRqZGU1eTYxMTZlMzNvMjV2dGxzdG8wIn0.IAAk5wKeLXOUaQ4QYF3sEA", // your access token. Needed if you using Mapbox maps
      },
      fields: [
        { key: "rank", sortable: true, label: "Rank" },
        // {
        //   key: "stopId",
        //   sortable: true,
        //   label: "Stop ID",
        // },
        {
          key: "stopName",
          sortable: true,
          label: "Stop Name",
        },
        {
          key: "safety",
          sortable: true,
          label: "Safety",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "accessibility",
          sortable: true,
          label: "Accessibility",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "sanitary",
          sortable: true,
          label: "Sanitary",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "wayfinding",
          sortable: true,
          label: "Wayfinding",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "comfort",
          sortable: true,
          label: "Comfort",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "overall",
          sortable: true,
          label: "Overall",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "link",
          sortable: false,
          label: "",
        },
      ],
    };
  },
  methods: {
    markerClick(latLng, caller) {
      this.mapbox.caller = caller;
      this.$refs.features.mapObject.openPopup(latLng);
    },
    getVariant(score) {
      return score >= 90
        ? "success"
        : score < 90 && score >= 50
        ? "warning"
        : "danger";
    },
    getColor(score) {
      return getColorByNumber(score);
    },
    randomNumber() {
      return Math.floor(Math.random() * 100);
    },
    // navigateToStop(stop) {
    //   const stopId = stop.stopId;
    //   this.$router.push(`stops/${stopId}`);
    // },
  },
  computed: {
    stopScores() {
      return this.stops.map((stop, idx) => {
        var safety = this.randomNumber();
        var accessibility = this.randomNumber();
        var sanitary = this.randomNumber();
        var wayfinding = this.randomNumber();
        var comfort = this.randomNumber();
        return {
          ...stop,
          rank: idx + 1,
          safety: safety,
          accessibility: accessibility,
          sanitary: sanitary,
          wayfinding: wayfinding,
          comfort: comfort,
          overall:
            (safety + accessibility + sanitary + wayfinding + comfort) / 5,
        };
      });
    },
  },
};
</script>
