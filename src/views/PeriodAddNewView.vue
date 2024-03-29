<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Create a new period</h1>
		<!-- Main information grid -->
		<div class="details-grid">
			<!-- Period name -->
			<div class="mt-9 text-center">
				<FormLabel text="Name" class="details-label mb-3" />
				<v-text-field v-model="period.name" solo rounded
									clearable clear-icon="mdi-close-circle"
									label="Period name..."
									background-color="#A5D4FF"
									class="heading-text-field mx-auto">
				</v-text-field>
			</div>
			<!-- Private accomodation to which the period belongs to -->
			<div class="mt-5 text-center justify-center">
				<FormLabel text="Belonging private accomodation:" class="details-label mb-3" />
				<v-select v-model="period.privateAccomodation" return-object
								:items="privateAccomodations"
								item-value="_id"
								item-text="name"
								label="Select an accomodation"
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
			<!-- <router-link :to="{ name: 'calendar' }" class="router-link"> -->
				<ButtonSave @click.native="savePeriod()" :loading="loading" />
			<!-- </router-link> -->
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

import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'PeriodAddNewView',
	data() {
		return {
			period: {
				start: null,
				end: null,
				name: null,
				privateAccomodation: {
					id: null,
					name: null
				}
			},
			privateAccomodations: [],
			dates: [],
			auth: Auth.state,
			loading: false,
			errorMsg: null,
			snackbar: false
		}
	},
	async mounted() {
		// get all accomodations data, modify it and set it to view data		
		this.loading = true;
		try {
			let response = await AxiosService.get(`/privateaccomodations?userId=${this.auth.userId}`);
			this.privateAccomodations = response.data;
		} catch (error) {
			this.errorMsg = "Error has occured. Please try again.";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loading = false;
		// console.log(this.privateAccomodations);
	},
	methods: {
		// modifies poriod data, checks its completeness and sends it to backend for saving
		async savePeriod() {
			// update start and end dates
			this.dates = this.dates.sort();
			// console.log(this.dates);
			this.period.start = this.dates[0];
			this.period.end = this.dates[1];
			// console.log(this.period);
			// update private accomodation
			this.period.privateAccomodation = {
				id: this.period.privateAccomodation._id,
				name: this.period.privateAccomodation.name
			}
			// print for check
			// console.log(this.period);
			// check if period data is complete and send it to backend for saving
			const periodIsFull = Object.values(this.period).every(x => x !== null && x !== undefined && x !== '');
			const accomodationIsFull = Object.values(this.period.privateAccomodation)
				.every(x => x !== null && x !== undefined && x !== '');
			if (periodIsFull && accomodationIsFull) {
				// console.log("full");
				// send data to backend for saving
				this.loading = true;
				try {
					this.period["user"] = this.auth.userId;
					await AxiosService.post("/periods", this.period);
					this.$router.push({ name: 'calendar' });
				} catch (error) {
					this.errorMsg = "Error has occured. Please try again.";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			} else {
				this.errorMsg = "All fields are required. Fill all fields and try again.";
				this.snackbar = true;
			}
		}
	},
	components: {
		FormLabel,
		ButtonCancel,
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
