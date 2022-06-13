<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title (name of private accomodation) -->
		<h1 class="mt-5 text-center">Edit a private accomodation</h1>
		<!-- Current state of private accomodation -->
		<div class="text-center mb-9">
			CURRENTLY {{ accomodation.currentState }}
			<v-icon v-if="accomodation.currentState === 'AVAILABLE'"
					icon color="#FFCC00" class="pr-2">
				mdi-circle
			</v-icon>
			<v-icon v-else-if="accomodation.currentState === 'OCCUPIED'"
					icon color="#55FF66" class="pr-2">
				mdi-circle
			</v-icon>
			<v-icon v-else-if="accomodation.currentState === 'PENDING'"
					icon color="#6666ff" class="pr-2">
				mdi-circle
			</v-icon>
		</div>
		<!-- Main information grid -->
		<div class="details-grid">
			<h3 class="mt-4 mb-2">Basic information</h3>
			<!-- Accomodation name -->
			<div class="details-grid-item">
				<FormLabel text="Name of private accomodation" class="details-label mr-4" />
				<v-text-field v-model="accomodation.name" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Accomodation name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Number of stars (category) and maximum number of guests -->
			<div class="details-grid-item">
				<!-- Number of stars (category) -->
				<div class="details-grid-subitem">
					<FormLabel text="Number of stars (category)" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.categoryStarNumber" solo rounded
									single-line type="number"
									min="3" max="5" step="1"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- Maximum number of guests -->
				<div class="details-grid-subitem">
					<FormLabel text="Maximum number of guests" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.maxGuestNumber" solo rounded
									single-line type="number"
									min="1" max="99" step="1"
									background-color="#A5D4FF" class="input-number ml-auto">
					</v-text-field>
				</div>
			</div>
			<h3 class="mt-9 mb-2">Address information</h3>
			<!-- Street name - address info -->
			<div v-if="accomodation.location" class="details-grid-item">
				<FormLabel text="Street (address)" class="details-label mr-4" />
				<v-text-field v-model="accomodation.location.street" solo rounded
								clearable clear-icon="mdi-close-circle"
								label="Name of street"
								background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- House and entrance numbers - address info -->
			<div v-if="accomodation.location" class="details-grid-item">
				<!-- House number - address info -->
				<div class="details-grid-subitem">
					<FormLabel text="House number (address)" class="details-label mr-4" />
					<v-text-field v-model="accomodation.location.houseNumber" solo rounded
									label="Number of the house"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- Entrance number - address info -->
				<div class="details-grid-subitem">
					<FormLabel text="Entrance number (address)" class="details-label mr-4" />
					<v-text-field v-model="accomodation.location.entranceNumber" solo rounded
									label="Entrance label"
									background-color="#A5D4FF" class="input-number ml-auto">
					</v-text-field>
				</div>
			</div>
			<div v-if="accomodation.location" class="details-grid-item">
				<!-- Postal number - address info -->
				<div v-if="accomodation.location" class="details-grid-subitem">
					<FormLabel text="Postal number (address)" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.location.postalNumber" solo rounded
									single-line type="number"
									label="Post office number"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- City - address info -->
				<div v-if="accomodation.location" class="details-grid-subitem input-city">
					<FormLabel text="City (address)" class="details-label mr-4" />
					<v-text-field v-model="accomodation.location.city" solo rounded
									clearable clear-icon="mdi-close-circle"
									label="Name of city"
									background-color="#A5D4FF" class="ml-auto">
					</v-text-field>
				</div>
			</div>
			<h3 class="mt-9 mb-2">Other information</h3>
			<!-- Lowest and highest floors info -->
			<div class="details-grid-item">
				<div class="details-grid-subitem">
					<FormLabel text="From floor (lowest level)" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.lowestFloor" solo rounded
									single-line type="number"
									label="Level number (0 is ground floor)"
									background-color="#A5D4FF" class="input-number">
					</v-text-field>
				</div>
				<!-- Highest floor info -->
				<div class="details-grid-subitem">
					<FormLabel text="To floor (highest level)" class="details-label mr-4" />
					<v-text-field v-model.number="accomodation.numberofFloors" solo rounded
									single-line type="number"
									label="Level number (0 is ground floor)"
									background-color="#A5D4FF" class="input-number ml-auto">
					</v-text-field>
				</div>
			</div>
			<!-- Yard info - address info -->
			<v-checkbox v-model="accomodation.hasYard" label="Has a yard" class="mt-0 pt-0"></v-checkbox>
		</div>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'accomodations'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete/>
			<router-link :to="{ name: 'accomodation-detail', params: { id: accomodation.ObjectId }}" class="router-link">
				<ButtonSave/> <!-- @click.native="printAccomodation()" -->
			</router-link>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationEditView',
	data() {
		return {
			accomodation: {}
		}
	},
	mounted() {
		let accomodationFromBackend = {
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
		};
		this.accomodation = accomodationFromBackend;
		console.log(this.accomodation);
	},
	methods: {
		printAccomodation() {
			console.log(this.accomodation);
		}
	},
	components: {
		FormLabel,
		FormTextField,
		ButtonBack,
		ButtonDialogDelete,
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
		gap: 32px;
	}
	.details-grid-subitem {
		display: grid;
		grid-template-columns: auto auto;
	}
	.input-number {
		width: 150px;
	}
	.input-city div:nth-child(2) {
		width: 100%;
	}
	@media (max-width:750px) {
		.details-grid-item {
			grid-template-columns: auto;
			gap: 4px;
		}
		.details-grid-subitem {
			grid-template-columns: auto auto;
		}
		.details-grid-subitem div:nth-child(1) {
			text-align: left;
		}
		.details-grid-subitem div:nth-child(2) {
			margin-left: auto;
			margin-right: 0px;
		}
		.input-city {
			grid-template-columns: 1fr 1fr;
		}
		.input-city div:nth-child(2) {
			width: 100%;
		}
		.details-label {
			text-align: center;
			margin-bottom: 8px;
		}
	}
	@media (max-width:425px) {
		.input-city {
			grid-template-columns: auto;
			text-align: center;
		}
		.details-grid-subitem div:nth-child(1) {
			text-align: center;
		}
		.details-grid-subitem div:nth-child(2) {
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
