<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Guests</h1>
		<!-- Empty list sign -->
		<NoItemsDiv items="guests" v-if="guests.length === 0 && !loading" />
		<!-- List of guests -->
		<GuestItem v-for="guest in guests" v-bind:key="guest._id" :guest="guest" />
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loading" indeterminate color="#A5D4FF"></v-progress-circular>
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
		<!-- Add new guest button -->
		<div class="text-center">
			<router-link :to="{ name: 'guest-creation' }" class="router-link">
				<AddNewButton/>
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService, Auth } from "@/services";

import GuestItem from '@/components/GuestItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';


export default {
	name: 'GuestsView',
	data() {
		return {
			guests: [],
			auth: Auth.state,
			loading: false,
			errorMsg: null,
			snackbar: false
		}
	},
	async mounted() {
		// get all guest data from backend and set it to view data
		this.loading = true;
		try {
			let response = await AxiosService.get(`/guests?userId=${this.auth.userId}`);
			this.guests = response.data;
		} catch (error) {
			this.errorMsg = "Error has occured. Please try again.";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loading = false;
		// console.log(this.guests);
	},
	components: {
		GuestItem,
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
