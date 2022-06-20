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
				<v-select v-model="period.privateAccomodation"
								:items="privateAccomodations"
								item-value="ObjectId"
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
				<ButtonSave @click.native="updatePeriod()" />
			<!-- </router-link> -->
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'PeriodAddNewView',
	data() {
		return {
			period: {
				ObjectId: null,
				start: null,
				end: null,
				name: null,
				privateAccomodation: null
			},
			privateAccomodations: [],
			dates: [],
		}
	},
	mounted() {
		let privateAccomodationsFromBackend = [
			{
				ObjectId: 111,
				name: "Apartment Nature"
			},
			{
				ObjectId: 112,
				name: "Apartment Marie"
			},
			{
				ObjectId: 113,
				name: "Apartment x"
			}
		];
		this.privateAccomodations = privateAccomodationsFromBackend;
	},
	methods: {
		updatePeriod() {
			// update start and end dates
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.period.start = this.dates[0];
			this.period.end = this.dates[1];
			// update private accomodation
			this.period.privateAccomodation = this.privateAccomodations.find(accomodation =>
				accomodation.ObjectId === this.period.privateAccomodation);
			// print for check
			console.log(this.period);
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
