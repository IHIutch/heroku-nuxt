<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'QRCode',
  props: {
    value: { type: String, required: true },
    width: { type: Number, default: 200 },
  },
  mounted() {
    const options = { width: this.width }
    QRCode.toCanvas(this.$refs.canvas, this.value, options, (err) => {
      if (err) throw err
    })
  },
}
</script>
