<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Reservations</h1>
		<!-- Empty list sign -->
		<NoItemsDiv items="reservations" v-if="reservations.length === 0 && !loading" />
		<!-- List of reservations -->
		<ReservationItem v-for="reservation in reservations" v-bind:key="reservation._id" :reservation="reservation" />
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loading" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Add new reservation button -->
		<div class="text-center">
			<router-link :to="{ name: 'reservation-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Snackbar for showing errors -->
		<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" color="#FF6F6F" width="400">
			<span class="snackbar">{{ errorMsg }}</span>
			<template v-slot:action="{ attrs }" class="snackbar-content">
				<v-btn text v-bind="attrs" @click="errorMsg = null, snackbar = false" color="#000000">
					CLOSE
				</v-btn>
			</template>
		</v-snackbar>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService, Auth } from "@/services";

import ReservationItem from '@/components/ReservationItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'ReservationsView',
	data() {
		return {
			reservations: [],
			auth: Auth.state,
			loading: false,
			errorMsg: null,
			snackbar: false
		}
	},
	async mounted() {
		// get all reservations data set it to view data
		this.loading = true;
		try {
			let response = await AxiosService.get(`/reservations?userId=${this.auth.userId}`);
			this.reservations = response.data;
		} catch (error) {
			this.errorMsg = "Error has occured. Please try again.";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loading = false;
		// console.log(this.reservations);
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
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
	}
</style>
