<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Edit a period</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Main information grid -->
		<div v-if="period.privateAccomodation && !loadingData" class="details-grid">
			<!-- Period name -->
			<div class="mt-9 text-center">
				<FormLabel text="Name" class="details-label mb-3" />
				<v-text-field v-model="period.name" v-if="!loadingData"
									solo rounded
									clearable clear-icon="mdi-close-circle"
									label="Period name..."
									background-color="#A5D4FF"
									class="heading-text-field mx-auto">
				</v-text-field>
			</div>
			<!-- Private accomodation to which the period belongs to -->
			<div class="mt-5 text-center justify-center">
				<FormLabel text="Belonging private accomodation:" class="details-label mb-3" />
				<v-select v-model="period.privateAccomodation.id"
								:items="privateAccomodations"
								item-value="_id"
								item-text="name"
								solo rounded
								background-color="#A5D4FF" class="importance-select mx-auto">
					<template v-slot:append>
						<v-icon color="#000000">mdi-menu-down</v-icon>
					</template>
				</v-select>
			</div>
			<div class="my-5 text-center">
				<FormLabel text="Period dates (start and end):" class="details-label mb-3" />
				<v-date-picker v-model="dates" range></v-date-picker>
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'calendar' }" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete itemType="period" service="period" :_id="period._id" routeName="calendar" />
			<!-- <router-link :to="{ name: 'calendar' }" class="router-link"> -->
				<ButtonSave @click.native="updatePeriod()" :loading="loading" />
			<!-- </router-link> -->
		</div>
		<!-- Snackbar for showing successes and errors -->
		<v-snackbar :value="snackbar" :timeout="-1" rounded="xl" :color="snackbarColor" width="400">
			<span class="snackbar">{{ snackbarMsg }}</span>
			<template v-slot:action="{ attrs }" class="snackbar-content">
				<v-btn text v-bind="attrs" @click="snackbarMsg = null, snackbar = false" color="#000000">
					CLOSE
				</v-btn>
			</template>
		</v-snackbar>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'PeriodDetailEditView',
	data() {
		return {
			period: {},
			privateAccomodations: [],
			dates: [],
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		// get all data and set it to view data		
		this.loadingData = true;
		try {
			// parallel calls
			let responses = await Promise.all([
				await AxiosService.get("/privateaccomodations"),
				await AxiosService.get(`/period/${this.$route.params.id}`)
			]);
			// set retrieved accomodations data to view data
			this.privateAccomodations = responses[0].data;
			// set retrieved period data to view data, set dates to period select
			this.period = responses[1].data;
			this.dates = [this.period.start, this.period.end];
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		console.log(this.privateAccomodations);
		console.log(this.period);
	},
	methods: {
		// modifies period data, checks its completeness and sends it to backend for updating
		async updatePeriod() {
			// modify period data
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.period.start = this.dates[0];
			this.period.end = this.dates[1];
			this.period.privateAccomodation.name = this.privateAccomodations
				.find(accomodation => accomodation._id === this.period.privateAccomodation.id).name;
			console.log(this.period);
			// check if period data is complete and send it to backend for saving
			const periodIsFull = Object.values(this.period).every(x => x !== null && x !== undefined && x !== '');
			const accomodationIsFull = Object.values(this.period.privateAccomodation)
				.every(x => x !== null && x !== undefined && x !== '');
			if (periodIsFull && accomodationIsFull) {
				console.log("full");
				// send data to backend for saving
				this.loading = true;
				try {
					await AxiosService.patch(`period/${this.period._id}`, this.period);
					this.snackbarMsg = "Note updated successfully.";
					this.snackbarColor = "#55FF66";
					this.snackbar = true;
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			} else {
				this.snackbarMsg = "All fields are required. Fill all fields and try again.";
				this.snackbarColor = "#FF6F6F";
				this.snackbar = true;
			}
		}
	},
	components: {
		FormLabel,
		ButtonCancel,
		ButtonDialogDelete,
		ButtonSave,
		EmptyDiv
	}
}
</script>

<style scoped>
	@import '@/assets/css/views-style.css';
	.details-grid {
		display: grid;
		grid-template-columns: auto;
	}
	.details-grid-item {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.heading-text-field {
		width: 50%;
	}
	.importance-select {
		width: 40%;
	}
	.v-input__slot, textarea {
		padding-top: 10px !important;
		padding-bottom: 10px !important;
	}
	.heading-text-field .v-icon {
		color: #000000 !important;
	}
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
	}
	@media (max-width:1200px) {
		.heading-text-field {
			width: 70%;
		}
	}
	@media (max-width:800px) {
		.heading-text-field {
			width: 100%;
		}
		.importance-select {
			width: 75%;
		}
	}
	@media (max-width:500px) {
		.importance-select {
			width: 100%;
		}
	}
</style>
