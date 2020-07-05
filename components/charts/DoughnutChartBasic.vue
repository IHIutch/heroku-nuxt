<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "DoughnutChartRounded",
  extends: Doughnut,
  props: {
    foregroundColor: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    backgroundColor: { type: String, default: "rgba(255,255,255,0.2)" },
    percent: { type: Number, default: 85 },
    thickness: { type: Number, default: 15 }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 0,
        animation: {
          animationRotate: true,
          duration: 2000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        rotation: 0.8 * Math.PI,
        circumference: 1.4 * Math.PI
      },
      chartData: {
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: [],
            borderWidth: [0, 0]
          }
        ]
      }
    };
  },
  created() {
    this.chartData.datasets[0].data = [this.percent, this.percent - 100];
    this.chartData.datasets[0].backgroundColor[0] = this.foregroundColor;
    this.chartData.datasets[0].hoverBackgroundColor[0] = this.foregroundColor;
    this.chartData.datasets[0].backgroundColor[1] = this.backgroundColor;
    this.chartData.datasets[0].hoverBackgroundColor[1] = this.backgroundColor;
    this.chartOptions.cutoutPercentage = 100 - this.thickness;
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
};
</script>
