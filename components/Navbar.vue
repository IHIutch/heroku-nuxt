<template>
  <CBox bg="white" shadow="sm">
    <Container>
      <CFlex wrap="wrap" align="center">
        <CBox mr="12">
          <CLink
            as="nuxt-link"
            to="/"
            d="flex"
            align-items="center"
            px="4"
            :mx="-4"
            h="16"
            _hover=""
            font-size="lg"
            font-weight="bold"
            >RateMyStop</CLink
          >
        </CBox>
        <CCloseButton
          ml="auto"
          :d="['block', '', 'none']"
          @click="isShowing = !isShowing"
        />
        <CFlex
          :flex="['', '', '1']"
          :flex-direction="['column', '', 'row']"
          :d="[isShowing ? 'flex' : 'none', '', 'flex']"
          align="stretch"
          :w="['full', '', 'auto']"
        >
          <CBox h="100%">
            <CLink
              v-for="(link, idx) in links"
              :key="idx"
              as="nuxt-link"
              :to="link.path"
              h="16"
              :d="['flex', '', 'inline-flex']"
              font-weight="medium"
              align-items="center"
              px="4"
              >{{ link.title }}</CLink
            >
          </CBox>
          <CBox :ml="['', '', 'auto']">
            <template v-if="$auth.loggedIn">
              <CLink
                as="button"
                h="16"
                :d="['flex', '', 'inline-flex']"
                font-weight="medium"
                align-items="center"
                px="4"
                @click="logOut()"
                >Log Out</CLink
              >
            </template>
            <template v-else>
              <CLink
                as="nuxt-link"
                to="/login"
                h="16"
                :d="['flex', '', 'inline-flex']"
                font-weight="medium"
                align-items="center"
                px="4"
                >Log In</CLink
              >
            </template>
          </CBox>
        </CFlex>
      </CFlex>
    </Container>
  </CBox>
</template>

<script>
import Container from './global/Container.vue'
export default {
  name: 'Navbar',
  components: { Container },
  data() {
    return {
      isShowing: false,
      links: [
        { title: 'About', path: '#' },
        { title: 'Changes', path: '#' },
        { title: 'Research', path: '#' },
        { title: 'FAQ', path: '#' },
      ],
    }
  },
  methods: {
    logOut() {
      this.$auth.logout()
    },
  },
}
</script>
