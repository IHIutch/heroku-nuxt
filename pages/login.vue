<template>
  <div class="mt-12">
    <b-container>
      <b-row>
        <b-col cols="6" offset="3">
          <div class="shadow p-4 rounded bg-white">
            <b-form @submit.prevent="logIn()">
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password" label-for="passwod">
                <b-form-input
                  id="password"
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Log In</b-button>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      this.$auth.loginWith("local", {
        email: this.form.email,
        password: this.form.password,
      });
    },
  },
};
</script>
