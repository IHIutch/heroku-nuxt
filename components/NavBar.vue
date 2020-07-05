<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-container>
      <b-navbar-brand :to="{ name: 'HomePage' }">RateMyStop</b-navbar-brand>

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
import { auth } from "@/modules/firebase";

export default {
  name: "Navbar",
  data() {
    return {
      signedIn: false
    };
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        auth.onAuthStateChanged(() => {
          if (this.$route.path === "/") {
            this.$router.go();
          } else {
            this.$router.push("/");
          }
        });
      });
    },
    isSignedIn() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.signedIn = true;
        } else {
          this.signedIn = false;
        }
      });
    }
  },
  created() {
    this.isSignedIn();
  }
};
</script>
