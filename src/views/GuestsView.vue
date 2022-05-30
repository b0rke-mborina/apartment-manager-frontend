<template>
	<v-container absolute fluid class="main-content">
		<span>GUESTS: OK</span>
		<GuestItem v-for="guest in guests" v-bind:key="guest.ObjectId" :guest="guest" />
	</v-container>
</template>

<script>
import GuestItem from '@/components/GuestItem.vue'

export default {
	name: 'GuestsView',
	data() {
		return {
			guests: []
		}
	},
	mounted() {
		let guestsFromBackend = [
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
		];
		this.guests = guestsFromBackend;
		console.log(this.guests);
	},
	components: {
		GuestItem
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
