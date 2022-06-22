<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Reservations</h1>
		<!-- Empty list sign -->
		<NoItemsDiv items="reservations" v-if="reservations.length === 0" />
		<!-- List of reservations -->
		<ReservationItem v-for="reservation in reservations" v-bind:key="reservation._id" :reservation="reservation" />
		<!-- Add new reservation button -->
		<div class="text-center">
			<router-link :to="{ name: 'reservation-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import ReservationItem from '@/components/ReservationItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationsView',
	data() {
		return {
			reservations: []
		}
	},
	async mounted() {
		let response = await AxiosService.get("/reservations");
		this.reservations = response.data;
		console.log(this.reservations);
	},
	components: {
		ReservationItem,
		AddNewButton,
		NoItemsDiv,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
</style>
