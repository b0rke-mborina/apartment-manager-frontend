<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Reservation detail: OK</h1>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import ReservationItem from '@/components/ReservationItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

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
					ObjectId: 100,
					start: "2022-05-26",
					end: "2022-05-30"
				},
				madeByGuest: {
					ObjectId: 100,
					firstName: "Mark",
					lastName: "Williams",
					email: "mwilliams@gmail.com",
					phoneNumber: "+000 000 0000",
					country: "United Kingdom",
					city: "London"
				},
				guests: [
					{
						ObjectId: 100,
						firstName: "Mark",
						lastName: "Williams",
						email: "mwilliams@gmail.com",
						phoneNumber: "+000 000 0000",
						country: "United Kingdom",
						city: "London"
					},
					{
						ObjectId: 102,
						firstName: "Marie",
						lastName: "Smith",
						email: "msmith@gmail.com",
						phoneNumber: "+222 222 2222",
						country: "United States",
						city: "Los Angeles"
					},
					{
						ObjectId: 103,
						firstName: "Mario",
						lastName: "Vercetti",
						email: "mvercetti@gmail.com",
						phoneNumber: "+333 333 3333",
						country: "Italy",
						city: "Milano"
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
					ObjectId: 101,
					start: "2022-06-28",
					end: "2022-07-08"
				},
				madeByGuest: {
					ObjectId: 103,
					firstName: "Mario",
					lastName: "Vercetti",
					email: "mvercetti@gmail.com",
					phoneNumber: "+333 333 3333",
					country: "Italy",
					city: "Milano"
				},
				guests: [
					{
						ObjectId: 103,
						firstName: "Mario",
						lastName: "Vercetti",
						email: "mvercetti@gmail.com",
						phoneNumber: "+333 333 3333",
						country: "Italy",
						city: "Milano"
					},
					{
						ObjectId: 100,
						firstName: "Mark",
						lastName: "Williams",
						email: "mwilliams@gmail.com",
						phoneNumber: "+000 000 0000",
						country: "United Kingdom",
						city: "London"
					},
					{
						ObjectId: 101,
						firstName: "Hans",
						lastName: "Muller",
						email: "hmuller@gmail.com",
						phoneNumber: "+111 111 1111",
						country: "Germany",
						city: "Munchen"
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
		AddNewButton,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
