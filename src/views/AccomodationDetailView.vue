<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Accomodation detail: OK</h1>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import AccomodationItem from '@/components/AccomodationItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationsView',
	data() {
		return {
			accomodations: []
		}
	},
	mounted() {
		let accomodationsFromBackend = [
			{
				ObjectId: 111,
				name: "Apartment Nature",
				categoryStarNumber: 3,
				maxGuestNumber: 6,
				currentState: "AVAILABLE",
				location: {
					street: "Labinska",
					houseNumber: "2",
					entranceNumber: "1a",
					postalNumber: 52100,
					city: "Pula",
					country: "Croatia"
				},
				hasYard: true,
				lowestFloor: 0,
				numberofFloors: 1
			},
			{
				ObjectId: 211,
				name: "Apartment Marie",
				categoryStarNumber: 4,
				maxGuestNumber: 4,
				currentState: "OCCUPIED",
				location: {
					street: "Valturska",
					houseNumber: "11",
					entranceNumber: "1a",
					postalNumber: 52210,
					city: "Rovinj",
					country: "Croatia"
				},
				hasYard: false,
				lowestFloor: 1,
				numberofFloors: 2
			},
			{
				ObjectId: 311,
				name: "Apartment x",
				categoryStarNumber: 5,
				maxGuestNumber: 5,
				currentState: "NOT READY",
				location: {
					street: "Valturska",
					houseNumber: "1d",
					entranceNumber: "l",
					postalNumber: 52210,
					city: "Rovinj",
					country: "Croatia"
				},
				hasYard: false,
				lowestFloor: 2,
				numberofFloors: 1
			}
		];
		this.accomodations = accomodationsFromBackend;
		console.log(this.accomodations);
	},
	components: {
		AccomodationItem,
		AddNewButton,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
