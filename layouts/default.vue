<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "DefaultLayout",
  components: {
    NavBar,
  },
};
</script>
