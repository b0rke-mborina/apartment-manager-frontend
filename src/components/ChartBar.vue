<template>
	<!-- Bar chart -->
	<Bar
		:chart-options="chartOptions"
		:chart-data="data"
		:chart-id="this.label"
		:dataset-id-key="this.label"
		:width="10"
		:height="10"
	/>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
	name: 'ChartBar',
	components: { Bar },
	data() {
		return {
			data: {
				labels: [],
				datasets: [
					{
						// modifies colors and label of chart
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
					// displays title of chart and hides its legend
					title: {
						display: true,
						text: this.title
					},
					legend: {
						display: false
					}
				},
				scales: {
					// makes chart start at 0 and show only integer values on y axis
					y: {
						beginAtZero: true,
						ticks: {
							precision: 0
						}
					}
				}
			}
		}
	},
	mounted() {
		// set received labels and data to chart
		// console.log(this.labels);
		// console.log(this.data.datasets);
		this.data.labels = this.labels;
		this.data.datasets = [ this.values ];
	},
	watch: {
		// updates chart with new data when received values change
		values() {
			this.data.datasets = [ this.values ];
		},
		// updates chart with new labels when received labels change
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