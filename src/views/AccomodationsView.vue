<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Accomodations</h1>
		<!-- List of accomodations -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="accomodations" v-if="accomodations.length === 0" />
			<!-- List of accomodations -->
			<AccomodationItem v-for="accomodation in accomodations" v-bind:key="accomodation.ObjectId" :accomodation="accomodation" />
		</div>
		<!-- Add new accomodation button -->
		<div class="text-center">
			<router-link :to="{ name: 'accomodation-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import AccomodationItem from '@/components/AccomodationItem.vue';
import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
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
				currentState: "PENDING",
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
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
