<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Analytics</h1>
		<div class="accomodation-grid text-center mt-9">
			<v-card color="#E3EAEF" elevation="0" rounded="xl" class="number-flex py-3 px-6 mb-4">
				<FormLabel text="You have" />
				<div class="text-center">
					<v-btn v-if="analytics.accomodations"
						 elevation="2" x-large text fab
						 class="accomodation-number my-3">
					<span>{{ analytics.accomodations.length }}</span>
				</v-btn>
				</div>
				<FormLabel text="private accomodations" />
			</v-card>
			<v-card v-if="analytics.accomodations && analytics.accomodations.length > 0"
					  elevation="0" rounded="xl" color="#E3EAEF" class="py-3 px-6 mb-4">
				<FormLabel text="Show data for:" class="mb-3" />
				<v-checkbox v-for="accomodation in analytics.accomodations" v-bind:key="accomodation.ObjectId"
								v-model="accomodationsSelected" :label="accomodation.name" :value="accomodation.name"
								class="mt-1">
				</v-checkbox>
			</v-card>
		</div>
		<!-- Earnings analytics -->
		<div></div>
		<!-- Periods (occupied, available) analytics -->
		<div></div>
		<!-- Reservations analytics -->
		<div></div>
		<!-- Guests analytics -->
		<div></div>
		<EmptyDiv/>
	</v-container>
</template>

<script>
import EmptyDiv from '@/components/EmptyDiv.vue';
import FormLabel from '@/components/FormLabel.vue';

export default {
	name: 'AnalyticsView',
	data() {
		return {
			analytics: {},
			accomodationsSelected: []
		}
	},
	mounted() {
		let dataFromBackend = {
			ObjectId: 1111,
			accomodations: [
				{
					ObjectId: 111,
					name: "Apartment Nature",
					numberOfReservations: {
						year2020: 5,
						year2021: 8,
						year2022: 7,
					},
					numberOfGuests: {
						year2020: 15,
						year2021: 38,
						year2022: 27,
					},
					earningsInEur: {
						year2020: {
							monthJune: 1500,
							monthJuly: 2500,
							monthAugust: 2000
						},
						year2021: {
							monthJune: 1000,
							monthJuly: 1200,
							monthAugust: 1250,
							monthSeptember: 120
						},
						year2022: {
							monthMay: 500,
							monthJune: 1000,
							monthJuly: 1000,
							monthAugust: 1400
						}
					}
				},
				{
					ObjectId: 112,
					name: "Apartment Marie",
					numberOfReservations: {
						year2020: 3,
						year2021: 3,
						year2022: 4,
					},
					numberOfGuests: {
						year2020: 9,
						year2021: 8,
						year2022: 7,
					},
					earningsInEur: {
						year2020: {
							monthJune: 150,
							monthJuly: 500,
							monthAugust: 200
						},
						year2021: {
							monthJune: 100,
							monthJuly: 200,
							monthAugust: 250
						},
						year2022: {
							monthMay: 50,
							monthJune: 125,
							monthJuly: 100,
							monthAugust: 400
						}
					}
				},
				{
					ObjectId: 113,
					name: "Apartment x",
					numberOfReservations: {},
					numberOfGuests: {},
					earningsInEur: {}
				}
			],
		};
		this.analytics = dataFromBackend;
		console.log(this.analytics);
	},
	components: {
		EmptyDiv,
FormLabel
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
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
