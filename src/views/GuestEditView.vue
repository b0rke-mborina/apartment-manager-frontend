<template>
	<v-container absolute fluid class="main-content">
		<!-- Page title -->
		<h1 class="mt-5 text-center">Edit guest</h1>
		<!-- Loading circular progress bar -->
		<div class="text-center">
			<v-progress-circular v-if="loadingData" indeterminate color="#A5D4FF"></v-progress-circular>
		</div>
		<!-- Main information grid -->
		<div v-if="!loadingData" class="details-grid mt-5">
			<!-- First name info -->
			<div class="details-grid-item">
				<FormLabel text="First name" class="details-label" />
				<v-text-field v-model="guest.firstName" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's first name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Last name info -->
			<div class="details-grid-item">
				<FormLabel text="Last name" class="details-label" />
				<v-text-field v-model="guest.lastName" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  type="email"
								  label="Guest's last name"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Email info -->
			<div class="details-grid-item">
				<FormLabel text="Email" class="details-label" />
				<v-text-field v-model="guest.email" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's email"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Phone number info -->
			<div class="details-grid-item">
				<FormLabel text="Phone number" class="details-label" />
				<v-text-field v-model="guest.phoneNumber" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Guest's phone number"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- Country info -->
			<div class="details-grid-item">
				<FormLabel text="Country" class="details-label" />
				<v-text-field v-model="guest.country" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="Country the guest is from"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
			<!-- City info -->
			<div class="details-grid-item">
				<FormLabel text="City" class="details-label" />
				<v-text-field v-model="guest.city" solo rounded
								  clearable clear-icon="mdi-close-circle"
								  label="City the guest is from"
								  background-color="#A5D4FF">
				</v-text-field>
			</div>
		</div>
		<!-- Main action buttons -->
		<div class="text-center mt-5">
			<router-link :to="{ name: 'guests'}" class="router-link">
				<ButtonCancel/>
			</router-link>
			<ButtonDialogDelete itemType="guest" service="guest" :_id="guest._id" routeName="guests" />
			<ButtonSave @click.native="updateGuest()" :loading="loading" />
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
import { AxiosService } from '@/services';

import FormLabel from '@/components/FormLabel.vue';

import ButtonCancel from '@/components/ButtonCancel.vue';
import ButtonDialogDelete from '@/components/ButtonDialogDelete.vue';
import ButtonSave from '@/components/ButtonSave.vue';

import EmptyDiv from '@/components/EmptyDiv.vue';

export default {
	name: 'GuestEditView',
	data() {
		return {
			guest: {},
			loading: false,
			loadingData: false,
			snackbarMsg: null,
			snackbarColor: null,
			snackbar: false
		}
	},
	async mounted() {
		// get guest data from backend and save it to view data
		this.loadingData = true;
		try {
			let response = await AxiosService.get(`/guest/${this.$route.params.id}`);
			this.guest = response.data;
		} catch (error) {
			this.snackbarMsg = "Error has occured. Please try again.";
			this.snackbarColor = "#FF6F6F";
			this.snackbar = true;
			console.log(Object.keys(error), error.message);
		}
		this.loadingData = false;
		console.log(this.guest);
	},
	methods: {
		// updates guest data and sends it to backend for updating
		async updateGuest() {
			// check completeness of data
			console.log(this.guest);
			const check = Boolean(this.guest.firstName && this.guest.lastName && this.guest.country && this.guest.city);
			if (check) {
				// send data to backend for saving
				this.loading = true;
				try {
					await AxiosService.patch(`guest/${this.guest._id}`, this.guest);
					this.$router.push({ name: 'guest-detail', params: { id: this.guest._id } });
				} catch (error) {
					this.snackbarMsg = "Error has occured. Please try again.";
					this.snackbarColor = "#FF6F6F";
					this.snackbar = true;
					console.log(Object.keys(error), error.message);
				}
				this.loading = false;
			} else {
				this.snackbarMsg = "All fields except email and phone number are required. Fill required fields and try again.";
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
