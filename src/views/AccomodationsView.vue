<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 mb-4 text-center">Accomodations</h1>
		<!-- List of accomodations -->
		<div class="flex-div">
			<!-- Empty list sign -->
			<NoItemsDiv items="accomodations" v-if="accomodations.length === 0 && !loading" />
			<!-- List of accomodations -->
			<AccomodationItem v-for="accomodation in accomodations" v-bind:key="accomodation._id" :accomodation="accomodation" />
			<!-- Loading circular progress bar -->
			<v-progress-circular v-if="loading" indeterminate color="#A5D4FF"></v-progress-circular>
			<!-- Snackbar for showing errors -->
			<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" color="#FF6F6F" width="400">
				<span class="snackbar">{{ errorMsg }}</span>
				<template v-slot:action="{ attrs }" class="snackbar-content">
					<v-btn text v-bind="attrs" @click="errorMsg = null, snackbar = false" color="#000000">
						CLOSE
					</v-btn>
				</template>
			</v-snackbar>
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
import { AxiosService } from "@/services";

import AccomodationItem from '@/components/AccomodationItem.vue';

import AddNewButton from '@/components/ButtonAddNew.vue';

import NoItemsDiv from '@/components/NoItemsDiv.vue';
import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationsView',
	data() {
		return {
			accomodations: [],
			loading: false,
			errorMsg: null,
			snackbar: false
		}
	},
	async mounted() {
		// get all accomodations data from backend and set it to view data
		this.loading = true;
		try {
			let response = await AxiosService.get("/privateaccomodations");
			this.accomodations = response.data;
		} catch (error) {
			this.errorMsg = "Error has occured. Please try again.";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loading = false;
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
