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
				<ButtonSave @click.native="savePeriod()" />
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import { AxiosService } from "@/services";

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
				privateAccomodation: null
			},
			privateAccomodations: [],
			dates: [],
		}
	},
	async mounted() {
		let response = await AxiosService.get("/privateaccomodations");
		let accomodationsWithLocations = response.data;
		this.privateAccomodations = accomodationsWithLocations.map(accomodation => {
			accomodation.location = accomodation.location._id;
			return accomodation;
		});
		console.log(this.privateAccomodations);
	},
	methods: {
		async savePeriod() {
			// update start and end dates
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.period.start = this.dates[0] + " 15:00";
			this.period.end = this.dates[1] + " 10:00";
			// update private accomodation
			this.period.privateAccomodation = {
				_id: this.period.privateAccomodation._id,
				name: this.period.privateAccomodation.name
			}
			// print for check
			console.log(this.period);

			// check if period data is complete
			const periodIsFull = Object.values(this.period).every(x => x !== null && x !== undefined && x !== '');
			if (periodIsFull) {
				console.log("full");
				await AxiosService.post("/periods", this.period);
			} else console.log("An error has occured. Please try again.");
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
