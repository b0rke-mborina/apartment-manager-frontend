<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Analytics</h1>
		<!-- Number of accomodations -->
		<div class="accomodation-grid text-center mt-9">
			<v-card color="#E3EAEF" elevation="0" rounded="xl" class="number-flex py-3 px-6 mb-4">
				<FormLabel text="You have" />
				<div class="text-center">
					<v-btn v-if="data"
						 elevation="2" x-large text fab
						 class="accomodation-number my-3">
					<span>{{ data.length }}</span>
				</v-btn>
				</div>
				<FormLabel text="private accomodations" />
			</v-card>
			<!-- Select accomodations for including its data into analytics -->
			<v-card v-if="data && data.length > 0"
					  elevation="0" rounded="xl" color="#E3EAEF" class="py-3 px-6 mb-4">
				<FormLabel text="Show data for:" class="mb-3" />
				<v-checkbox v-for="accomodation in data" v-bind:key="accomodation._id"
								v-model="selectedAccomodations" :label="accomodation.name" :value="accomodation"
								@change="updateData(accomodation._id)" class="mt-1">
				</v-checkbox>
			</v-card>
		</div>
		<!-- Earnings analytics (per year, per month of year) -->
		<h3 class="text-center mt-9 mb-4">Earnings analytics</h3>
		<div class="chart-flex">
			<ChartLine v-if="analytics.earningsInEur.yearlyLabels.length > 0"
						  periods="years" :values="analytics.earningsInEur.yearly"
						  :labels="analytics.earningsInEur.yearlyLabels"
						  title="Earnings in EUR" label="Earnings"
						  class="chart" />
			<ChartLine periods="months" :values="analytics.earningsInEur.monthly"
						  :labels="['January', 'February', 'March', 'April', 'May', 'June',
									   'July', 'August', 'September', 'October', 'November', 'December']"
						  title="Earnings in EUR (all years combined)" label="Earnings"
						  class="chart" />
		</div>
		<!-- Periods (occupied, available) analytics (per year, per month of year) -->
		<h3 class="text-center mt-9 mb-4">Periods analytics</h3>
		<div class="chart-flex">
			<ChartLine v-if="analytics.daysOccupied.yearlyLabels.length > 0"
						  periods="years" :values="analytics.daysOccupied.yearly"
						  :labels='analytics.daysOccupied.yearlyLabels'
						  title="Occupied days" label="Days"
						  class="chart" />
			<ChartLine periods="months" :values="analytics.daysOccupied.monthly"
						  :labels="['January', 'February', 'March', 'April', 'May', 'June',
									   'July', 'August', 'September', 'October', 'November', 'December']"
						  title="Occupied days (all years combined)" label="Days"
						  class="chart" />
		</div>
		<!-- Reservations (numbers, countries) analytics (per year, per month of year) -->
		<h3 class="text-center mt-9 mb-4">Reservations analytics</h3>
		<div class="chart-flex">
			<ChartBar v-if="analytics.numberOfReservations.yearlyLabels.length > 0"
						 periods="years" :values="analytics.numberOfReservations.yearly"
						 :labels='analytics.numberOfReservations.yearlyLabels'
						 title="Quantity of reservations" label="Reservations"
						 class="chart" />
			<ChartBar periods="months" :values="analytics.numberOfReservations.monthly"
						 :labels="['January', 'February', 'March', 'April', 'May', 'June',
									  'July', 'August', 'September', 'October', 'November', 'December']"
						 title="Quantity of reservations (all years combined)" label="Reservations"
						 class="chart" />
		</div>
		<!-- Guests (numbers, countries) analytics (per year, per month of year) -->
		<h3 class="text-center mt-9 mb-4">Guests analytics</h3>
		<div class="chart-flex">
			<ChartBar v-if="analytics.numberOfGuests.yearlyLabels.length > 0"
						 periods="years" :values="analytics.numberOfGuests.yearly"
						 :labels='analytics.numberOfGuests.yearlyLabels'
						 title="Quantity of guests" label="Guests"
						 class="chart" />
			<ChartBar periods="months" :values="analytics.numberOfGuests.monthly"
						 :labels="['January', 'February', 'March', 'April', 'May', 'June',
									  'July', 'August', 'September', 'October', 'November', 'December']"
						 title="Quantity of guests (all years combined)" label="Guests"
						 class="chart" />
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService, Auth } from "@/services";

