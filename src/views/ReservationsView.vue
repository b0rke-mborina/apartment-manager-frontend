<template>
	<v-container absolute fluid class="main-content">
		<!-- <span>RESERVATIONS: OK</span> -->
		<h1 class="mt-5 mb-4 text-center">Reservations</h1>
		<ReservationItem v-for="reservation in reservations" v-bind:key="reservation.ObjectId" :reservation="reservation" />
		<AddNewButton/>
	</v-container>
</template>

<script>
import ReservationItem from '@/components/ReservationItem.vue';
import AddNewButton from '@/components/AddNewButton.vue';

export default {
	name: 'ReservationsView',
	data() {
		return {
			reservations: []
		}
	},
	mounted() {
		let reservationsFromBackend = [
			{
				ObjectId: 100,
				period: {
					ObjecId: 100,
					startDate: "2022-05-26",
					endDate: "2022-05-30"
				},
				madeByGuest: {
					ObjecId: 100,
					firstName: "Mark",
					lastName: "Williams",
					email: "mwilliams@gmail.com",
					phoneNumber: "+000 000 0000",
					country: "United Kingdom",
					city: "London",
					period: {
						startDate: "2022-07-01",
						endDate: "2022-07-10"
					}
				},
				guests: [
					{
						ObjecId: 100,
						firstName: "Mark",
						lastName: "Williams",
						email: "mwilliams@gmail.com",
						phoneNumber: "+000 000 0000",
						country: "United Kingdom",
						city: "London",
						period: {
							startDate: "2022-07-01",
							endDate: "2022-07-10"
						}
					},
					{
						ObjecId: 102,
						firstName: "Marie",
						lastName: "Smith",
						email: "msmith@gmail.com",
						phoneNumber: "+222 222 2222",
						country: "United States",
						city: "Los Angeles",
						period: {
							startDate: "2022-07-10",
							endDate: "2022-07-31"
						}
					},
					{
						ObjecId: 103,
						firstName: "Mario",
						lastName: "Vercetti",
						email: "mvercetti@gmail.com",
						phoneNumber: "+333 333 3333",
						country: "Italy",
						city: "Milano",
						period: {
							startDate: "2022-07-10",
							endDate: "2022-07-31"
						}
					}
				],
				currentState: "CONFIRMED",
				price: {
					value: 1000,
					currency: "EUR",
					valueInEur: 1000
				}
			},
			{
				ObjectId: 101,
				period: {
					ObjecId: 101,
					startDate: "2022-06-28",
					endDate: "2022-07-08"
				},
				madeByGuest: {
					ObjecId: 103,
					firstName: "Mario",
					lastName: "Vercetti",
					email: "mvercetti@gmail.com",
					phoneNumber: "+333 333 3333",
					country: "Italy",
					city: "Milano",
					period: {
						startDate: "2022-07-10",
						endDate: "2022-07-31"
					}
				},
				guests: [
					{
						ObjecId: 103,
						firstName: "Mario",
						lastName: "Vercetti",
						email: "mvercetti@gmail.com",
						phoneNumber: "+333 333 3333",
						country: "Italy",
						city: "Milano",
						period: {
							startDate: "2022-07-10",
							endDate: "2022-07-31"
						}
					},
					{
						ObjecId: 100,
						firstName: "Mark",
						lastName: "Williams",
						email: "mwilliams@gmail.com",
						phoneNumber: "+000 000 0000",
						country: "United Kingdom",
						city: "London",
						period: {
							startDate: "2022-07-01",
							endDate: "2022-07-10"
						}
					},
					{
						ObjecId: 101,
						firstName: "Hans",
						lastName: "Muller",
						email: "hmuller@gmail.com",
						phoneNumber: "+111 111 1111",
						country: "Germany",
						city: "Munchen",
						period: {
							startDate: "2022-08-01",
							endDate: "2022-08-10"
						}
					}
				],
				currentState: "INQUIRY",
				price: {
					value: 3500,
					currency: "HRK",
					valueInEur: 1000
				}
			}
		];
		this.reservations = reservationsFromBackend;
		console.log(this.reservations);
	},
	components: {
		ReservationItem,
		AddNewButton
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
