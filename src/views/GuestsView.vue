<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Guests</h1>
		<!-- List of guests -->
		<GuestItem v-for="guest in guests" v-bind:key="guest.ObjectId" :guest="guest" />
		<!-- Add new guest button -->
		<div class="text-center">
			<AddNewButton/>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import GuestItem from '@/components/GuestItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';


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
					start: "2022-07-01",
					end: "2022-07-10",
					privateAccomodation: {
						ObjectId: 111,
						name: "Apartment Nature"
					}
				},
				guestState: "CONFIRMED GUEST"
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
					start: "2022-08-01",
					end: "2022-08-10",
					privateAccomodation: {
						ObjectId: 111,
						name: "Apartment Nature"
					}
				},
				guestState: "POSSIBLE GUEST"
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
					start: "2022-07-10",
					end: "2022-07-31",
					privateAccomodation: {
						ObjectId: 111,
						name: "Apartment Nature"
					}
				},
				guestState: "POTENTIAL GUEST"
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
					start: "2022-07-10",
					end: "2022-07-31",
					privateAccomodation: {
						ObjectId: 111,
						name: "Apartment Nature"
					}
				},
				guestState: "CANCELLED GUEST"
			}
		];
		this.guests = guestsFromBackend;
		console.log(this.guests);
	},
	components: {
		GuestItem,
		AddNewButton,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
