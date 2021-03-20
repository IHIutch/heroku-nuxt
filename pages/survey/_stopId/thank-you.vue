<template>
  <CBox>
    <Container>
      <CGrid template-columns="repeat(12, 1fr)" gap="6">
        <CBox grid-column-start="4" grid-column-end="10">
          <CBox my="4">
            <CHeading as="h1" font-size="2xl">{{ stop.stopName }}</CHeading>
            <CBox color="gray.600">
              <CText as="span" font-weight="semibold" mr="1">Stop ID: </CText>
              <CText as="span">{{ stop.stopCode }}</CText>
            </CBox>
          </CBox>
          <CBox
            bg="white"
            shadow="sm"
            p="8"
            w="100%"
            rounded="lg"
            text-align="center"
          >
            <CBox mb="12">
              <CHeading as="h2" font-size="4xl">Thank You!</CHeading>
              <CText color="gray.600" font-size="lg"
                >Your contribution makes Buffalo a better place.</CText
              >
            </CBox>
            <CBox mb="12">
              <CText color="gray.600" font-size="lg" mb="2">
                Help keep the contributions coming by sharing with your
                community!
              </CText>
              <CButtonGroup :spacing="2">
                <CButton variant-color="blue">Share on Facebook</CButton>
                <CButton variant-color="cyan">Share on Twitter</CButton>
              </CButtonGroup>
            </CBox>
            <CBox>
              <CText color="gray.600" font-size="lg" mb="2">
                Your submission has updated the Stop Score, check out the latest
                score.
              </CText>
              <CButton as="nuxt-link" :to="`/stops/${stop.id}`"
                >See Latest Score</CButton
              >
            </CBox>
          </CBox>
        </CBox>
      </CGrid>
    </Container>
  </CBox>
</template>

<script>
export default {
  name: 'ThankYou',
  async fetch({ store, route }) {
    if (!store.getters['stops/getAllStops']) {
      await store.dispatch('stops/fetchAllStops')
    }
    if (!store.getters['watchers/getUniqueWatcher']) {
      await store.dispatch('watchers/fetchUniqueWatcher', route.params.stopId)
    }
  },
  computed: {
    stop() {
      return this.$store.getters['stops/getOneStop'](this.$route.params.stopId)
    },
  },
}
</script>
