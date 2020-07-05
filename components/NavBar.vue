<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-container>
      <b-navbar-brand to="/">RateMyStop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">About</b-nav-item>
          <b-nav-item href="#">Changes</b-nav-item>
          <b-nav-item href="#">Research</b-nav-item>
          <b-nav-item href="#">FAQ</b-nav-item>
          <b-nav-item v-if="signedIn" @click="signOut">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      signedIn: false,
    };
  },
  methods: {},
};
</script>
