<script>
import { Chart } from 'chart.js'
import { generateChart } from 'vue-chartjs'

// This gives the chart a round edge
Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut)
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
  draw(ease) {
    const ctx = this.chart.chart.ctx

    const easingDecimal = ease || 1
    Chart.helpers.each(this.getMeta().data, function (arc) {
      arc.transition(easingDecimal).draw()

      const vm = arc._view
      const radius = (vm.outerRadius + vm.innerRadius) / 2
      const thickness = (vm.outerRadius - vm.innerRadius) / 2
      const angle = Math.PI - vm.endAngle - Math.PI / 2

      ctx.save()
      ctx.fillStyle = vm.backgroundColor
      ctx.translate(vm.x, vm.y)
      ctx.beginPath()
      ctx.arc(
        radius * Math.sin(angle),
        radius * Math.cos(angle),
        thickness,
        0,
        2 * Math.PI
      )
      ctx.arc(
        radius * Math.sin(Math.PI),
        radius * Math.cos(Math.PI),
        thickness,
        0,
        2 * Math.PI
      )
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    })
  },
})

const RoundedDoughnut = generateChart('rounded-doughnut', 'RoundedDoughnut')

export default {
  name: 'DoughnutChartRounded',
  extends: RoundedDoughnut,
  props: {
    foregroundColor: {
      type: String,
      default: 'rgba(255,255,255,1)',
    },
    backgroundColor: { type: String, default: 'rgba(255,255,255,0.2)' },
    percent: { type: Number, default: 85 },
    thickness: { type: Number, default: 15 },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 0,
        animation: {
          animationRotate: true,
          duration: 2000,
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        rotation: 0.8 * Math.PI,
        circumference: 1.4 * Math.PI,
      },
      chartData: {
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
            borderWidth: [0, 0],
          },
        ],
      },
    }
  },
  created() {
    this.chartData.datasets[0].data = [this.percent, this.percent - 100]
    this.chartData.datasets[0].backgroundColor[0] = this.foregroundColor
    this.chartData.datasets[0].hoverBackgroundColor[0] = this.foregroundColor
    this.chartData.datasets[0].backgroundColor[1] = this.backgroundColor
    this.chartData.datasets[0].hoverBackgroundColor[1] = this.backgroundColor
    this.chartOptions.cutoutPercentage = 100 - this.thickness
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  },
}
</script>
