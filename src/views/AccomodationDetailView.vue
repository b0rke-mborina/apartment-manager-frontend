<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title (name of private accomodation) -->
		<h1 class="mt-5 text-center">{{ accomodation.name }}</h1>
		<!-- Stars based on number of stars / category -->
		<div class="text-center mb-2">
			<span v-for="i in accomodation.categoryStarNumber" v-bind:key="i" class="mt-5 mb-4 text-center">
				<v-icon icon color="#FFCC00">mdi-star</v-icon>
			</span>
		</div>
		<!-- Current state of private accomodation -->
		<div class="text-center mb-5">
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
			<!-- Maximum number of guests -->
			<div class="details-grid-item">
				<FormLabel text="Maximum number of guests" class="details-label" />
				<FormTextField :text="String(accomodation.maxGuestNumber)" />
			</div>
			<!-- Location info -->
			<div class="details-grid-item">
				<FormLabel text="Location" class="details-label" />
				<FormTextField v-if="accomodation.location"
									:text="accomodation.location.street
											+ ' ' + accomodation.location.houseNumber
											+ ',\n ' + accomodation.location.postalNumber
											+ ' ' + accomodation.location.city
											+ ', ' + accomodation.location.country" />
			</div>
			<!-- Entrance number info -->
			<div class="details-grid-item">
				<FormLabel text="Entrance number" class="details-label" />
				<FormTextField v-if="accomodation.location" :text="accomodation.location.entranceNumber" />
			</div>
			<!-- Floors info -->
			<div class="details-grid-item">
				<FormLabel text="Floors" class="details-label" />
				<FormTextField v-if="accomodation.lowestFloor === 0 && accomodation.numberofFloors === 1"
									text="Ground floor" />
				<FormTextField v-else-if="accomodation.lowestFloor !== 0 && accomodation.numberofFloors === 1"
									:text="accomodation.lowestFloor + '. floor'" />
				<FormTextField v-else :text="'Floors ' + accomodation.lowestFloor + ' to ' + (accomodation.numberofFloors - 1)" />
			</div>
			<!-- Yard info -->
			<div class="details-grid-item">
				<FormLabel text="Has a yard?" class="details-label" />
				<FormTextField v-if="accomodation.hasYard" text="YES" />
				<FormTextField v-else-if="!accomodation.hasYard" text="NO" />
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center">
			<!-- Back button -->
			<router-link :to="{ name: 'accomodations'}" class="router-link">
				<ButtonBack/>
			</router-link>
			<!-- Delete button and dialog -->
			<v-dialog v-model="dialog" width="500">
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" elevation="2" rounded large class="ma-4 btn-delete">
						<v-icon color="#000000" class="mr-2">mdi-trash-can-outline</v-icon>
						DELETE
					</v-btn>
				</template>
				<v-card class="rounded-xl">
					<v-card-title class="text-h5">Deletion warning</v-card-title>
					<v-card-text>
						Are you sure you want to delete this accomodation?
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<ButtonCancel @click.native="dialog = false" />
						<ButtonDelete @click.native="dialog = false" />
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- Edit button -->
			<ButtonEdit/>
		</div>
		<!-- Empty space at the bottom of page -->
		<EmptyDiv/>
	</v-container>
</template>

<script>
import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDelete from '@/components/ButtonDelete.vue';
import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonEdit from '@/components/ButtonEdit.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationsView',
	data() {
		return {
			accomodation: {},
			dialog: false
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
	components: {
		FormLabel,
		FormTextField,
		ButtonBack,
		ButtonDelete,
		ButtonCancel,
		ButtonEdit,
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
	.btn-delete {
		background-color: #FF6F6F !important;
	}
	.btn-delete:before {
		background: none;
	}
	@media (max-width:750px) {
		.details-grid-item {
			grid-template-columns: auto;
		}
		.details-label {
			text-align: center;
			margin-bottom: 8px;
		}
	}
</style>
