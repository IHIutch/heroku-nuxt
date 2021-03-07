<template>
  <Container v-chakra my="12">
    <CGrid template-columns="repeat(12, 1fr)" gap="6">
      <CBox grid-column-start="4" grid-column-end="10">
        <CBox shadow="sm" p="6" rounded="md" bg="white">
          <form @submit.prevent="logIn()">
            <CFormControl mb="4">
              <CFormLabel for="email">Email address</CFormLabel>
              <CInput
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter name"
              />
            </CFormControl>
            <CFormControl mb="4">
              <CFormLabel for="password">Password</CFormLabel>
              <CInput
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              />
            </CFormControl>
            <CButton type="submit">Log In</CButton>
          </form>
        </CBox>
      </CBox>
    </CGrid>
  </Container>
</template>

<script>
import Container from '~/components/global/Container.vue'
export default {
  name: 'Login',
  components: { Container },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    logIn() {
      this.$auth.loginWith('local', {
        data: this.form,
      })
    },
  },
}
</script>
