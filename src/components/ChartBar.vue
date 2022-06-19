<template>
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
					}
				},
				scales: {
					y: {
						ticks: {
							precision: 0
						}
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