import FormLabel from '@/components/FormLabel.vue';

import ChartLine from '@/components/ChartLine.vue';
import ChartBar from '@/components/ChartBar.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AnalyticsView',
	data() {
		return {
			data: [],
			analytics: {
				earningsInEur: {
					monthly: { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
					yearly: { data: [] },
					yearlyLabels: []
				},
				daysOccupied: {
					monthly: { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
					yearly: { data: [] },
					yearlyLabels: []
				},
				numberOfReservations: {
					monthly: { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
					yearly: { data: [] },
					yearlyLabels: []
				},
				numberOfGuests: {
					monthly: { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
					yearly: { data: [] },
					yearlyLabels: []
				},
			},
			accomodations: [],
			selectedAccomodations: [],
			months: {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
						"Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11},
			monthsNumbersToNames: { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
											"07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"},
			auth: Auth.state
		}
	},
	async mounted() {
		// parallel calls
		let responses = await Promise.all([
			await AxiosService.get(`/privateaccomodations?userId=${this.auth.userId}`),
			await AxiosService.get(`/reservations?userId=${this.auth.userId}&relevant=true`)
		]);
		// save retrieved data to view data
		this.accomodations = responses[0].data.map(accomodation => {
			return (({ _id, name }) => ({ _id, name }))(accomodation);
		});
		// console.log("accomodations");
		// console.log(this.accomodations);
		this.data = responses[0].data.map(accomodation => {
			accomodation = (({ _id, name }) => ({ _id, name }))(accomodation);
			accomodation["numberOfReservations"] = {};
			accomodation["numberOfGuests"] = {};
			accomodation["daysOccupied"] = {};
			accomodation["earningsInEur"] = {};
			return accomodation;
		});
		// set data modified for charts to view data
		for (let reservation of responses[1].data) {
			if (reservation.currentState === "CONFIRMED") {
				// get index of private accomodation, year and month
				let privateAccomodation = this.data.find(privateAccomodation =>
					privateAccomodation._id === reservation.period.privateAccomodation.id);
				let indexOfAccomodation = this.data.indexOf(privateAccomodation);
				let year = reservation.period.start.split("-")[0];
				let month = this.monthsNumbersToNames[reservation.period.start.split("-")[1]];
				// mahe sure propertied for values are defined
				if (!this.data[indexOfAccomodation].numberOfReservations[year]
					|| !this.data[indexOfAccomodation].numberOfReservations[year][month]) {
					this.data[indexOfAccomodation].numberOfReservations[year] = {};
					this.data[indexOfAccomodation].numberOfReservations[year][month] = 0;
				}
				if (!this.data[indexOfAccomodation].numberOfGuests[year]
					|| !this.data[indexOfAccomodation].numberOfGuests[year][month]) {
					this.data[indexOfAccomodation].numberOfGuests[year] = {};
					this.data[indexOfAccomodation].numberOfGuests[year][month] = 0;
				}
				if (!this.data[indexOfAccomodation].daysOccupied[year]
					|| !this.data[indexOfAccomodation].daysOccupied[year][month]) {
					this.data[indexOfAccomodation].daysOccupied[year] = {};
					this.data[indexOfAccomodation].daysOccupied[year][month] = 0;
				}
				if (!this.data[indexOfAccomodation].earningsInEur[year]
					|| !this.data[indexOfAccomodation].earningsInEur[year][month]) {
					this.data[indexOfAccomodation].earningsInEur[year] = {};
					this.data[indexOfAccomodation].earningsInEur[year][month] = 0;
				}
				// update data for charts
				this.data[indexOfAccomodation].numberOfReservations[year][month] += 1;
				this.data[indexOfAccomodation].numberOfGuests[year][month] += reservation.guests.length + 1;
				this.data[indexOfAccomodation].daysOccupied[year][month] += this.getNumberOfDays(reservation.period.start, reservation.period.end);
				this.data[indexOfAccomodation].earningsInEur[year][month] += reservation.price.valueInEur;
			}
		};
		// console.log(this.data);
		// select first accomodation and update data
		if (this.data.length > 0) {
			this.selectedAccomodations.push(this.data[0]);
			this.updateData();
		}
	},
	methods: {
		getNumberOfDays(startDate, endDate) {
			startDate = new Date(startDate);
			endDate = new Date(endDate);
			const diffTime = Math.abs(endDate - startDate);
			return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		},
		// updates analytics data based on selected accomodations
		updateData(accomodationId) {
			// check selected accomodations and data
			// console.log(this.selectedAccomodations);
			// if last accomodation was unchecked, recheck it (prevents empty array of selected accomodations and empty data)
			if (this.selectedAccomodations.length === 0) {
				this.selectedAccomodations.push(this.data.find(accomodation => accomodation._id === accomodationId));
			}
			// clear all data from analytics
			for (const dataAspect in this.analytics) {
				this.analytics[dataAspect].monthly = { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
				this.analytics[dataAspect].yearly = { data: [] };
				this.analytics[dataAspect].yearlyLabels = [];
			}
			// update analytics with new data
			this.selectedAccomodations.forEach(accomodation => {
				// iterate through aspects (except Id and name) to update analytics
				for (const dataAspect in accomodation) {
					if (dataAspect !== "_id" && dataAspect !== "name") {
						let aspectData = accomodation[dataAspect];
						// iterate through data to update analytics
						for (const year in aspectData) {
							let yearlyData = aspectData[year];
							let dataByYear = Object.values(yearlyData)
								.reduce((partialSum, value) => partialSum + value, 0);
							// add data of years to analytics (to existing value or new elements)
							if (this.analytics[dataAspect].yearlyLabels.indexOf(year) >= 0) {
								this.analytics[dataAspect].yearly.data[this.analytics[dataAspect].yearlyLabels.indexOf(year)] += dataByYear;
							} else {
								this.analytics[dataAspect].yearlyLabels.push(year);
								this.analytics[dataAspect].yearly.data.push(dataByYear);
							}
							// add data of months to analytics
							for (const month in yearlyData) {
								this.analytics[dataAspect].monthly.data[this.months[month]] += yearlyData[month];
							}
						}
					}
				}
			});
			// sort yearly data and labels
			for (const aspect in this.analytics) {
				// console.log(this.analytics[aspect]);
				let indices = Array.from(this.analytics[aspect].yearly.data.keys())
					.sort((first, second) =>
						this.analytics[aspect].yearlyLabels[first].localeCompare(this.analytics[aspect].yearlyLabels[second])
					);
				this.analytics[aspect].yearlyLabels = indices.map(index => this.analytics[aspect].yearlyLabels[index]);
				this.analytics[aspect].yearly.data = indices.map(index => this.analytics[aspect].yearly.data[index]);
			}
			// print for check
			// console.log(this.analytics);
		}
	},
	components: {
		FormLabel,
		ChartLine,
		ChartBar,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.chart-flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.chart {
		width: 40%;
	}
	.accomodation-grid {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-around;
	}
	.number-flex {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
	}
	.accomodation-number {
		font-size: 28px;
		font-weight: bold;
		background-color: #A5D4FF !important;
	}
	.accomodation-number:before {
		background: none;
	}
	@media (max-width:600px) {
		.accomodation-grid {
			grid-template-columns: auto;
			justify-content: center;
		}
	}
</style>
