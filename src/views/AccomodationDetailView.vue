<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title (name of private accomodation) -->
		<h1 v-if="!loadingData" class="mt-5 text-center">{{ accomodation.name }}</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Stars based on number of stars / category -->
		<div v-if="!loadingData" class="text-center mb-2">
			<span v-for="i in accomodation.categoryStarNumber" v-bind:key="i" class="mt-5 mb-4 text-center">
				<v-icon icon color="#FFCC00">mdi-star</v-icon>
			</span>
		</div>
		<!-- Current state of private accomodation -->
		<div v-if="!loadingData" class="text-center mb-5">
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
		<div v-if="!loadingData" class="details-grid">
			<!-- Maximum number of guests -->
			<div class="details-grid-item">
				<FormLabel text="Maximum number of guests" class="details-label" />
				<FormTextField :text="String(accomodation.maxGuestNumber)" readonly />
			</div>
			<!-- Location info -->
			<div class="details-grid-item">
				<FormLabel text="Location" class="details-label" />
				<FormTextField v-if="accomodation.location" readonly
									:text="accomodation.location.street
											+ ' ' + accomodation.location.houseNumber
											+ ',\n ' + accomodation.location.postalNumber
											+ ' ' + accomodation.location.city
											+ ', ' + accomodation.location.country" />
			</div>
			<!-- Entrance number info -->
			<div class="details-grid-item">
				<FormLabel text="Entrance number" class="details-label" />
				<FormTextField v-if="accomodation.location" readonly
									:text="accomodation.location.entranceNumber" />
			</div>
			<!-- Floors info -->
			<div class="details-grid-item">
				<FormLabel text="Floors" class="details-label" />
				<FormTextField v-if="accomodation.lowestFloor === 0 && accomodation.floorsNumber === 1"
									text="Ground floor" readonly />
				<FormTextField v-else-if="accomodation.lowestFloor !== 0 && accomodation.floorsNumber === 1"
									:text="'Floor ' + accomodation.lowestFloor" readonly />
				<FormTextField v-else readonly
									:text="'Floors ' + accomodation.lowestFloor
											+ ' to ' + (accomodation.lowestFloor +accomodation.floorsNumber - 1)" />
			</div>
			<!-- Yard info -->
			<div class="details-grid-item">
				<FormLabel text="Has a yard?" class="details-label" />
				<FormTextField v-if="accomodation.hasYard" text="YES" readonly />
				<FormTextField v-else-if="!accomodation.hasYard" text="NO" readonly />
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center">
			<router-link :to="{ name: 'accomodations'}" class="router-link">
				<ButtonBack/>
			</router-link>
			<ButtonDialogDelete itemType="accomodation" service="privateaccomodation" :_id="accomodation._id"
									  routeName="accomodations" />
			<router-link :to="{ name: 'accomodation-modification', params: { id: accomodation._id } }" class="router-link">
				<ButtonEdit/>
			</router-link>
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
import { AxiosService, Auth } from "@/services";

import FormLabel from '@/components/FormLabel.vue';
import FormTextField from '@/components/FormTextField.vue';

import ButtonBack from '@/components/ButtonBack.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonEdit from '@/components/ButtonEdit.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'AccomodationDetailView',
	data() {
		return {
			accomodation: {},
			auth: Auth.state,
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		// get data from backend and set it to view data
		this.loadingData = true;
		try {
			let response = await AxiosService.get(`/privateaccomodation/${this.$route.params.id}?userId=${this.auth.userId}`);
			this.accomodation = response.data;
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		// console.log(this.accomodation);
	},
	components: {
		FormLabel,
		FormTextField,
		ButtonBack,
		ButtonDialogDelete,
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
	.snackbar-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.snackbar {
		color: #000000;
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
