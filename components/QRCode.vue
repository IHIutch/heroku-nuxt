<template>
  <img :src="qrUrl" alt="" />
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'QRCode',
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      qrUrl: '',
    }
  },
  // computed() {
  //   const options = { width: this.$refs.canvas.clientWidth }
  //   QRCode.toDataURL(this.value, (err) => {
  //     if (err) throw err
  //   })
  // },
  async created() {
    this.qrUrl = await QRCode.toDataURL(this.value, { margin: 0 })
  },
}
</script>
