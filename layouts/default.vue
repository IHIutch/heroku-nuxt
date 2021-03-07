<template>
  <CThemeProvider>
    <CReset />
    <div class="font-barlow">
      <Navbar />
      <Nuxt />
    </div>
  </CThemeProvider>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
  },
}
</script>
