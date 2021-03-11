<template>
  <Container v-chakra py="5">
    <CGrid template-columns="repeat(12, 1fr)" gap="6">
      <CBox grid-column-start="1" grid-column-end="12">
        <CHeading as="h1">Buffalo, NY</CHeading>
        <CText>
          This is Buffalo, NY's RateMyStop. See below for how well each stop is
          rated
        </CText>
      </CBox>
      <CBox grid-column-start="1" grid-column-end="12">
        <CBox p="4" shadow="sm" rounded="md" mb="4" bg="white">
          <CAspectRatioBox :ratio="21 / 9">
            <CBox>
              <client-only>
                <l-map v-chakra :zoom="12" :center="[42.8864, -78.8784]">
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
                    :fill-opacity="1"
                    :fill-color="getColor(stop.overall)"
                    @click="
                      markerClick([stop.stopLat, stop.stopLon], stop.stopName)
                    "
                  />
                </l-map>
              </client-only>
            </CBox>
          </CAspectRatioBox>
        </CBox>
      </CBox>
      <CBox grid-column-start="1" grid-column-end="12">
        <CBox p="4" shadow="sm" rounded="md" mb="4" bg="white">
          <table v-chakra w="100%">
            <thead>
              <tr>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Rank
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Stop Name
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Safety
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Accessibility
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Sanitary
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Wayfinding
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Comfort
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                >
                  Overall
                </th>
                <th
                  v-chakra
                  font-weight="bold"
                  text-transform="uppercase"
                  letter-spacing="wider"
                  padding-left="6"
                  padding-right="6"
                  padding-top="3"
                  padding-bottom="3"
                  line-height="1rem"
                  font-size="xs"
                  color="gray.600"
                  border-bottom-width="1px"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stop, idx) in stopScores" :key="idx">
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                ></td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  {{ stop.stopName }}
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CBadge
                    v-if="stop.scores.safety !== false"
                    :variant-color="getVariant(stop.scores.safety)"
                  >
                    {{ stop.scores.safety }}
                  </CBadge>
                  <CText v-else>-</CText>
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CBadge
                    v-if="stop.scores.accessibility !== false"
                    :variant-color="getVariant(stop.scores.accessibility)"
                  >
                    {{ stop.scores.accessibility }}
                  </CBadge>
                  <CText v-else>-</CText>
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CBadge
                    v-if="stop.scores.sanitary !== false"
                    :variant-color="getVariant(stop.scores.sanitary)"
                  >
                    {{ stop.scores.sanitary }}
                  </CBadge>
                  <CText v-else>-</CText>
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CBadge
                    v-if="stop.scores.wayfinding !== false"
                    :variant-color="getVariant(stop.scores.wayfinding)"
                  >
                    {{ stop.scores.wayfinding }}
                  </CBadge>
                  <CText v-else>-</CText>
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CBadge
                    v-if="stop.scores.comfort !== false"
                    :variant-color="getVariant(stop.scores.comfort)"
                  >
                    {{ stop.scores.comfort }}
                  </CBadge>
                  <CText v-else>-</CText>
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CBadge
                    v-if="stop.scores.overall !== false"
                    :variant-color="getVariant(stop.scores.overall)"
                  >
                    {{ stop.scores.overall }}
                  </CBadge>
                  <CText v-else>-</CText>
                </td>
                <td
                  v-chakra
                  padding-left="6"
                  padding-right="6"
                  padding-top="4"
                  padding-bottom="4"
                  line-height="1.25rem"
                  border-bottom-width="1px"
                >
                  <CLink as="nuxt-link" :to="`/stops/${stop.stopId}`"
                    >Details</CLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </CBox>
      </CBox>
    </CGrid>
  </Container>
</template>

<script>
import { getColorByNumber } from '@/functions/index'
import Container from '~/components/global/Container.vue'

export default {
  name: 'Dashboard',
  components: {
    Container,
  },
  async asyncData({ store }) {
    if (!store.getters['stops/getStops'].length)
      await store.dispatch('stops/fetchStops')
  },
  data() {
    return {
      table: {
        perPage: 25,
        filter: '',
        currentPage: 1,
      },
      mapbox: {
        caller: '',
        accessToken:
          'pk.eyJ1IjoiamJodXRjaCIsImEiOiJjamRqZGU1eTYxMTZlMzNvMjV2dGxzdG8wIn0.IAAk5wKeLXOUaQ4QYF3sEA', // your access token. Needed if you using Mapbox maps
      },
    }
  },
  computed: {
    stopScores() {
      const categories = [
        'safety',
        'accessibility',
        'sanitary',
        'wayfinding',
        'comfort',
      ]

      return this.$store.getters['stops/getStops'].map((stop, idx) => {
        const scores = Object.assign(
          {},
          ...categories.map((cat) => {
            return {
              [cat]: stop.categoryScores
                ? stop.categoryScores.find((catScore) => {
                    return catScore.category.toLowerCase() === cat
                  }).score
                : false,
            }
          })
        )

        scores.overall = Object.values(scores).reduce((acc, score) => {
          return score
            ? (acc += score / Object.keys(scores).length)
            : (acc += 0)
        }, 0)

        return {
          ...stop,
          scores,
        }
      })
    },
  },
  methods: {
    markerClick(latLng, caller) {
      this.mapbox.caller = caller
      this.$refs.features.mapObject.openPopup(latLng)
    },
    getVariant(score) {
      return score >= 90
        ? 'green'
        : score < 90 && score >= 50
        ? 'yellow'
        : 'red'
    },
    getColor(score) {
      return getColorByNumber(score)
    },
    randomNumber() {
      return Math.floor(Math.random() * 100)
    },
    // navigateToStop(stop) {
    //   const stopId = stop.stopId;
    //   this.$router.push(`stops/${stopId}`);
    // },
  },
}
</script>
