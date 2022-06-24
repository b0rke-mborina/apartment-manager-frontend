<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Edit a period</h1>
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
				<v-select v-model="period.privateAccomodationObjectId"
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
			<ButtonDialogDelete itemType="period" service="period" :_id="period._id" />
			<!-- <router-link :to="{ name: 'calendar' }" class="router-link"> -->
				<ButtonSave @click.native="updatePeriod()" />
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
		}
	},
	async mounted() {
		// parallel calls
		let responses = await Promise.all([
			await AxiosService.get("/privateaccomodations"),
			await AxiosService.get(`/period/${this.$route.params.id}`)
		]);
		// set retrieved accomodations data to view data
		this.privateAccomodations = responses[0].data;
		console.log(this.privateAccomodations);
		// set retrieved period data to view data, set dates to period select
		this.period = responses[1].data;
		console.log(this.period);
		this.dates = [this.period.start, this.period.end];
	},
	methods: {
		// modifies period data, checks its completeness and sends it to backend for updating
		updatePeriod() {
			this.dates = this.dates.sort();
			console.log(this.dates);
			this.period.start = this.dates[0];
			this.period.end = this.dates[1];
			console.log(this.period);
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
