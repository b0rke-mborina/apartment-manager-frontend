<template>
	<!-- Line chart -->
	<LineComponent
		:chart-options="chartOptions"
		:chart-data="data"
		:chart-id="this.label"
		:dataset-id-key="this.label"
		:width="10"
		:height="10">
	</LineComponent>
</template>

<script>
import { Line as LineComponent } from 'vue-chartjs/legacy';
import 'chart.js/auto';
// ChartJS.register(Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale);

export default {
	name: 'ChartLine',
	components: { LineComponent },
	data() {
		return {
			data: {
				labels: [],
				datasets: [
					{
						borderColor: '#A5D4FF',
						backgroundColor: '#A5D4FF',
						color: "#000000",
						label: this.label,
						data: []
					}
				]
			},
			chartOptions: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: this.title
					},
					legend: {
						display: false
					},
				},
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		}
	},
	mounted() {
		console.log(this.labels);
		console.log(this.data.datasets);
		this.data.labels = this.labels;
		this.data.datasets = [ this.values ];
	},
	watch: {
		values() {
			this.data.datasets = [ this.values ];
		},
		labels() {
			this.data.labels = this.labels;
		},
	},
	props: {
		periods: String,
		labels: Array,
		values: Object,
		title: String,
		label: String
	}
}
</script>