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
          <b-nav-item v-if="loggedIn" @click="logOut()">Sign Out</b-nav-item>
          <b-nav-item v-else to="/login">Log In</b-nav-item>
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
      loggedIn: false,
    };
  },
  methods: {
    logOut() {
      console.log("Logged Out");
    },
  },
};
</script>
