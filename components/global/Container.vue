<template>
  <CBox :w="containerWidths" mx="auto">
    <slot />
  </CBox>
</template>

<script>
import { CBox } from '@chakra-ui/vue'

export default {
  components: {
    CBox,
  },
  data() {
    return {
      containerWidths: [
        '100%',
        '640px',
        '768px',
        '1024px',
        '1280px',
        // "1536px",
      ],
    }
  },
}
</script>
