<template>
  <CThemeProvider>
    <CReset />
    <Navbar />
    <Nuxt />
  </CThemeProvider>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'AdminLayout',
  components: {
    Navbar,
  },
  middleware: ['auth'],
}
</script>
